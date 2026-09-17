import { Page } from '@playwright/test';
import { ProductsPageElements } from './products.page.elements';

export class ProductsPageMethods {
  private page: Page;
  private productsPageElements: ProductsPageElements;

  constructor(page: Page) {
    this.page = page;
    this.productsPageElements = new ProductsPageElements(page);
  }

  async search(query: string) {
    await this.productsPageElements.search.input.fill(query);
    await this.productsPageElements.search.submitButton.click();
  }

  async resetSearch() {
    await this.productsPageElements.search.resetButton.click();
  }

  async sortBy(option: string) {
    await this.productsPageElements.sortSelect.selectOption(option);
  }

  async filterByCategory(categoryName: string) {
    await this.productsPageElements.categoryCheckbox(categoryName).click();
  }

  async goToNextPage() {
    await this.productsPageElements.pagination.next.click();
  }

  async goToPreviousPage() {
    await this.productsPageElements.pagination.previous.click();
  }
}
