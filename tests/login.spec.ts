import { test, expect } from '@playwright/test';
import { CommonPageMethods } from '../pages/common-page/common.page.methods';
import { CommonPageElements } from '../pages/common-page/common.page.elements';
import { LoginPageMethods } from '../pages/login-page/login.page.methods';
import { LoginPageElements } from '../pages/login-page/login.page.elements';
import { LoginPageData } from '../pages/login-page/login.page.data';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    const commonPageMethods = new CommonPageMethods(page);
    await commonPageMethods.goto('/auth/login');
  });

  test('logs in successfully with valid credentials', async ({ page }) => {
    const loginPageMethods = new LoginPageMethods(page);
    const userCredentials = LoginPageData.validUser;

    await loginPageMethods.insertUserName(userCredentials.email);
    await loginPageMethods.insertPassword(userCredentials.password);
    await loginPageMethods.clickLoginButton();

    await expect(page).toHaveURL(/\/account/);
  });

  test('shows an error with invalid credentials', async ({ page }) => {
    const loginPageMethods = new LoginPageMethods(page);
    const loginPageElements = new LoginPageElements(page);
    const invalidUser = LoginPageData.invalidUser;

    await loginPageMethods.insertUserName(invalidUser.email);
    await loginPageMethods.insertPassword(invalidUser.password);
    await loginPageMethods.clickLoginButton();

    await expect(loginPageElements.errors.invalidCredentials).toHaveText(
      LoginPageData.errorMessages.invalidCredentials
    );
  });

  test('shows a required error when the email is empty', async ({ page }) => {
    const loginPageMethods = new LoginPageMethods(page);
    const loginPageElements = new LoginPageElements(page);

    await loginPageMethods.insertPassword(LoginPageData.validUser.password);
    await loginPageMethods.clickLoginButton();

    await expect(loginPageElements.errors.email).toHaveText(LoginPageData.errorMessages.emailRequired);
  });

  test('shows a required error when the password is empty', async ({ page }) => {
    const loginPageMethods = new LoginPageMethods(page);
    const loginPageElements = new LoginPageElements(page);

    await loginPageMethods.insertUserName(LoginPageData.validUser.email);
    await loginPageMethods.clickLoginButton();

    await expect(loginPageElements.errors.password).toHaveText(LoginPageData.errorMessages.passwordRequired);
  });

  test('shows a format error when the email is invalid', async ({ page }) => {
    const loginPageMethods = new LoginPageMethods(page);
    const loginPageElements = new LoginPageElements(page);

    await loginPageMethods.insertUserName('asfdds');
    await loginPageMethods.insertPassword(LoginPageData.validUser.password);
    await loginPageMethods.clickLoginButton();

    await expect(loginPageElements.errors.email).toHaveText(LoginPageData.errorMessages.emailFormatInvalid);
  });

  test('shows a length error when the password is too short', async ({ page }) => {
    const loginPageMethods = new LoginPageMethods(page);
    const loginPageElements = new LoginPageElements(page);

    await loginPageMethods.insertUserName(LoginPageData.validUser.email);
    await loginPageMethods.insertPassword('ab');
    await loginPageMethods.clickLoginButton();

    await expect(loginPageElements.errors.password).toHaveText(LoginPageData.errorMessages.passwordLengthInvalid);
  });

  test('logs out successfully after a valid login', async ({ page }) => {
    const commonPageMethods = new CommonPageMethods(page);
    const commonPageElements = new CommonPageElements(page);
    const loginPageMethods = new LoginPageMethods(page);
    const userCredentials = LoginPageData.validUser;

    await loginPageMethods.insertUserName(userCredentials.email);
    await loginPageMethods.insertPassword(userCredentials.password);
    await loginPageMethods.clickLoginButton();
    await expect(page).toHaveURL(/\/account/);

    await commonPageMethods.clickLogOut();

    await expect(commonPageElements.navbar.signIn).toBeVisible();
  });
});
