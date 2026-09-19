import { test, expect } from '../support/base-test';
import { suite } from 'allure-js-commons';
import { AllureLogger } from '../support/allure-logger';
import { CommonPageMethods } from '../pages/common-page/common.page.methods';
import { ProductsPageMethods } from '../pages/products-page/products.page.methods';
import { ProductsPageElements } from '../pages/products-page/products.page.elements';
import { ProductDetailPageElements } from '../pages/product-detail-page/product-detail.page.elements';

test.describe('Products', () => {
  test.beforeEach(async ({ page }) => {
    await suite('Products');
    await AllureLogger.logPreCondition('start from the home page', async () => {
      const commonPageMethods = new CommonPageMethods(page);
      await commonPageMethods.goto('/');
    });
  });

  test('searches for a product by name', async ({ page }) => {
    const productsPageMethods = new ProductsPageMethods(page);

    await productsPageMethods.search('Hammer');

    await AllureLogger.logVerification('all results contain "Hammer" in their name', async () => {
      await expect(page.locator('[data-test="product-name"]').first()).toContainText('Hammer');

      const names = await page.locator('[data-test="product-name"]').allTextContents();
      expect(names.length).toBeGreaterThan(0);
      for (const name of names) {
        expect(name).toContain('Hammer');
      }
    });
  });

  test('resets the search', async ({ page }) => {
    const productsPageMethods = new ProductsPageMethods(page);
    const productsPageElements = new ProductsPageElements(page);

    await productsPageMethods.search('Hammer');
    await productsPageMethods.resetSearch();

    await AllureLogger.logVerification('search input is cleared', () =>
      expect(productsPageElements.search.input).toHaveValue('')
    );
  });

  test('filters products by category', async ({ page }) => {
    const productsPageMethods = new ProductsPageMethods(page);
    const productsPageElements = new ProductsPageElements(page);

    await productsPageMethods.filterByCategory('Hand Tools');

    await AllureLogger.logVerification('"Hand Tools" category checkbox is checked', () =>
      expect(productsPageElements.categoryCheckbox('Hand Tools')).toBeChecked()
    );
  });

  test('sorts products by price from low to high', async ({ page }) => {
    const productsPageMethods = new ProductsPageMethods(page);

    await productsPageMethods.sortBy('price,asc');

    await AllureLogger.logVerification('products are ordered from cheapest to most expensive', () =>
      expect
        .poll(async () => {
          const priceTexts = await page.locator('[data-test="product-price"]').allTextContents();
          const prices = priceTexts.map((text) => Number(text.replace('$', '')));
          const sortedPrices = [...prices].sort((a, b) => a - b);
          return prices.every((price, index) => price === sortedPrices[index]);
        })
        .toBe(true)
    );
  });

  test('navigates to the next and previous page of products', async ({ page }) => {
    const productsPageMethods = new ProductsPageMethods(page);
    const productNames = page.locator('[data-test="product-name"]');

    await expect(productNames.first()).toBeVisible();
    const firstPageNames = await productNames.allTextContents();

    await productsPageMethods.goToNextPage();
    await AllureLogger.logVerification('a different set of products is shown', () =>
      expect(productNames).not.toHaveText(firstPageNames)
    );

    await productsPageMethods.goToPreviousPage();
    await AllureLogger.logPostCondition('the original list of products is shown again', () =>
      expect(productNames).toHaveText(firstPageNames)
    );
  });

  test('opens a product from the listing', async ({ page }) => {
    const productsPageMethods = new ProductsPageMethods(page);
    const productDetailPageElements = new ProductDetailPageElements(page);

    await productsPageMethods.openProduct('Hammer');

    await AllureLogger.logVerification('the correct product detail page opens', async () => {
      await expect(page).toHaveURL(/\/product\//);
      await expect(productDetailPageElements.productName).toHaveText('Hammer');
    });
  });
});
