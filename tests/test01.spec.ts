import {test} from '@playwright/test'
import { CommonPage } from '../pages/common-page/common.page'
import { LoginPageMethods } from '../pages/login-page/login.page.methods'

test('login', async ({page}) => {
    const commonPageMethods = new CommonPage(page)
    const loginPageMethods = new LoginPageMethods(page)

    await commonPageMethods.goto('/auth/login')
    await loginPageMethods.insertUserName(process.env.CUSTOMER_EMAIL!)
    await loginPageMethods.insertPassword(process.env.CUSTOMER_PASSWORD!)
    await loginPageMethods.clickLoginButton()
})