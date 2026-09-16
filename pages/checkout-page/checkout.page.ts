import { Page } from '@playwright/test';
import { CommonPage } from '../common-page/common.page';

export class CheckoutPage extends CommonPage {
  constructor(page: Page) {
    super(page);
  }
}
