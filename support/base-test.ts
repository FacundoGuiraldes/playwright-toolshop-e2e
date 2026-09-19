import { test as base } from '@playwright/test';
import { parentSuite } from 'allure-js-commons';

export const test = base.extend<{ setParentSuite: void }>({
  setParentSuite: [
    async ({}, use) => {
      await parentSuite('Toolshop E2E');
      await use();
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
