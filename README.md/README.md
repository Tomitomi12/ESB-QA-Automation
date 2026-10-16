ESB QA Technical Assessment

Project Overview

This project contains automated UI tests for "SauceDemo" (https://www.saucedemo.com/) using Playwright with TypeScript. The tests cover login functionality, shopping cart operations, checkout flow, and product sorting.

Tech Stack

- Language: TypeScript
- Automation Framework: Playwright Test
- Browser: Chromium
- Test Pattern: Page Object Model (POM)
- Reporting: Playwright HTML Reporter

Project Structure

ESB-QA-Assessment/
├── pages/
│   ├── CheckoutPage.ts
│   ├── LoginPage.ts
│   └── ProductsPage.ts
├── tests/
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── example.spec.ts
│   ├── login.spec.ts
│   └── sorting.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md

Test Coverage

1. Login

- Verify successful login with valid credentials.
- Verify an error message is displayed for invalid credentials.

2. Shopping Cart

- Add two different products to the cart.
- Verify both products are displayed in the cart.
- Verify the cart badge reflects the number of added products.

3. Checkout

- Enter customer information.
- Verify the checkout overview displays item subtotal, tax, and total.
- Validate that item subtotal plus tax equals the total.
- Complete the order and verify the confirmation message.

4. Product Sorting

- Sort products by price from high to low.
- Verify that all displayed product prices are in descending order.
- Verify that the first product has the highest price.

Prerequisites

- Node.js and npm
- Git
- Visual Studio Code (or another code editor)

Installation

Clone the repository and navigate to the project directory:

git clone <repository-url>
cd ESB-QA-Assessment

Install project dependencies:

npm install

Install the Chromium browser required by Playwright:

npx playwright install chromium

Running Tests

Run all tests:

npx playwright test --project=chromium

Run a specific test file:

npx playwright test tests/login.spec.ts --project=chromium

Run tests with line-based terminal output:

npx playwright test --project=chromium --reporter=line

Test Report

Generate and open the HTML report:

npx playwright test --project=chromium
npx playwright show-report

The report provides a summary of test execution results and details about failed tests, if any.

Design Approach

The project uses the Page Object Model (POM) to separate page locators and actions from test scenarios. This improves maintainability and reduces duplication across tests.

Assertions are used to validate expected application behavior and outcomes. The tests avoid fixed sleep statements and rely on Playwright's built-in waiting and assertion mechanisms.

Test Execution Result

The complete test suite was executed locally using Chromium.

Latest result: 7 passed, 0 failed