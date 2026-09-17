import { Page } from '@playwright/test';
import { CheckoutPageElements } from './checkout.page.elements';

export class CheckoutPageMethods {
  private page: Page;
  private checkoutPageElements: CheckoutPageElements;

  constructor(page: Page) {
    this.page = page;
    this.checkoutPageElements = new CheckoutPageElements(page);
  }

  async clickContinueAsLoggedIn() {
    await this.checkoutPageElements.continueAsLoggedInButton.click();
  }

  async fillAddress(address: {
    country: string;
    postalCode: string;
    houseNumber: string;
    street: string;
    city: string;
    state: string;
  }) {
    await this.checkoutPageElements.address.country.selectOption({ label: address.country });
    await this.checkoutPageElements.address.postalCode.fill(address.postalCode);
    await this.checkoutPageElements.address.houseNumber.fill(address.houseNumber);
    await this.checkoutPageElements.address.street.fill(address.street);
    await this.checkoutPageElements.address.city.fill(address.city);
    await this.checkoutPageElements.address.state.fill(address.state);
  }

  async clickConfirmAddress() {
    await this.checkoutPageElements.confirmAddressButton.click();
  }
}
