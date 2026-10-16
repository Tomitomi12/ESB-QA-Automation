import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test('should sort products by price from high to low', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  // 1. Login
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory\.html/);

  // 2. Sort price from high to low
  await productsPage.sortPriceHighToLow();

  await expect(page.locator('.inventory_item')). toHaveCount(6);

  // 3. Read all displayed product prices
  const priceTexts = await productsPage.productPrices.allTextContents();

  const prices = priceTexts.map((price) =>
    Number(price.replace('$', '').trim())
  );

  // 4. Verify prices are sorted from highest to lowest
  expect(prices.length).toBeGreaterThan(0);

  const sortedPrices = [...prices].sort((a, b) => b - a);
  expect(prices).toEqual(sortedPrices);

  // 5. Verify the first product has the highest price
  expect(prices[0]).toBe(Math.max(...prices));
});