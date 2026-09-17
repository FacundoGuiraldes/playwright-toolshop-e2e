import { Page } from '@playwright/test';

export class ProductDetailPageElements {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get productName() {
    return this.page.locator('[data-test="product-name"]');
  }

  get unitPrice() {
    return this.page.locator('[data-test="unit-price"]');
  }

  get quantity() {
    return {
      input: this.page.locator('[data-test="quantity"]'),
      increaseButton: this.page.locator('[data-test="increase-quantity"]'),
      decreaseButton: this.page.locator('[data-test="decrease-quantity"]'),
    };
  }

  get addToCartButton() {
    return this.page.locator('[data-test="add-to-cart"]');
  }

  get addToFavoritesButton() {
    return this.page.locator('[data-test="add-to-favorites"]');
  }

  get addToCompareButton() {
    return this.page.locator('[data-test="add-to-compare"]');
  }
}
