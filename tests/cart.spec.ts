import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test('should add two different products to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  // Login
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  // Verify successful login
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();

  // Add two different products
  await productsPage.addBackpackToCart();
  await productsPage.addBikeLightToCart();

  // Verify cart badge shows two products
  await expect(productsPage.cartBadge).toHaveText('2');

  // Open cart and verify both products
  await productsPage.openCart();
  await expect(page).toHaveURL(/cart\.html/);

  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText('Sauce Labs Bike Light', { exact: true })
  ).toBeVisible();
});