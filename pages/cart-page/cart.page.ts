import { Page } from '@playwright/test';
import { CommonPage } from '../common-page/common.page';

export class CartPage extends CommonPage {
  constructor(page: Page) {
    super(page);
  }
}
