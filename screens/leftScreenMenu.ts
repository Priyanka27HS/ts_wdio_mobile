import { $ } from '@wdio/globals'

export class LeftScreenMenu {

    private selectors = {

        expandMenuButton: "~open menu",
        catalogLabel: "~menu item catalog",
        webViewButton: '//android.widget.TextView[@text="Webview"]',
        qrCodeScannerButton: '//android.widget.TextView[@text="QR Code Scanner"]',
        geoLocationButton: '//android.widget.TextView[@text="Geo Location"]',
        drawingButton: '//android.widget.TextView[@text="Drawing"]',
        aboutButton: '//android.widget.TextView[@text="About"]',
        resetAppButton: '//android.widget.TextView[@text="Reset App State"]',
        fingerPrintButton: '//android.widget.TextView[@text="FingerPrint"]',
        loginButtonFromSideMenu: "~menu item log in",
        logOutButton: '//android.widget.TextView[@text="Log Out"]',
        // ~menu item log out
        apiCallsButton: '//android.widget.TextView[@text="Api Calls"]',
        sauceBotVideoButton: '//android.view.ViewGroup[@content-desc="menu item sauce bot video"]',

    };

    async getExpandMenuButton() {
        return $(this.selectors.expandMenuButton);
    }

    async getCatalogLabel() {
        return $(this.selectors.catalogLabel);
    }

    async getWebViewButton() {
        return $(this.selectors.webViewButton);
    }

    async getQrCodeScannerButton() {
        return $(this.selectors.qrCodeScannerButton);
    }

    async getGeoLocationButton() {
        return $(this.selectors.geoLocationButton);
    }

    async getDrawingButton() {
        return $(this.selectors.drawingButton);
    }

    async getAboutButton() {
        return $(this.selectors.aboutButton);
    }

    async getResetAppButton() {
        return $(this.selectors.resetAppButton);
    }

    async getFingerPrintButton() {
        return $(this.selectors.fingerPrintButton);
    }

    async getLoginButtonFromSideMenu() {
        return $(this.selectors.loginButtonFromSideMenu);
    }

    async getLogOutButton() {
        return $(this.selectors.logOutButton);
    }

    async getApiCallsButton() {
        return $(this.selectors.apiCallsButton);
    }

    async getSauceBotVideoButton() {
        return $(this.selectors.sauceBotVideoButton);
    }

    async navigateToLoginPage() {

        const expandMenuButton = await this.getExpandMenuButton();
        await expandMenuButton.waitForDisplayed();
        await expandMenuButton.click();

        const loginButtonFromSideMenu = await this.getLoginButtonFromSideMenu();
        loginButtonFromSideMenu.waitForDisplayed();
        await loginButtonFromSideMenu.click();
    }

}