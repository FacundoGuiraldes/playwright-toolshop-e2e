import { Page } from '@playwright/test';
import { CartPageElements } from './cart.page.elements';
import { AllureLogger } from '../../support/allure-logger';

export class CartPageMethods {
  private page: Page;
  private cartPageElements: CartPageElements;

  constructor(page: Page) {
    this.page = page;
    this.cartPageElements = new CartPageElements(page);
  }

  async setItemQuantity(quantity: number) {
    return AllureLogger.logStep(`set item quantity to ${quantity}`, async () => {
      await this.cartPageElements.item.quantity.fill(quantity.toString());
    });
  }

  async clickContinueShopping() {
    return AllureLogger.logStep('click Continue Shopping', async () => {
      await this.cartPageElements.continueShoppingButton.click();
    });
  }

  async clickProceedToCheckout() {
    return AllureLogger.logStep('proceed to checkout from the cart', async () => {
      await this.cartPageElements.proceedToCheckoutButton.click();
    });
  }

  async removeItem() {
    return AllureLogger.logStep('remove the item from the cart', async () => {
      await this.cartPageElements.item.removeButton.click();
    });
  }
}
