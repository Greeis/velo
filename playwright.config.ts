import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 60_000, //60 segundos - Tempo maximo para cada teste completo (30 segundos é o padrão)
  expect: {
    timeout: 5_000, //5 segundos - Tempo maximo de espera para cada expectativa, tempo maximo de para assertions (nao vale a pena usar)
  },

  testDir: './playwright/e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    // Tempo maximo de espera para cada ação (clicks, preenchimentos, etc)
    // Quando o valor é 0, o playwright usa o timeout padrão
    actionTimeout: 5_000, //5 segundos

    // Tempo maximo de espera para cada navegação (goto, waitForURL etc)
    // Quando o valor é 0, o playwright usa o timeout padrão
    navigationTimeout: 10_000, //10 segundos 

    // Outros
    // waitForTimeout: 10000, //10 segundos - Tempo maximo de espera para cada espera (waitForTimeout, etc)
    // waitForSelectorTimeout: 10000, //10 segundos - Tempo maximo de espera para cada seleção (waitForSelector, etc)
    // waitForFunctionTimeout: 10000, //10 segundos - Tempo maximo de espera para cada função (waitForFunction, etc)
    // waitForLoadStateTimeout: 10000, //10 segundos - Tempo maximo de espera para cada estado de carga (waitForLoadState, etc)
    // waitForNetworkIdleTimeout: 10000, //10 segundos - Tempo maximo de espera para cada estado de idle (waitForNetworkIdle, etc)
    // waitForNetworkQuietTimeout: 10000, //10 segundos - Tempo maximo de espera para cada estado de quiet (waitForNetworkQuiet, etc)
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
