/**
 * @author Manas Ranjan Swain
 * @Date 22-June-2024
 *  @description This page contains all Locators for Payment Status page
 */
import { Page, Locator} from "@playwright/test";

export class paymentStatusPageLocators {

    page: Page
    readonly paymentStatusHeader: Locator
    readonly paymentHistory: Locator
    readonly paymentStatus: Locator
    readonly paymentButton: Locator
    readonly paymentAlertMessage: Locator
    

  constructor(page: Page) {
    this.page = page
    this.paymentStatusHeader = page.locator("//h2[text()='Payment status']")
    this.paymentHistory= page.locator("//h3[text()='Payment history']")
    this.paymentStatus = page.getByTestId('payment-status')
    this.paymentButton = page.getByRole("button").and(page.getByText('Make a payment'))
    this.paymentAlertMessage = page.locator('.MuiAlert-message')

  }

}