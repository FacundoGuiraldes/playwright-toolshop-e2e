import { Page } from '@playwright/test';
import { CartPageElements } from './cart.page.elements';

export class CartPageMethods {
  private page: Page;
  private cartPageElements: CartPageElements;

  constructor(page: Page) {
    this.page = page;
    this.cartPageElements = new CartPageElements(page);
  }

  async setItemQuantity(quantity: number) {
    await this.cartPageElements.item.quantity.fill(quantity.toString());
  }

  async clickContinueShopping() {
    await this.cartPageElements.continueShoppingButton.click();
  }

  async clickProceedToCheckout() {
    await this.cartPageElements.proceedToCheckoutButton.click();
  }
}
