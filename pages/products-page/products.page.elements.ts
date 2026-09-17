import { Page } from '@playwright/test';

export class ProductsPageElements {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get search() {
    return {
      input: this.page.locator('[data-test="search-query"]'),
      submitButton: this.page.locator('[data-test="search-submit"]'),
      resetButton: this.page.locator('[data-test="search-reset"]'),
    };
  }

  get sortSelect() {
    return this.page.locator('[data-test="sort"]');
  }

  get pagination() {
    return {
      previous: this.page.locator('[data-test="pagination-prev"]'),
      next: this.page.locator('[data-test="pagination-next"]'),
    };
  }

  categoryCheckbox(categoryName: string) {
    return this.page.getByLabel(categoryName);
  }

  productCard(productName: string) {
    return this.page.locator('a[data-test^="product-"]').filter({
      has: this.page.locator('[data-test="product-name"]', { hasText: new RegExp(`^\\s*${productName}\\s*$`) }),
    });
  }
}
