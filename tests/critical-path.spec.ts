import { test, expect } from '../support/base-test';
import { suite } from 'allure-js-commons';
import { CommonPageMethods } from '../pages/common-page/common.page.methods';
import { LoginPageMethods } from '../pages/login-page/login.page.methods';
import { LoginPageData } from '../pages/login-page/login.page.data';
import { ProductsPageMethods } from '../pages/products-page/products.page.methods';
import { ProductDetailPageMethods } from '../pages/product-detail-page/product-detail.page.methods';

test('user can log in, add a product to the cart, and log out', async ({ page }) => {
  await suite('Critical Path');
  const commonPageMethods = new CommonPageMethods(page);
  const loginPageMethods = new LoginPageMethods(page);
  const productsPageMethods = new ProductsPageMethods(page);
  const productDetailPageMethods = new ProductDetailPageMethods(page);
  const userCredentials = LoginPageData.validUser;

  await commonPageMethods.goto('/auth/login');
  await loginPageMethods.insertUserName(userCredentials.email);
  await loginPageMethods.insertPassword(userCredentials.password);
  await loginPageMethods.clickLoginButton();
  await expect(page).toHaveURL(/\/account/);

  await commonPageMethods.goto('/');
  await productsPageMethods.openProduct('Hammer');
  await productDetailPageMethods.addToCart();
  await expect(page.locator('[data-test="cart-quantity"]')).toHaveText('1');

  await commonPageMethods.clickCartIcon();
  await expect(page).toHaveURL(/checkout/);

  await commonPageMethods.clickLogOut();
  await expect(page.locator('[data-test="nav-sign-in"]')).toBeVisible();
});
