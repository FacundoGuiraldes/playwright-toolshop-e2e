import {test} from '@playwright/test'
import { CommonPage } from '../pages/common-page/common.page'

test('login', async ({page}) => {
    const commonPageMethods = new CommonPage(page)
    await commonPageMethods.navigateToTheApplication()
})