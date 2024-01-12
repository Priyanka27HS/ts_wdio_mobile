# Typescript_WDIO_APPIUM Project

# Description 

This project is a Mobile Automation framework using TypeScript and WebdriverIO with the Appium library, built on the Mocha framework.

# Techstacks 

   * TypeScript(Javascript) is used as the programming language.
   * WebdriverIO & Appium library for App automation.
   * Chai library is used for assertions.
   * Allure-Reports for creating reports.
   * Jest for test execution.

# Pre-requisites 

Before you begin with the Mobile Automation using TypeScript, WebdriverIO and Appium ensure you have the following pre-requisites installed on your local system.

   * NodeJs
   * Java
   * Visual Studio Code (VS Code)
   * Appium
   * Android Studio
   * adb (Android Debug Bridge) -> Android SDK
   * Browserstack account for Browserstack App automation.
   * The framework is set up on your system. 

# Getting started with APP Automation

   * Clone the repository to your local machine.
   * Add the 'apk' to the app directory.
   * Change the 'wdio.conf.ts' file in the 'config' directory for WebdriverIO configuration.
   * Run 'npm install' to install all required dependencies listed in the 'package.json' file.
   * To execute a single test, use the command 'npm run test-local'.
   * To execute all tests, use the command 'npm run wdio' for executing all tests.

# Folder Structure

   * apk: Android app 
   * config: Browserstack configuration file
   * reporting: Loggers file
   * screens: Page Object Model (POM) screens
   * resources: Custom types -> Interfaces, testdata -> JSON files
   * .github -> GitHub Actions workflow configuration (.yml) file
   * specs: All test files
   * utilities: All common methods
   * .gitignore: Git ignore file
   * package.json: All required dependencies are installed
   * Typescript and WDIO configs: ts config.json file, wdio.conf.ts file
