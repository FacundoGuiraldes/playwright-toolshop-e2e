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

  async clickHome() {
    await this.commonPageElements.navbar.home.click();
  }

  async openCategoriesMenu() {
    await this.commonPageElements.navbar.categories.click();
  }

  async clickContact() {
    await this.commonPageElements.navbar.contact.click();
  }

  async clickSignIn() {
    await this.commonPageElements.navbar.signIn.click();
  }

  async clickCartIcon() {
    await this.commonPageElements.navbar.cart.click();
  }

  async clickLogOut() {
    await this.commonPageElements.navbar.accountMenu.click();
    await this.commonPageElements.navbar.signOut.click();
  }
}
