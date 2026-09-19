import { test, expect } from '../support/base-test';
import { suite } from 'allure-js-commons';
import { AllureLogger } from '../support/allure-logger';
import { CommonPageMethods } from '../pages/common-page/common.page.methods';
import { LoginPageMethods } from '../pages/login-page/login.page.methods';
import { LoginPageData } from '../pages/login-page/login.page.data';
import { ProductsPageMethods } from '../pages/products-page/products.page.methods';
import { ProductDetailPageMethods } from '../pages/product-detail-page/product-detail.page.methods';
import { CartPageMethods } from '../pages/cart-page/cart.page.methods';
import { CheckoutPageMethods } from '../pages/checkout-page/checkout.page.methods';
import { CheckoutPageElements } from '../pages/checkout-page/checkout.page.elements';
import { CheckoutPageData } from '../pages/checkout-page/checkout.page.data';
import { CheckoutOverviewPageMethods } from '../pages/checkout-overview-page/checkout-overview.page.methods';
import { CheckoutOverviewPageElements } from '../pages/checkout-overview-page/checkout-overview.page.elements';
import { CheckoutOverviewPageData } from '../pages/checkout-overview-page/checkout-overview.page.data';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    await suite('Checkout');
    await AllureLogger.logPreCondition('log in and add a product to the cart', async () => {
      const commonPageMethods = new CommonPageMethods(page);
      const loginPageMethods = new LoginPageMethods(page);
      const productsPageMethods = new ProductsPageMethods(page);
      const productDetailPageMethods = new ProductDetailPageMethods(page);
      const userCredentials = LoginPageData.validUser;

      await commonPageMethods.goto('/auth/login');
      await loginPageMethods.insertEmail(userCredentials.email);
      await loginPageMethods.insertPassword(userCredentials.password);
      await loginPageMethods.clickLoginButton();
      await expect(page).toHaveURL(/\/account/);

      await commonPageMethods.goto('/');
      await productsPageMethods.openProduct('Hammer');
      await productDetailPageMethods.addToCart();
      await commonPageMethods.clickCartIcon();
    });
  });

  test('completes a purchase with a valid address and bank transfer payment', async ({ page }) => {
    const cartPageMethods = new CartPageMethods(page);
    const checkoutPageMethods = new CheckoutPageMethods(page);
    const checkoutPageElements = new CheckoutPageElements(page);
    const checkoutOverviewPageMethods = new CheckoutOverviewPageMethods(page);
    const checkoutOverviewPageElements = new CheckoutOverviewPageElements(page);

    await cartPageMethods.clickProceedToCheckout();
    await checkoutPageMethods.clickContinueAsLoggedIn();

    await AllureLogger.logVerification('address form becomes visible', () =>
      expect(checkoutPageElements.address.country).toBeVisible()
    );

    await checkoutPageMethods.fillAddress(CheckoutPageData.validAddress);
    await checkoutPageMethods.clickConfirmAddress();

    await AllureLogger.logVerification('payment method selector becomes visible', () =>
      expect(checkoutOverviewPageElements.paymentMethodSelect).toBeVisible()
    );

    await checkoutOverviewPageMethods.selectPaymentMethod(CheckoutOverviewPageData.paymentMethod);
    await checkoutOverviewPageMethods.fillBankTransferDetails(CheckoutOverviewPageData.bankTransferDetails);
    await checkoutOverviewPageMethods.clickConfirm();

    await AllureLogger.logVerification('payment success message is shown', () =>
      expect(checkoutOverviewPageElements.successMessage).toHaveText(CheckoutOverviewPageData.successMessage)
    );
  });
});
