import { Page } from '@playwright/test';
import { LoginPageElements } from './login.page.elements';
import { AllureLogger } from '../../support/allure-logger';

export class LoginPageMethods {
  private loginPageElement: LoginPageElements;

  constructor(page: Page) {
    this.loginPageElement = new LoginPageElements(page);
  }

  async insertEmail(email: string) {
    return AllureLogger.logStep(`insert email "${email}"`, async () => {
      await this.loginPageElement.textboxes.email.fill(email);
    });
  }

  async insertPassword(password: string) {
    return AllureLogger.logStep('insert password', async () => {
      await this.loginPageElement.textboxes.password.fill(password);
    });
  }

  async clickLoginButton() {
    return AllureLogger.logStep('click the Login button', async () => {
      await this.loginPageElement.button.login.click();
    });
  }
}
