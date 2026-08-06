import { defineConfig, devices } from '@playwright/test';


const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const runOutput = `reports/run-${timestamp}`;

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'always' }],
    ['json', { outputFile: `${runOutput}/report.json` }]
  ],

  outputDir: `${runOutput}/artifacts`,

  use: {
    baseURL: "http://localhost:3001",
    ignoreHTTPSErrors: true,

    //VIDEO
    video: {
      mode: "on",
      size: { width: 1920, height: 1080 },
    },

    //SCREENSHOT
    screenshot: 'only-on-failure',

    //TRACE (for debug detail)
    trace: 'on-first-retry',

    actionTimeout: 1200000,
  },

  timeout: 5 * 60 * 1000,

  projects: [
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: {
          firefoxUserPrefs: {
            'network.protocol-handler.external.etanah': false,
            'network.protocol-handler.warn-external.etanah': false,

            'network.protocol-handler.external.etanahv2': false,
            'network.protocol-handler.warn-external.etanahv2': false,
          },
        },
      },
    },
  ],
});