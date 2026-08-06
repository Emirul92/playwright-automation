import { test, expect } from '@playwright/test';
import { LoginPage } from '../testfunction/LoginPage';
import { InventoryPage } from '../testfunction/InventoryPage';
import { CartPage } from '../testfunction/CartPage';
import { CheckoutPage } from '../testfunction/CheckOutPage';

test('User can complete checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  //Login Page with username and password
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  //Add item to cart and click cart
  await inventoryPage.addItemToCart();
  await inventoryPage.goToCart();

  await cartPage.clickCheckout();

  //Verify URL page checkout info
  await expect(page).toHaveURL(/checkout-step-one/);

  //Fill in details
  await checkoutPage.fillInformation('John', 'Doe', '12345');

  //Verify URL page overview
  await expect(page).toHaveURL(/checkout-step-two/);

  //Verify item still there
  await expect(page.locator('.inventory_item_name')).toBeVisible();

  await checkoutPage.finishCheckout();

  //Verify success page
  await expect(page).toHaveURL(/checkout-complete/);

  //Success message
  await expect(page.locator('.complete-header')).toHaveText(
    'Thank you for your order!'
  );
});