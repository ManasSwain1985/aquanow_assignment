/**
 * @author Manas Ranjan Swain
 * @Date 22-June-2024
 *  @description This page contains all locators for Payment Method page
 */
import { Page, Locator} from "@playwright/test";

export class paymentMethodPageLocator {

    page: Page
    readonly transactionHeader: Locator
    readonly paymentMethodHeader: Locator
    readonly totalAmountdue: Locator
    readonly continueButton: Locator
    readonly paymentMethodCombobox: Locator
    readonly networkTypeCombobox: Locator
    readonly totalAmountDue: Locator
    readonly amountWithoutFee: Locator
    readonly fee: Locator
    

  constructor(page: Page) {
    this.page = page
    this.transactionHeader = page.getByText("Transaction details")
    this.paymentMethodHeader= page.getByText("Payment method")
    this.totalAmountdue = page.locator('.MuiPaper-root').filter({has: page.getByText('Total amount due')})
    this.continueButton = page.getByRole('button').and(page.getByTitle('Continue'))
    this.paymentMethodCombobox = page.locator("#mui-component-select-cryptoType")
    this.networkTypeCombobox = page.locator("#mui-component-select-networkType")
    this.totalAmountDue = page.locator('h2:below(:text("Total amount due"))').first()
    this.amountWithoutFee = page.locator('h2:below(:text("Amount without fee"))').first()
    this.fee = page.locator('h2:below(:text-is("Fee"))').first()
  }

}