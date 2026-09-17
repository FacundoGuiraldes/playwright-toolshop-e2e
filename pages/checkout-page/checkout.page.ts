import { Page } from '@playwright/test';
import { CommonPageMethods } from '../common-page/common.page.methods';

export class CheckoutPage extends CommonPageMethods {
  constructor(page: Page) {
    super(page);
  }
}
