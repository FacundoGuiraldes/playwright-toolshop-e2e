import { Page } from '@playwright/test';

export class CommonPageElements {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get navbar() {
    return {
      home: this.page.locator('[data-test="nav-home"]'),
      categories: this.page.locator('[data-test="nav-categories"]'),
      contact: this.page.locator('[data-test="nav-contact"]'),
      signIn: this.page.locator('[data-test="nav-sign-in"]'),
      languageSelect: this.page.locator('[data-test="language-select"]'),
      accountMenu: this.page.locator('[data-test="nav-menu"]'),
      signOut: this.page.locator('[data-test="nav-sign-out"]'),
      cart: this.page.locator('[data-test="nav-cart"]'),
      cartQuantity: this.page.locator('[data-test="cart-quantity"]'),
    };
  }
}
