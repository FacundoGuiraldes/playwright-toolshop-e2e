import { Page } from '@playwright/test';
import { CheckoutOverviewPageElements } from './checkout-overview.page.elements';

export class CheckoutOverviewPageMethods {
  private page: Page;
  private checkoutOverviewPageElements: CheckoutOverviewPageElements;

  constructor(page: Page) {
    this.page = page;
    this.checkoutOverviewPageElements = new CheckoutOverviewPageElements(page);
  }

  async selectPaymentMethod(method: string) {
    await this.checkoutOverviewPageElements.paymentMethodSelect.selectOption({ label: method });
  }

  async fillBankTransferDetails(details: { bankName: string; accountName: string; accountNumber: string }) {
    await this.checkoutOverviewPageElements.bankTransferDetails.bankName.fill(details.bankName);
    await this.checkoutOverviewPageElements.bankTransferDetails.accountName.fill(details.accountName);
    await this.checkoutOverviewPageElements.bankTransferDetails.accountNumber.fill(details.accountNumber);
  }

  async clickConfirm() {
    await this.checkoutOverviewPageElements.confirmButton.click();
  }
}
