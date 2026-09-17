import { Page } from '@playwright/test';
import { ProductDetailPageElements } from './product-detail.page.elements';

export class ProductDetailPageMethods {
  private page: Page;
  private productDetailPageElements: ProductDetailPageElements;

  constructor(page: Page) {
    this.page = page;
    this.productDetailPageElements = new ProductDetailPageElements(page);
  }

  async addToCart() {
    await this.productDetailPageElements.addToCartButton.click();
  }

  async setQuantity(quantity: number) {
    await this.productDetailPageElements.quantity.input.fill(quantity.toString());
  }

  async increaseQuantity() {
    await this.productDetailPageElements.quantity.increaseButton.click();
  }

  async decreaseQuantity() {
    await this.productDetailPageElements.quantity.decreaseButton.click();
  }
}
