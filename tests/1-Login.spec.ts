import { test, expect } from '@playwright/test';
import { LoginPage } from '../testfunction/LoginPage';

test('User can login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  //Login Page with username and password
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  //Verify correct URL 
  await expect(page).toHaveURL(/inventory/);

  //Verify Title page have word Products
  await expect(page.locator('.title')).toHaveText('Products');

  //Verify Cart icon visible
  await expect(page.locator('.shopping_cart_link')).toBeVisible();
});