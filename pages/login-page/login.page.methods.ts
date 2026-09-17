import { Page } from "@playwright/test"
import { LoginPageElements } from "./login.page.elements"
import { AllureLogger } from "../../support/allure-logger"

export class LoginPageMethods {
    private page: Page
    private loginPageElement: LoginPageElements

    constructor(page:Page){
            this.page = page
            this.loginPageElement = new LoginPageElements(page)
    }

    async insertUserName(username: string){
        return AllureLogger.logStep(`insert username "${username}"`, async () => {
            await this.loginPageElement.textboxes.username.fill(username)
        })
    }

    async insertPassword(password: string){
        return AllureLogger.logStep('insert password', async () => {
            await this.loginPageElement.textboxes.password.fill(password)
        })
    }

    async clickLoginButton(){
        return AllureLogger.logStep('click the Login button', async () => {
            await this.loginPageElement.button.login.click()
        })
    }
}
