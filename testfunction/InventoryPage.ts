import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addItemToCart() {
    await this.page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }
}