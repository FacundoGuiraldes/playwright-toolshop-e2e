import { Page } from '@playwright/test';
import { CheckoutOverviewPageElements } from './checkout-overview.page.elements';
import { BankTransferDetails } from './checkout-overview.page.interfaces';
import { AllureLogger } from '../../support/allure-logger';

export class CheckoutOverviewPageMethods {
  private checkoutOverviewPageElements: CheckoutOverviewPageElements;

  constructor(page: Page) {
    this.checkoutOverviewPageElements = new CheckoutOverviewPageElements(page);
  }

  async selectPaymentMethod(method: string) {
    return AllureLogger.logStep(`select payment method "${method}"`, async () => {
      await this.checkoutOverviewPageElements.paymentMethodSelect.selectOption({ label: method });
    });
  }

  async fillBankTransferDetails(details: BankTransferDetails) {
    return AllureLogger.logStep('fill in bank transfer details', async () => {
      await this.checkoutOverviewPageElements.bankTransferDetails.bankName.fill(details.bankName);
      await this.checkoutOverviewPageElements.bankTransferDetails.accountName.fill(details.accountName);
      await this.checkoutOverviewPageElements.bankTransferDetails.accountNumber.fill(details.accountNumber);
    });
  }

  async clickConfirm() {
    return AllureLogger.logStep('confirm and finish the purchase', async () => {
      await this.checkoutOverviewPageElements.confirmButton.click();
    });
  }
}
