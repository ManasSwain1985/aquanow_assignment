import {loginPage as LoginPage} from "../screens/loginPage";
import {paymentMethodPage as PaymentMethodPage} from "../screens/paymentMethodPage";
import {paymentInstructionPage as PaymentInstructionPage} from "../screens/paymentInstructionPage"
import { paymentStatusPage as PaymentStatusPage } from '../screens/paymentStatusPage';
import credential from "../data/credential.json"

import{test as base} from "@playwright/test"

type basepage = {
    paymentPage: PaymentMethodPage;
    loginPage: LoginPage;
    statusPage: PaymentStatusPage;
    instructionPage: PaymentInstructionPage
    loginCred: any
}

export const test = base.extend<basepage> ({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    paymentPage: async ({ page }, use) => {
        await use(new PaymentMethodPage(page));
    },
    instructionPage: async ({ page }, use) => {
        await use(new PaymentInstructionPage(page));
    },
    statusPage: async ({ page }, use) => {
        await use(new PaymentStatusPage(page));
    },
    loginCred: credential,
})

export{expect} from "@playwright/test"