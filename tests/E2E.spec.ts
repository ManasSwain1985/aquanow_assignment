import { test, expect } from '../base/basetest';
import inputdata from "../data/input-data.json"


test.describe("Regression TestSuite for Payments", async () => {

    
  // Data driven test for different Payment Method
  for(const input of inputdata){

    test(`E2E Test for Payment Method ${input.paymentType}`, async({page,loginCred, loginPage,paymentPage,instructionPage,statusPage}, testInfo) =>{
      await test.step("Login to Application ", async () => {
        await loginPage.login(loginCred.url)
        await loginPage.validLogin(loginCred.custID)
      })

      await test.step("Select Payment Method ", async () => {
        await paymentPage.selectPaymentandContinue(input.paymentType)
      })

      await test.step("Navigate Payment Status Page ", async () => {
        await instructionPage.verifyPaymentInstructionPage()
        await instructionPage.validatePaymentType(input.paymentType)
        await instructionPage.navigateToPaymentStatusPage()
      })

      await test.step("Verify Payment Status ", async () => {
        await statusPage.validatedPaymentStatus(input.paymentStatus)
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
        await statusPage.clickPaymentButton()
        await paymentPage.verifyPaymentMethodPage()
      })
    })
  }

})