import { test, expect } from '../support/base-test';
import { suite } from 'allure-js-commons';
import { AllureLogger } from '../support/allure-logger';
import { CommonPageMethods } from '../pages/common-page/common.page.methods';
import { CommonPageElements } from '../pages/common-page/common.page.elements';
import { LoginPageMethods } from '../pages/login-page/login.page.methods';
import { LoginPageElements } from '../pages/login-page/login.page.elements';
import { LoginPageData } from '../pages/login-page/login.page.data';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await suite('Login');
    await AllureLogger.logPreCondition('start from the login page', async () => {
      const commonPageMethods = new CommonPageMethods(page);
      await commonPageMethods.goto('/auth/login');
    });
  });

  test('logs in successfully with valid credentials', async ({ page }) => {
    const loginPageMethods = new LoginPageMethods(page);
    const commonPageElements = new CommonPageElements(page);
    const userCredentials = LoginPageData.validUser;

    await loginPageMethods.insertEmail(userCredentials.email);
    await loginPageMethods.insertPassword(userCredentials.password);
    await loginPageMethods.clickLoginButton();

    await AllureLogger.logVerification('user is redirected to /account', () =>
      expect(page).toHaveURL(/\/account/)
    );
    await AllureLogger.logVerification('account menu is visible in the navbar', () =>
      expect(commonPageElements.navbar.accountMenu).toBeVisible()
    );
    await AllureLogger.logVerification('sign in link is no longer visible', () =>
      expect(commonPageElements.navbar.signIn).not.toBeVisible()
    );
  });

  test('shows an error with invalid credentials', async ({ page }) => {
    const loginPageMethods = new LoginPageMethods(page);
    const loginPageElements = new LoginPageElements(page);
    const invalidUser = LoginPageData.invalidUser;

    await loginPageMethods.insertEmail(invalidUser.email);
    await loginPageMethods.insertPassword(invalidUser.password);
    await loginPageMethods.clickLoginButton();

    await AllureLogger.logVerification('invalid credentials error is shown', () =>
      expect(loginPageElements.errors.invalidCredentials).toHaveText(
        LoginPageData.errorMessages.invalidCredentials
      )
    );
  });

  test('shows a required error when the email is empty', async ({ page }) => {
    const loginPageMethods = new LoginPageMethods(page);
    const loginPageElements = new LoginPageElements(page);

    await loginPageMethods.insertPassword(LoginPageData.validUser.password);
    await loginPageMethods.clickLoginButton();

    await AllureLogger.logVerification('email required error is shown', () =>
      expect(loginPageElements.errors.email).toHaveText(LoginPageData.errorMessages.emailRequired)
    );
  });

  test('shows required errors when both fields are blank', async ({ page }) => {
    const loginPageMethods = new LoginPageMethods(page);
    const loginPageElements = new LoginPageElements(page);

    await loginPageMethods.clickLoginButton();

    await AllureLogger.logVerification('email required error is shown', () =>
      expect(loginPageElements.errors.email).toHaveText(LoginPageData.errorMessages.emailRequired)
    );
    await AllureLogger.logVerification('password required error is shown', () =>
      expect(loginPageElements.errors.password).toHaveText(LoginPageData.errorMessages.passwordRequired)
    );
  });

  test('shows a required error when the password is empty', async ({ page }) => {
    const loginPageMethods = new LoginPageMethods(page);
    const loginPageElements = new LoginPageElements(page);

    await loginPageMethods.insertEmail(LoginPageData.validUser.email);
    await loginPageMethods.clickLoginButton();

    await AllureLogger.logVerification('password required error is shown', () =>
      expect(loginPageElements.errors.password).toHaveText(LoginPageData.errorMessages.passwordRequired)
    );
  });

  test('shows a format error when the email is invalid', async ({ page }) => {
    const loginPageMethods = new LoginPageMethods(page);
    const loginPageElements = new LoginPageElements(page);

    await loginPageMethods.insertEmail('asfdds');
    await loginPageMethods.insertPassword(LoginPageData.validUser.password);
    await loginPageMethods.clickLoginButton();

    await AllureLogger.logVerification('email format invalid error is shown', () =>
      expect(loginPageElements.errors.email).toHaveText(LoginPageData.errorMessages.emailFormatInvalid)
    );
  });

  test('shows a length error when the password is too short', async ({ page }) => {
    const loginPageMethods = new LoginPageMethods(page);
    const loginPageElements = new LoginPageElements(page);

    await loginPageMethods.insertEmail(LoginPageData.validUser.email);
    await loginPageMethods.insertPassword('ab');
    await loginPageMethods.clickLoginButton();

    await AllureLogger.logVerification('password length invalid error is shown', () =>
      expect(loginPageElements.errors.password).toHaveText(LoginPageData.errorMessages.passwordLengthInvalid)
    );
  });

  test('logs out successfully after a valid login', async ({ page }) => {
    const commonPageMethods = new CommonPageMethods(page);
    const commonPageElements = new CommonPageElements(page);
    const loginPageMethods = new LoginPageMethods(page);
    const userCredentials = LoginPageData.validUser;

    await loginPageMethods.insertEmail(userCredentials.email);
    await loginPageMethods.insertPassword(userCredentials.password);
    await loginPageMethods.clickLoginButton();
    await AllureLogger.logVerification('user is redirected to /account', () =>
      expect(page).toHaveURL(/\/account/)
    );

    await commonPageMethods.clickLogOut();

    await AllureLogger.logPostCondition('sign in link is visible again after logout', () =>
      expect(commonPageElements.navbar.signIn).toBeVisible()
    );
  });
});
