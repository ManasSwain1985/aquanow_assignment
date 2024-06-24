/**
 * @author Manas Ranjan Swain
 * @Date 22-June-2024
 *  @description This page contains all methods for Payment Method page
 */
import { expect, Page} from "@playwright/test";
import {paymentMethodPageLocator} from "../locators/paymentMethodPageLocator"

export class paymentMethodPage extends paymentMethodPageLocator{

  constructor(page: Page) {
    super(page);
  }

  async verifyPaymentMethodPage(){
    await this.page.waitForLoadState('domcontentloaded')
    await expect(this.transactionHeader, "Transaction Header should be displayed").toBeVisible({timeout: 5000})
    await expect(this.paymentMethodHeader, "Payment Mode should be displayed").toBeVisible()
    await expect(this.totalAmountdue, "Total Amount Due should be displayed").toHaveCount(1)
    await expect(this.continueButton, "Continue button should be displayed").toBeVisible()
    await expect(this.paymentMethodCombobox, "Payment mode select box should be displayed").toBeVisible()
  }

  async verifyContinueBtnStatus(status: boolean){
    if(status){
      await expect(this.continueButton, "Continue button should be enabled").toBeEnabled()
    }else{
      await expect(this.continueButton, "Continue button should be disabled").not.toBeEnabled()
    }
  }

  async selectPaymentMethod(paymentMethod: string){
    await Promise.all([
        await this.paymentMethodCombobox.click(),
        await this.page.getByRole('option').filter({ hasText: paymentMethod }).click()
    ])

    // Handle the special case for USDT
    if(await this.networkTypeCombobox.isVisible()){
      await this.networkTypeCombobox.click()
      await this.page.getByRole('option').first().click()
    }
  }

  async clickContinue(){
    await Promise.all([
        this.page.waitForLoadState(),
        this.page.waitForLoadState("domcontentloaded"),
        this.continueButton.click()
    ])
  }

  async selectPaymentandContinue(paymentMethod: string){
    await this.page.waitForLoadState('domcontentloaded')
    await expect(this.transactionHeader, "Transaction header should be displayed").toBeVisible({timeout: 5000})
    await this.selectPaymentMethod(paymentMethod)
    await this.clickContinue()
  }
  async verifyTotalAmountDue(){
    const totalAmtDue = Number((await this.totalAmountDue.innerText()).replace("USD","").replace("$","").trim())
    const amtWithoutFee = Number((await this.amountWithoutFee.innerText()).replace("USD","").replace("$","").trim())
    const feeAmt = Number((await this.fee.innerText()).replace("$","").split("USD")[0].trim())
    expect(totalAmtDue, "Total Amount Due = Amount without Fees + Fees : " + totalAmtDue).toBe(amtWithoutFee+feeAmt)

  }

}
