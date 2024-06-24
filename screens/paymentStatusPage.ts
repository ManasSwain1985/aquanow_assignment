/**
 * @author Manas Ranjan Swain
 * @Date 22-June-2024
 *  @description This page contains all methods for Payment Status page
 */
import { expect, Page, Locator} from "@playwright/test";
import {paymentStatusPageLocators} from "../locators/paymentstatusPageLocator"

export class paymentStatusPage extends paymentStatusPageLocators{

  constructor(page: Page) {
    super(page);
  }
  async verifyPaymentStatusPage(){
    await this.page.waitForLoadState('domcontentloaded')
    await expect(this.paymentStatusHeader, "Payment status hearder should be displayed").toBeVisible({timeout: 5000})
    await expect(this.paymentHistory, "Payment History section should be displayed").toBeVisible()
    await expect(this.paymentButton, "Make a Payment button should be displayed").toBeVisible()
    await expect(this.paymentStatus, "Payment Status should be displayed").toBeVisible()
  }

  async clickPaymentButton(){
    await Promise.all([
        this.paymentButton.click(),
        this.page.waitForLoadState(),
        this.page.waitForLoadState("domcontentloaded")
    ])
  }

  async validatedPaymentStatus(status: string, alertMessage: string = ""){
    await expect(this.paymentStatus , "The Payment status should be correctly displayed as " + status).toHaveText(status)
    if(alertMessage != ''){
        await expect(this.paymentAlertMessage).toHaveText(alertMessage)
    }
  }

  // To be implemented when the Back End is available for Payment history
  async validatePaymentHistory(){
    await expect(this.page.getByText("No payment history"),"No Payment history is displayed").toBeVisible()
  }

}