import { test, expect } from '../support/base-test';
import { suite } from 'allure-js-commons';
import { AllureLogger } from '../support/allure-logger';
import { CommonPageMethods } from '../pages/common-page/common.page.methods';
import { CommonPageElements } from '../pages/common-page/common.page.elements';
import { LoginPageMethods } from '../pages/login-page/login.page.methods';
import { LoginPageData } from '../pages/login-page/login.page.data';
import { ProductsPageMethods } from '../pages/products-page/products.page.methods';
import { ProductDetailPageMethods } from '../pages/product-detail-page/product-detail.page.methods';

test('user can log in, add a product to the cart, and log out', async ({ page }) => {
  await suite('Critical Path');
  const commonPageMethods = new CommonPageMethods(page);
  const commonPageElements = new CommonPageElements(page);
  const loginPageMethods = new LoginPageMethods(page);
  const productsPageMethods = new ProductsPageMethods(page);
  const productDetailPageMethods = new ProductDetailPageMethods(page);
  const userCredentials = LoginPageData.validUser;

  await AllureLogger.logPreCondition('log in with valid credentials', async () => {
    await commonPageMethods.goto('/auth/login');
    await loginPageMethods.insertEmail(userCredentials.email);
    await loginPageMethods.insertPassword(userCredentials.password);
    await loginPageMethods.clickLoginButton();
  });
  await AllureLogger.logVerification('user is redirected to /account', () =>
    expect(page).toHaveURL(/\/account/)
  );

  await commonPageMethods.goto('/');
  await productsPageMethods.openProduct('Hammer');
  await productDetailPageMethods.addToCart();
  await AllureLogger.logVerification('cart quantity shows 1', () =>
    expect(commonPageElements.navbar.cartQuantity).toHaveText('1')
  );

  await commonPageMethods.clickCartIcon();
  await AllureLogger.logVerification('user reaches the checkout flow', () => expect(page).toHaveURL(/checkout/));

  await commonPageMethods.clickLogOut();
  await AllureLogger.logPostCondition('sign in link is visible again after logout', () =>
    expect(commonPageElements.navbar.signIn).toBeVisible()
  );
});
