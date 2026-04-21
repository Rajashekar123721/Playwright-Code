// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config={
  testDir: './tests',
  retries:2,
 timeout: 50 * 1000,
 expect: {
    timeout: 5000
  },
  reporter: 'html',
      use: { 
            browserName: 'chromium',
            headless: true,
            screenshot: 'on',
            trace: 'on',  //on or off or retain-on-failure
            video: "retain-on-failure",
            launchOptions: {
                slowMo: 500,
            }

    },


};

module.exports = config;
