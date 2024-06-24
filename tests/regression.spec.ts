import { test, expect } from '../base/basetest';

test.describe("Regression TestSuite for Payments", async () => {

  test("Verify the Login Page", async({loginCred, loginPage}) => {
    await loginPage.login(loginCred.url)
    await loginPage.verifyPageLayout()
    await loginPage.verifyhelperText()
  });

  test("Verify Invalid Login", async({loginCred, loginPage}) => {
    await loginPage.login(loginCred.url)
    await loginPage.inValidLogin("MANAS")
  });

  test("Verify Invalid Login with correct credential but incorrect case ", async({loginCred, loginPage}) => {
    await loginPage.login(loginCred.url)
    await loginPage.inValidLogin("ManasSwain")
  });

  test("Verify Valid Login ", async({loginCred, loginPage}) => {
    await loginPage.login(loginCred.url)
    await loginPage.validLogin(loginCred.custID)
  });

  test("Verify Payment Method Page ", async({loginCred, loginPage,paymentPage}) => {
    await loginPage.login(loginCred.url)
    await loginPage.validLogin(loginCred.custID)
    await paymentPage.verifyPaymentMethodPage()
    await paymentPage.verifyTotalAmountDue()
  });

  test("Verify continue button is enabled only after selecting crypto ", async({loginCred, loginPage,paymentPage}) => {
    await loginPage.login(loginCred.url)
    await loginPage.validLogin(loginCred.custID)
    await paymentPage.verifyPaymentMethodPage()
    await paymentPage.verifyContinueBtnStatus(false)
    await paymentPage.selectPaymentMethod('BTC')
    await paymentPage.verifyContinueBtnStatus(true)
  });

  test("Select Payment Method Page and Continue ", async({loginCred, loginPage, paymentPage}) => {
    await loginPage.login(loginCred.url)
    await loginPage.validLogin(loginCred.custID)
    await paymentPage.selectPaymentandContinue('BTC')
  });

  test("Verify Payment Instruction Page ", async({loginCred, loginPage,paymentPage,instructionPage}) => {
    await loginPage.login(loginCred.url)
    await loginPage.validLogin(loginCred.custID)
    await paymentPage.selectPaymentandContinue('BTC')
    await instructionPage.verifyPaymentInstructionPage()
    await instructionPage.validatePaymentType('BTC')
  });

  test("Verify Payment Instruction Page Ticker Timer ", async({loginCred, loginPage,paymentPage,instructionPage}) => {
    await loginPage.login(loginCred.url)
    await loginPage.validLogin(loginCred.custID)
    await paymentPage.selectPaymentandContinue('BTC')
    await instructionPage.verifyPaymentInstructionPage()
    await instructionPage.validateTickerTimer()
  });

  test("Verify Payment Instruction Page Copy to Clipboard ", async({loginCred, loginPage,paymentPage,instructionPage}) => {
    await loginPage.login(loginCred.url)
    await loginPage.validLogin(loginCred.custID)
    await paymentPage.selectPaymentandContinue('BTC')
    await instructionPage.validateCopytoClipBoard()
  });

  test("Navigation to the Payment Status Page ", async({loginCred, loginPage,paymentPage,instructionPage}) => {
    await loginPage.login(loginCred.url)
    await loginPage.validLogin(loginCred.custID)
    await paymentPage.selectPaymentandContinue('USDT')
    await instructionPage.navigateToPaymentStatusPage()
  });

  test("Validate the Payment Status Page ", async({loginCred, loginPage,paymentPage,instructionPage,statusPage}) => {
    await loginPage.login(loginCred.url)
    await loginPage.validLogin(loginCred.custID)
    await paymentPage.selectPaymentandContinue('BTC')
    await instructionPage.navigateToPaymentStatusPage()
    await statusPage.verifyPaymentStatusPage()
  });

  test("Validate the Payment Status in Payment Status Page ", async({loginCred, loginPage,paymentPage,instructionPage,statusPage}) => {
    await loginPage.login(loginCred.url)
    await loginPage.validLogin(loginCred.custID)
    await paymentPage.selectPaymentandContinue('BTC')
    await instructionPage.navigateToPaymentStatusPage()
    await statusPage.verifyPaymentStatusPage()
    await statusPage.validatedPaymentStatus("Unpaid","There is a balance owing on your account. Please make a payment to complete this transaction.")
  });

  test("Verify Make Payment page navigation in Payment Status Page", async({loginCred, loginPage,paymentPage,instructionPage,statusPage}) => {
    await loginPage.login(loginCred.url)
    await loginPage.validLogin(loginCred.custID)
    await paymentPage.selectPaymentandContinue('BTC')
    await instructionPage.navigateToPaymentStatusPage()
    await statusPage.verifyPaymentStatusPage()
    await statusPage.clickPaymentButton()
    await paymentPage.verifyPaymentMethodPage()
  });

})