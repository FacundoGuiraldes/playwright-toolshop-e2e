import { Page } from "@playwright/test"
import { LoginPageElements } from "./login.page.elements"

export class LoginPageMethods {
    private page: Page
    private loginPageElement: LoginPageElements

    constructor(page:Page){
            this.page = page
            this.loginPageElement = new LoginPageElements(page)
    }

    async insertUserName(username: string){
            await this.loginPageElement.textboxes.username.fill(username)
    }

    async insertPassword(password: string){
            await this.loginPageElement.textboxes.password.fill(password)
    }

    async clickLoginButton(){
            await this.loginPageElement.button.login.click()
    }
}

