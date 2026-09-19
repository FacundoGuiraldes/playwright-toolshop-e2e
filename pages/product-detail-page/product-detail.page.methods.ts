import { Page } from '@playwright/test';
import { ProductDetailPageElements } from './product-detail.page.elements';
import { AllureLogger } from '../../support/allure-logger';

export class ProductDetailPageMethods {
  private productDetailPageElements: ProductDetailPageElements;

  constructor(page: Page) {
    this.productDetailPageElements = new ProductDetailPageElements(page);
  }

  async addToCart() {
    return AllureLogger.logStep('add the product to the cart', async () => {
      await this.productDetailPageElements.addToCartButton.click();
    });
  }

  async setQuantity(quantity: number) {
    return AllureLogger.logStep(`set quantity to ${quantity}`, async () => {
      await this.productDetailPageElements.quantity.input.fill(quantity.toString());
    });
  }

  async increaseQuantity() {
    return AllureLogger.logStep('increase quantity by one', async () => {
      await this.productDetailPageElements.quantity.increaseButton.click();
    });
  }

  async decreaseQuantity() {
    return AllureLogger.logStep('decrease quantity by one', async () => {
      await this.productDetailPageElements.quantity.decreaseButton.click();
    });
  }
}
