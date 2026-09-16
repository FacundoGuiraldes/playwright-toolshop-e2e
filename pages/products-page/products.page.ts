import { Page } from '@playwright/test';
import { CommonPage } from '../common-page/common.page';

export class ProductsPage extends CommonPage {
  constructor(page: Page) {
    super(page);
  }
}
