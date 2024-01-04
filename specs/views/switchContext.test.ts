import { LeftScreenMenu } from "../../screens/leftScreenMenu.ts";
import { LoginScreen } from "../../screens/loginScreen";
import { ProductsScreen } from "../../screens/productScreen.ts";
import { WebViewScreen } from "../../screens/webViewScreen.ts";
import { SwitchContextUtil } from "../../utilities/switchContextUtil.ts";


let loginScreen : LoginScreen;
let productsScreen : ProductsScreen;
let leftScreenMenu : LeftScreenMenu;
let webViewScreen : WebViewScreen;
let switchContextUtil : SwitchContextUtil;

describe('***** Switch between Web view and Native view in a Mobile App *****', async () => {

    before(async () => {
        loginScreen = new LoginScreen();
        productsScreen = new ProductsScreen();
        leftScreenMenu = new LeftScreenMenu();
        webViewScreen = new WebViewScreen();
        switchContextUtil = new SwitchContextUtil();

    });

    afterEach(async () => {
        await driver.terminateApp("com.saucelabs.mydemoapp.rn");
        await driver.activateApp("com.saucelabs.mydemoapp.rn");
    });

    it('Switch between Native and Web views', async () => {

        const url: string = 'https://www.google.com';

        (await productsScreen.getHamburgerIconEle()).click();
        await leftScreenMenu.clickMenuItemWebview();
        await webViewScreen.enterUrl(url);
        await webViewScreen.clickGoToSiteButton();

        await driver.waitUntil(
            async () => {
                return ((await driver.getContexts()).length) > 1;
            },
            { timeout: 50000, }
        );

        const contexts = await driver.getContexts();
        const nativeView = contexts[0];
        const webviewContext = contexts[1];
        await driver.switchContext(webviewContext.toString());
        console.log('The webview url is : ' + await browser.getUrl());
        await driver.switchContext(nativeView.toString());
        await driver.back();
        await productsScreen.getHamburgerIconEle();
    });
    
})