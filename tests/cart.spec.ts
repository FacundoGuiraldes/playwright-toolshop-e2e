import { test, expect } from '../support/base-test';
import { suite } from 'allure-js-commons';
import { AllureLogger } from '../support/allure-logger';
import { CommonPageMethods } from '../pages/common-page/common.page.methods';
import { CommonPageElements } from '../pages/common-page/common.page.elements';
import { ProductsPageMethods } from '../pages/products-page/products.page.methods';
import { ProductDetailPageMethods } from '../pages/product-detail-page/product-detail.page.methods';
import { CartPageMethods } from '../pages/cart-page/cart.page.methods';
import { CartPageElements } from '../pages/cart-page/cart.page.elements';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    await suite('Cart');
    await AllureLogger.logPreCondition('start from the home page', async () => {
      const commonPageMethods = new CommonPageMethods(page);
      await commonPageMethods.goto('/');
    });
  });

  test('adds a product to the cart', async ({ page }) => {
    const productsPageMethods = new ProductsPageMethods(page);
    const productDetailPageMethods = new ProductDetailPageMethods(page);
    const commonPageElements = new CommonPageElements(page);

    await productsPageMethods.openProduct('Hammer');
    await productDetailPageMethods.addToCart();

    await AllureLogger.logVerification('cart quantity shows 1', () =>
      expect(commonPageElements.navbar.cartQuantity).toHaveText('1')
    );
  });

  test('removes a product from the cart', async ({ page }) => {
    const productsPageMethods = new ProductsPageMethods(page);
    const productDetailPageMethods = new ProductDetailPageMethods(page);
    const commonPageMethods = new CommonPageMethods(page);
    const commonPageElements = new CommonPageElements(page);
    const cartPageMethods = new CartPageMethods(page);
    const cartPageElements = new CartPageElements(page);

    await productsPageMethods.openProduct('Hammer');
    await productDetailPageMethods.addToCart();
    await AllureLogger.logVerification('cart quantity shows 1', () =>
      expect(commonPageElements.navbar.cartQuantity).toHaveText('1')
    );

    await commonPageMethods.clickCartIcon();
    await cartPageMethods.removeItem();

    await AllureLogger.logPostCondition('cart item is no longer listed', () =>
      expect(cartPageElements.item.title).not.toBeVisible()
    );
    await AllureLogger.logPostCondition('cart icon disappears from the navbar', () =>
      expect(commonPageElements.navbar.cart).not.toBeVisible()
    );
  });
});
