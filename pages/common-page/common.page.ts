export class CommonPage {
    private page
     constructor(page) {
      this.page = page;
      }

    async navigateToTheApplication() {
        await this.page.goto('https://practicesoftwaretesting.com/');
    }
}