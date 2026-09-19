import { Address } from './checkout.page.interfaces';

export class CheckoutPageData {
  static get validAddress(): Address {
    return {
      country: 'Argentina',
      postalCode: '1000',
      houseNumber: '123',
      street: 'Main St',
      city: 'Buenos Aires',
      state: 'Buenos Aires',
    };
  }
}
