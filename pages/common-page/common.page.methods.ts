import { Page } from '@playwright/test';
import { CommonPageElements } from './common.page.elements';

export class CommonPageMethods {
  private page: Page;
  private commonPageElements: CommonPageElements;

  constructor(page: Page) {
    this.page = page;
    this.commonPageElements = new CommonPageElements(page);
  }

  async navigateToTheApplication() {
    await this.page.goto('https://practicesoftwaretesting.com/');
  }

  async goto(path: string) {
    await this.page.goto(path);
  }
}
