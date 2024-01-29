import { LeftScreenMenu } from "../../screens/leftScreenMenu.ts";
import { LoginScreen } from "../../screens/loginScreen.ts";
import { HomeScreen } from "../../screens/homeScreen.ts";
import { WebViewScreen } from "../../screens/webViewScreen.ts";
import { AppActionsUtil } from "../../../utilities/appActionsUtil.ts";
import { SwitchContextUtil } from "../../../utilities/switchContextUtil.ts";

let loginScreen : LoginScreen;
let homeScreen : HomeScreen;
let leftScreenMenu : LeftScreenMenu;
let webViewScreen : WebViewScreen;
let switchContextUtil : SwitchContextUtil;

const appActionsUtil = new AppActionsUtil;

describe('***** Switch between Web view and Native view in a Mobile App *****', async () => {

    before(async () => {
        loginScreen = new LoginScreen();
        homeScreen = new HomeScreen();
        leftScreenMenu = new LeftScreenMenu();
        webViewScreen = new WebViewScreen();
        switchContextUtil = new SwitchContextUtil();
    });

    afterEach(async () => {
        await appActionsUtil.appActions();
    });

    it('Switching between Native to Web views', async () => {

        const url: string = 'https://www.google.com';

        (await homeScreen.getHamburgerIconEle()).click();
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
        await homeScreen.getHamburgerIconEle();
    });

    it('Switching between native and web views', async () => {

        const url: string = 'https://www.google.com';
    
        (await homeScreen.getHamburgerIconEle()).click();
        await leftScreenMenu.clickMenuItemWebview();
        await webViewScreen.enterUrl(url);
        await webViewScreen.clickGoToSiteButton();
    
        await switchContextUtil.switchToWebContext();
        console.log('The webview url is : ' + await browser.getUrl());

        await switchContextUtil.switchToNativeContext();

        await driver.back();
        await homeScreen.getHamburgerIconEle();
    });
})