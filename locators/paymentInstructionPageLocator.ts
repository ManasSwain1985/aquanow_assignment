/**
 * @author Manas Ranjan Swain
 * @Date 22-June-2024
 *  @description This page contains all locators for Payment Instruction page
 */
import { Page, Locator} from "@playwright/test";

export class paymentInstructionPageLocator {

    page: Page
    readonly pageHeader: Locator
    readonly deposittoWalletHeader: Locator
    readonly depositAddress: Locator
    readonly viewPaymentStatusButton: Locator
    readonly copytoClipboardLink: Locator
    readonly paymentType: Locator
    readonly tickerTimer: Locator
    readonly qrCode: Locator

  constructor(page: Page) {
    this.page = page
    this.pageHeader = page.getByText("Payment instructions")
    this.deposittoWalletHeader= page.getByText("Deposit to wallet")
    this.depositAddress = page.locator('p:below(:text("Deposit address"))').first()
    this.viewPaymentStatusButton = page.getByRole("button").and(page.getByTitle("View payment status"))
    this.copytoClipboardLink = page.locator('p:below(:text("Deposit address"))').first().locator("svg")
    this.paymentType = page.locator('h2:below(:text("Amount due"))').first()
    this.tickerTimer = page.getByRole('alert').locator('.MuiAlert-message')
    this.qrCode = page.getByTestId("qr-code-svg")
  }
}