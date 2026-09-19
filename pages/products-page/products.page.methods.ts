import { Page } from '@playwright/test';
import { ProductsPageElements } from './products.page.elements';
import { AllureLogger } from '../../support/allure-logger';

export class ProductsPageMethods {
  private productsPageElements: ProductsPageElements;

  constructor(page: Page) {
    this.productsPageElements = new ProductsPageElements(page);
  }

  async search(query: string) {
    return AllureLogger.logStep(`search for "${query}"`, async () => {
      await this.productsPageElements.search.input.fill(query);
      await this.productsPageElements.search.submitButton.click();
    });
  }

  async resetSearch() {
    return AllureLogger.logStep('reset the search', async () => {
      await this.productsPageElements.search.resetButton.click();
    });
  }

  async sortBy(option: string) {
    return AllureLogger.logStep(`sort products by "${option}"`, async () => {
      await this.productsPageElements.sortSelect.selectOption(option);
    });
  }

  async filterByCategory(categoryName: string) {
    return AllureLogger.logStep(`filter by category "${categoryName}"`, async () => {
      await this.productsPageElements.categoryCheckbox(categoryName).click();
    });
  }

  async goToNextPage() {
    return AllureLogger.logStep('go to the next page of products', async () => {
      await this.productsPageElements.pagination.next.click();
    });
  }

  async goToPreviousPage() {
    return AllureLogger.logStep('go to the previous page of products', async () => {
      await this.productsPageElements.pagination.previous.click();
    });
  }

  async openProduct(productName: string) {
    return AllureLogger.logStep(`open the product "${productName}"`, async () => {
      await this.productsPageElements.productCard(productName).click();
    });
  }
}
