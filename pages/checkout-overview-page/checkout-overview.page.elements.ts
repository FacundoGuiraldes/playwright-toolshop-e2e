import { Page } from '@playwright/test';

export class CheckoutOverviewPageElements {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get paymentMethodSelect() {
    return this.page.locator('[data-test="payment-method"]');
  }

  get bankTransferDetails() {
    return {
      bankName: this.page.locator('[data-test="bank_name"]'),
      accountName: this.page.locator('[data-test="account_name"]'),
      accountNumber: this.page.locator('[data-test="account_number"]'),
    };
  }

  get confirmButton() {
    return this.page.locator('[data-test="finish"]');
  }

  get successMessage() {
    return this.page.locator('[data-test="payment-success-message"]');
  }
}
