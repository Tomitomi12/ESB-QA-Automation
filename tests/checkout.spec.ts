import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('should complete checkout and verify order total', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Login
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory\.html/);

  // 2. Add two different products
  await productsPage.addBackpackToCart();
  await productsPage.addBikeLightToCart();
  await productsPage.openCart();

  // 3. Verify cart and start checkout
  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText('Sauce Labs Bike Light', { exact: true })
  ).toBeVisible();

  await checkoutPage.startCheckout();

  // 4. Fill customer information
  await checkoutPage.fillCustomerInformation(
    'Tomi',
    'QA',
    '12345'
  );

  await expect(page).toHaveURL(/checkout-step-two\.html/);

  // 5. Verify Item Total + Tax = Total
  const itemTotalText = await checkoutPage.itemTotal.textContent();
  const taxText = await checkoutPage.tax.textContent();
  const totalText = await checkoutPage.total.textContent();

  const itemTotal = Number(itemTotalText?.match(/[\d.]+$/)?.[0]);
  const tax = Number(taxText?.match(/[\d.]+$/)?.[0]);
  const total = Number(totalText?.match(/[\d.]+$/)?.[0]);

  expect(Number.isFinite(itemTotal)).toBeTruthy();
  expect(Number.isFinite(tax)).toBeTruthy();
  expect(Number.isFinite(total)).toBeTruthy();

  expect(itemTotal + tax).toBeCloseTo(total, 2);

  // 6. Finish order and verify confirmation
  await checkoutPage.finishOrder();

  await expect(page).toHaveURL(/checkout-complete\.html/);
  await expect(checkoutPage.confirmationMessage).toHaveText(
    'Thank you for your order!'
  );
});