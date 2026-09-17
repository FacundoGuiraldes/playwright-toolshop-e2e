import { Page } from '@playwright/test';
import { CommonPageElements } from './common.page.elements';
import { AllureLogger } from '../../support/allure-logger';

export class CommonPageMethods {
  private page: Page;
  private commonPageElements: CommonPageElements;

  constructor(page: Page) {
    this.page = page;
    this.commonPageElements = new CommonPageElements(page);
  }

  async navigateToTheApplication() {
    return AllureLogger.logStep('navigate to the application home page', async () => {
      await this.page.goto('https://practicesoftwaretesting.com/');
    });
  }

  async goto(path: string) {
    return AllureLogger.logStep(`navigate to "${path}"`, async () => {
      await this.page.goto(path);
    });
  }

  async clickHome() {
    return AllureLogger.logStep('click the Home navbar link', async () => {
      await this.commonPageElements.navbar.home.click();
    });
  }

  async openCategoriesMenu() {
    return AllureLogger.logStep('open the Categories dropdown menu', async () => {
      await this.commonPageElements.navbar.categories.click();
    });
  }

  async clickContact() {
    return AllureLogger.logStep('click the Contact navbar link', async () => {
      await this.commonPageElements.navbar.contact.click();
    });
  }

  async clickSignIn() {
    return AllureLogger.logStep('click the Sign In navbar link', async () => {
      await this.commonPageElements.navbar.signIn.click();
    });
  }

  async clickCartIcon() {
    return AllureLogger.logStep('click the cart icon', async () => {
      await this.commonPageElements.navbar.cart.click();
    });
  }

  async clickLogOut() {
    return AllureLogger.logStep('log out via the account menu', async () => {
      await this.commonPageElements.navbar.accountMenu.click();
      await this.commonPageElements.navbar.signOut.click();
    });
  }
}
