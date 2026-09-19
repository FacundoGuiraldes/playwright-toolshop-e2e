# Playwright Toolshop E2E

End-to-end test automation framework built with **Playwright** and **TypeScript**, targeting [Toolshop](https://practicesoftwaretesting.com) — a demo e-commerce site purpose-built for practicing test automation.

Toolshop was chosen over the more common SwagLabs demo site because it more closely mirrors a real e-commerce application (dynamic product catalog, multi-step checkout, guest and authenticated flows, its own REST API) and is less saturated in QA portfolios.

## Tech Stack

- [Playwright](https://playwright.dev/) — cross-browser (Chromium, Firefox, WebKit) test execution
- **TypeScript**
- **Page Object Model**, with each page split into up to four files by responsibility:
  - `*.page.elements.ts` — locators
  - `*.page.methods.ts` — actions, each wrapped in an Allure step for readable reports
  - `*.page.data.ts` — test data (credentials, addresses, expected messages)
  - `*.page.interfaces.ts` — TypeScript types for that page's data
- [Allure](https://allurereport.org/) — HTML test reporting, via `allure-playwright` + `allure-js-commons`
- `dotenv` — credentials loaded from environment variables, never hardcoded
- `npm-run-all2` / `rimraf` — cross-platform npm scripts (no reliance on OS-specific shell syntax)

## Project Structure

```
pages/
  common-page/            shared navbar/header, available on every page
  login-page/
  products-page/
  product-detail-page/
  cart-page/
  checkout-page/          address step
  checkout-overview-page/ payment step
  account-page/           reserved for future coverage
  register-page/          reserved for future coverage
support/
  allure-logger.ts        AllureLogger — step/verification/pre-post-condition helpers
  base-test.ts            extended Playwright `test` with automatic Allure suite labeling
tests/
  login.spec.ts
  products.spec.ts
  cart.spec.ts
  checkout.spec.ts
  critical-path.spec.ts   end-to-end smoke test across the full purchase flow
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Java](https://adoptium.net/) — required by Allure's command-line report generator

### Installation

```bash
git clone https://github.com/FacundoGuiraldes/playwright-toolshop-e2e.git
cd playwright-toolshop-e2e
npm install
npx playwright install
```

### Environment variables

Test credentials are read from environment variables, never committed to source control. Copy the example file and fill in real values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `CUSTOMER_EMAIL` / `CUSTOMER_PASSWORD` | Primary customer account |
| `CUSTOMER2_EMAIL` / `CUSTOMER2_PASSWORD` | Secondary customer account |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin account |

## Running Tests

Run the full suite:

```bash
npm run run-test
```

Run a specific browser:

```bash
npx playwright test --project=chromium
```

Run a specific file:

```bash
npx playwright test tests/login.spec.ts
```

## Reporting

This project uses Allure instead of Playwright's built-in HTML reporter.

```bash
npm run generate-report   # build the HTML report from the last run's results
npm run open-report       # serve it locally in the browser
```

Or run everything in one step — clean old results, run the tests, generate and open the report, even if a test fails along the way:

```bash
npm run test-and-report
```

## Test Coverage

| Suite | Cases |
|---|---|
| **Login** | valid credentials, invalid credentials, blank fields, empty email, empty password, invalid email format, password too short, logout |
| **Products** | search by name, reset search, filter by category, sort by price, pagination, open a product |
| **Cart** | add item, remove item |
| **Checkout** | full purchase flow — address form + Bank Transfer payment |
| **Critical Path** | end-to-end smoke test: login → browse → add to cart → enter checkout → logout |

## Roadmap

- CI/CD pipeline (GitHub Actions)
- `account-page` / `register-page` coverage
