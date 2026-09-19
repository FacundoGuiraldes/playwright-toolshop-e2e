import { Page } from '@playwright/test';
import { CheckoutPageElements } from './checkout.page.elements';
import { Address } from './checkout.page.interfaces';
import { AllureLogger } from '../../support/allure-logger';

export class CheckoutPageMethods {
  private checkoutPageElements: CheckoutPageElements;

  constructor(page: Page) {
    this.checkoutPageElements = new CheckoutPageElements(page);
  }

  async clickContinueAsLoggedIn() {
    return AllureLogger.logStep('confirm continuing as the logged-in user', async () => {
      await this.checkoutPageElements.continueAsLoggedInButton.click();
    });
  }

  async fillAddress(address: Address) {
    return AllureLogger.logStep(`fill in the shipping address for "${address.country}"`, async () => {
      await this.checkoutPageElements.address.country.selectOption({ label: address.country });
      await this.checkoutPageElements.address.postalCode.fill(address.postalCode);
      await this.checkoutPageElements.address.houseNumber.fill(address.houseNumber);
      await this.checkoutPageElements.address.street.fill(address.street);
      await this.checkoutPageElements.address.city.fill(address.city);
      await this.checkoutPageElements.address.state.fill(address.state);
    });
  }

  async clickConfirmAddress() {
    return AllureLogger.logStep('confirm the shipping address', async () => {
      await this.checkoutPageElements.confirmAddressButton.click();
    });
  }
}
