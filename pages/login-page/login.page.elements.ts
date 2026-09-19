import { Page } from '@playwright/test';

export class LoginPageElements {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get textboxes() {
    return {
      email: this.page.locator('[data-test="email"]'),
      password: this.page.locator('[data-test="password"]'),
    };
  }

  get button() {
    return {
      login: this.page.locator('[data-test="login-submit"]'),
    };
  }

  get errors() {
    return {
      email: this.page.locator('[data-test="email-error"]'),
      password: this.page.locator('[data-test="password-error"]'),
      invalidCredentials: this.page.locator('[data-test="login-error"]'),
    };
  }
}
