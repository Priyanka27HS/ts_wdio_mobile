import * as fs from 'fs';

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'priyankahs_ESljGO',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'qTpfkmcJsugKDHyShJ5t',
  hostname: 'hub.browserstack.com',
  maxInstances: 1,
  specs: [`${process.cwd()}/test/specs/**/*.test.ts`],
  coloredLogs: true,
  logLevel: "info",
  waitforTimeout: 50000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 1,
  services: [
    [
      'browserstack',
      {
        app: 'bs://557ea258f0c4b9233af2588d4bbfc05dabfa6445',
        browserstackLocal: true
      },
    ]
  ],
  capabilities: [{
    'bstack:options': {
      deviceName: 'Samsung Galaxy S23 Ultra',
      platformVersion: '13.0',
      platformName: 'android',
    }
  },
  ],
  commonCapabilities: {
    'bstack:options': {
      projectName: "BrowserStack Sauce Labs App",
      buildName: "bstack-sauceLabs",
      debug: true,
      networkLogs: true
    }
  },
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        disableMochaHooks: true
      },
    ],
  ],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    if (!fs.existsSync("./errorShots")) {
      fs.mkdirSync("./errorShots");
    }
    if (!passed) {
      await driver.saveScreenshot(`./errorShots/${test.title.replaceAll(" ", "_")}.png`);
    }
  },
}