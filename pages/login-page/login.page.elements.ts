import { Page } from '@playwright/test';
import { CommonPage } from '../common-page/common.page';

export class LoginPageElements {
  private page: Page

  constructor(page: Page) {
    this.page=page
  }

  get textboxes (){
    return{
        username: this.page.locator('[data-test="email"]'),
        password: this.page.locator('[data-test="password"]')
    }
  }

  get button(){
    return{
        login: this.page.locator('[data-test="login-submit"]')
    }
  }
}

