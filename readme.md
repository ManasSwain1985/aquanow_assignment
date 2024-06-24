## Summary
- Playwright framework with Typescript is used to automate the test cases. POM based framework was used for the automation.
- Currently the execution is done from Chrome, Firefox and Webkit browsers in headless mode. 
- The configuration can be updated from playwright.config.ts file.
- Screenshot is captured for the Payment Status page as part of E2E Test suite.
- The automation scripts were developed and tested in windows OS but the same should work for MAC OS as well

## FAILED SCENARIO
- The Deposit Address is not being displayed in Payment Instruction page
- The Validation of the Deposit Address is not included as part of E2E TCs flow
- Payment History could not be verified due to unavailability of BackEnd

## Required software
- Node js -> v.14 or above
- VS Code
- Playwright VS Code Extension

## How to Execute
- Download the repository
- Run `npm ci` in the main directory of the repository to install all dependencies
- There are two ways to trigger the Test execution
    1. Running the complete Regression or E2E Suite
        - npm run E2ESuite
        - npm run regresionSuite
    2. To run a test with a specific title, use the -grep flag followed by the title of the testcase
        - npx playwright test --grep "Payment Instruction"
- Execution Report would be available in folder playwright-report
- Url and CustId are fetched from data/credential.json and can be updated if required

## Folder Structure
 - tests: Contains the spec file (test suites)
 - screens: Page Object Models based class for each screen
 - locators: Locator Defination for all the screens
 - data: Test Data in json format to be used for Execution
 - base: Base Test class which would be used as fixtures in all the test scripts

## Future Enhancements
- Include more reporting structure
- Mock for the Backend to be able to test scenarios even when BE is not available. Need more information about the APIs
- Creating interface for the playwright keywords to overwrite the functionality
- Creation Github workflows (Sample workflow is included)

## Test Suites
There are two suite created as part of testing
- E2E : Contain the E2E data driven test for payment method
- Regression : Component level regression tests for application
Scenarios:
1) Verify the Login Page
2) Verify Invalid Login
3) Verify Invalid Login with correct credential but incorrect case
4) Verify Valid Login
5) Verify Payment Method Page
6) Verify continue button is enabled only after selecting crypto 
7) Select Payment Method Page and Continue
8) Verify Payment Instruction Page
9) Verify Payment Instruction Page Ticker Timer
10) Verify Payment Instruction Page Copy to Clipboard
11) Navigation to the Payment Status Page 
12) Validate the Payment Status Page
13) Validate the Payment Status in Payment Status Page
14) Verify Make Payment page navigation in Payment Status Page

