// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';
import { permission } from 'node:process';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config={
  testDir: './tests',
  retries:2,
  workers:7,
 timeout: 50 * 1000,
 expect: {
    timeout: 5000
  },
  reporter: 'html',
  projects: [
    {
      name: 'chrome',
      use: { 
            browserName: 'chromium',
            headless: false,
            screenshot: 'on',
            ignoreHttpSErrors: true,
            permissions: ['geolocation'],
            trace: 'on',  //on or off or retain-on-failure
            video: "retain-on-failure",
            launchOptions: {
                slowMo: 500,
            }
            // ...devices['iPhone 15 Pro Max'],
            //viewport: { width: 720, height: 720 },

    }
},
    {
        name: 'firefox',
        use: { 
           browserName: 'firefox',
            headless: true,
            screenshot: 'retain-on-failure',
            trace: 'on',  //on or off or retain-on-failure
            video: "retain-on-failure",
            launchOptions: {
                slowMo: 500,
            }
         },
    }
]


};
  

module.exports = config;
