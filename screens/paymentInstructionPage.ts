/**
 * @author Manas Ranjan Swain
 * @Date 22-June-2024
 *  @description This page contains all methods for Payment Instruction page
 */
import { expect, Page, Locator} from "@playwright/test";
import {paymentInstructionPageLocator} from "../locators/paymentInstructionPageLocator"

export class paymentInstructionPage extends paymentInstructionPageLocator {

  constructor(page: Page) {
    super(page);
  }

  async verifyPaymentInstructionPage(){
    await this.page.waitForLoadState('domcontentloaded')
    await expect(this.pageHeader, "Transaction Instruction page header should be displayed").toBeVisible({timeout: 5000})
    await expect(this.deposittoWalletHeader, "Deposit to wallet header should be displayed").toBeVisible()
    await expect(this.viewPaymentStatusButton, "View Payment Status button should be displayed").toBeVisible()
    await expect(this.copytoClipboardLink, "Copy to Clipboard Link should be displayed").toBeVisible()
    await expect(this.qrCode, "QR Code should be displayed").toBeVisible()
  }

  async navigateToPaymentStatusPage(){
    await Promise.all([
        this.page.waitForLoadState(),
        this.page.waitForLoadState("domcontentloaded"),
        this.viewPaymentStatusButton.click()
    ])
  }

  async verifyDepositAddress(){
    const depositAddr = await this.depositAddress.innerText()
    expect(depositAddr, "Deposit address should be Displayed").not.toHaveLength(0)
    expect(depositAddr, "Deposit address should be Displayed").not.toBe('')
    return depositAddr
  }

  async validateCopytoClipBoard(){

    const expectedDepositAddr = await this.verifyDepositAddress()
    if(expectedDepositAddr != ''){
        await this.copytoClipboardLink.click()
        await expect(this.page.getByText('Copied to clipboard'), "Copied to clipboard successfully").toBeVisible()
        const clipboardContent  = await this.page.evaluate(() => navigator.clipboard.readText())
        expect(clipboardContent, "Copy To ClipBoard should copy the Deposit Address " + clipboardContent ).toEqual(expectedDepositAddr)
    }

  }

  async validatePaymentType(paymentType: string){
    await expect(this.paymentType, "Payment type should be displayed as " + paymentType).toHaveText(paymentType)
  }

  async validateTickerTimer(){
    const currtimer = (await this.tickerTimer.innerText()).split(" ")[2]
    await this.page.waitForTimeout(2000)
    const nexttimer = (await this.tickerTimer.innerText()).split(" ")[2]
    let compareStatus = false
    if(new Date( '1/1/1999 ' + currtimer) > new Date( '1/1/1999 ' + nexttimer)){
        compareStatus = true
    }
    expect(compareStatus, "The ticker times should be displayed. Earlier Time: " + currtimer + " Next Time: " + nexttimer).toBe(true)
  }

}
