/**
 * @author Manas Ranjan Swain
 * @Date 22-June-2024
 *  @description This page contains all methods of login page
 */
import { expect, Page} from "@playwright/test";
import { loginPageLocators } from "../locators/loginPageLocators";

export class loginPage extends loginPageLocators {

  constructor(page: Page) {
      super(page);
  }

  async login(url: string){
    await this.page.goto(url, { waitUntil : "load"})
    await this.page.waitForLoadState()
    await expect(this.welcomeLabel, "Welcome Page should be Visible").toBeVisible()
  }

  async verifyPageLayout(){
    await expect(this.custRefId, "Enter Customer Reference Id should be visible").toBeVisible()
    await expect(this.helperText, "Helper text should be visible").toBeVisible()
    await expect(this.continueButton, "Continue button should be visible").toBeVisible()
  }

  async inValidLogin(custId: string){
    await this.custRefId.fill(custId)
    await this.continueButton.click()
    await expect(this.incorrectLoginAlert, "Invalid Login Alert is displayed for " + custId).toBeVisible()
  }

  async validLogin(custId: string){
    await this.custRefId.fill(custId)
    await this.continueButton.click()
    await expect(this.page.getByText('Customer Reference ID Confirmed. Thank you'), "Customer Reference ID Confirmed. Thank you is Displayed").toBeVisible()
    await this.page.waitForLoadState()
  }

  async verifyhelperText(){
    await expect(this.helperText, "Helper text is displayed").toBeVisible()
    await expect(this.helperText).toHaveText("Where can I find my Customer Reference ID?")
    await this.helperText.dispatchEvent("mouseover")
    await expect(this.page.getByText(this.helperMouseoverText), "Helper mouse over text is displayed: " + this.helperMouseoverText).toBeVisible()
  }

}
