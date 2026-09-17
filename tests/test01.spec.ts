import {test} from '@playwright/test'
import { CommonPageMethods } from '../pages/common-page/common.page.methods'
import { LoginPageMethods } from '../pages/login-page/login.page.methods'
import { LoginPageData } from '../pages/login-page/login.page.data'

test('login', async ({page}) => {
    const commonPageMethods = new CommonPageMethods(page)
    const loginPageMethods = new LoginPageMethods(page)
    const userCredentials = LoginPageData.validUser

    await commonPageMethods.goto('/auth/login')
    await loginPageMethods.insertUserName(userCredentials.email)
    await loginPageMethods.insertPassword(userCredentials.password)
    await loginPageMethods.clickLoginButton()
})