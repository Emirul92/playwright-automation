import { test, expect } from '@playwright/test';
import { LoginPage } from '../testfunction/LoginPage';
import { InventoryPage } from '../testfunction/InventoryPage';
import { CartPage } from '../testfunction/CartPage';
import { CheckoutPage } from '../testfunction/CheckOutPage';

test('User can login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  //Login Page with username and password
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  //Verify correct URL 
  await expect(page).toHaveURL(/inventory/);

  //Verify Title page have word Products
  await expect(page.locator('.title')).toHaveText('Products');

  //Verify Cart icon visible
  await expect(page.locator('.shopping_cart_link')).toBeVisible();

  //Validation on correct product page
  await expect(page).toHaveURL(/inventory/);

    //Add item to Cart
  await inventoryPage.addItemToCart();

  //Verify Button Remove appear when item added to cart
  await expect(
    page.locator('[data-test="remove-sauce-labs-backpack"]')
  ).toBeVisible();

  //Verify Cart badge have "1"
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  //Go to Cart
  await inventoryPage.goToCart();

  //Verify URL have word cart
  await expect(page).toHaveURL(/cart/);

  //Verify correct product in cart
  await expect(page.locator('.inventory_item_name')).toHaveText(
    'Sauce Labs Backpack');

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
    'Thank you for your order!');
});