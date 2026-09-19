import { BankTransferDetails } from './checkout-overview.page.interfaces';

export class CheckoutOverviewPageData {
  static get paymentMethod(): string {
    return 'Bank Transfer';
  }

  static get bankTransferDetails(): BankTransferDetails {
    return {
      bankName: 'Test Bank',
      accountName: 'Jane Doe',
      accountNumber: '123456789',
    };
  }

  static get successMessage(): string {
    return 'Payment was successful';
  }
}
