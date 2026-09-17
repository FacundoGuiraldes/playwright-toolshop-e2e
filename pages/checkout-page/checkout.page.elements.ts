import { Page } from '@playwright/test';

export class CheckoutPageElements {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get address() {
    return {
      country: this.page.locator('[data-test="country"]'),
      postalCode: this.page.locator('[data-test="postal_code"]'),
      houseNumber: this.page.locator('[data-test="house_number"]'),
      street: this.page.locator('[data-test="street"]'),
      city: this.page.locator('[data-test="city"]'),
      state: this.page.locator('[data-test="state"]'),
    };
  }

  get continueAsLoggedInButton() {
    return this.page.locator('[data-test="proceed-2"]');
  }

  get confirmAddressButton() {
    return this.page.locator('[data-test="proceed-3"]');
  }
}
