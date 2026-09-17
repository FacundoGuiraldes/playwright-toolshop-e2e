import { Page } from '@playwright/test';

export class CartPageElements {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get item() {
    return {
      title: this.page.locator('[data-test="product-title"]'),
      quantity: this.page.locator('[data-test="product-quantity"]'),
      price: this.page.locator('[data-test="product-price"]'),
      lineTotal: this.page.locator('[data-test="line-price"]'),
    };
  }

  get cartTotal() {
    return this.page.locator('[data-test="cart-total"]');
  }

  get continueShoppingButton() {
    return this.page.locator('[data-test="continue-shopping"]');
  }

  get proceedToCheckoutButton() {
    return this.page.locator('[data-test="proceed-1"]');
  }
}
