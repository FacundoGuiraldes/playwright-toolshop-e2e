import {Page} from 'playwright'

export class CommonPage {
    private page: Page 

     constructor(page: Page) {
      this.page = page;
      }

    async navigateToTheApplication() {
        await this.page.goto('https://practicesoftwaretesting.com/');
    }

    async goto(path: string) {
        await this.page.goto(path);
    }
}