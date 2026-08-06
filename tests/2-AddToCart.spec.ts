import { test, expect } from '@playwright/test';
import { LoginPage } from '../testfunction/LoginPage';
import { InventoryPage } from '../testfunction/InventoryPage';

test('User can add item to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  //Login Page with username and password
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

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
    'Sauce Labs Backpack'
  );
});