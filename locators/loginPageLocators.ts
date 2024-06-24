/**
 * @author Manas Ranjan Swain
 * @Date 22-June-2024
 *  @description This page contains locators of login page
 */
import { Page, Locator} from "@playwright/test";

export class loginPageLocators {

    page: Page
    readonly welcomeLabel: Locator
    readonly custRefId: Locator
    readonly helperText: Locator
    readonly continueButton: Locator
    readonly incorrectLoginAlert: Locator
    helperMouseoverText: string

  constructor(page: Page) {
    this.page = page
    this.welcomeLabel = page.getByText("Welcome")
    this.custRefId= page.getByRole("textbox")
    this.helperText = page.locator("#invoice-helper-text")
    this.continueButton = page.getByRole("button", {name: "Continue"})
    this.incorrectLoginAlert = page.getByRole("alert").filter({hasText: "Something went wrong. Please contact your support representative."})
    this.helperMouseoverText = "Please contact your client service representative or sales agent for your Customer Reference ID."
  }

}