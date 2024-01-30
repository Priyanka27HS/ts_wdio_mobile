import { $ } from "@wdio/globals"
import { LeftScreenMenu } from "./leftScreenMenu";
import { HomeScreen } from "./homeScreen"

export class LogoutScreen {

    homeScreen : HomeScreen;
    leftScreenMenu: LeftScreenMenu;

    constructor() {
        this.homeScreen = new HomeScreen();
        this.leftScreenMenu = new LeftScreenMenu();
    }

    private locators = {
        logOutButton: "//android.widget.Button[@text='LOG OUT']",
        logOutSucessMsg: "//android.widget.TextView[@text='You are successfully logged out.']",
        logOutOkButton: "//android.widget.Button[@text='OK']"
    }

    public async getLogOutButtonEle() {
        return await $(this.locators.logOutButton);
    }

    public async getLogOutOkButtonEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.logOutOkButton);
    }

    public async getLogOutSucessMsgEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.logOutSucessMsg);
    }

    public async logout() : Promise<void> {

        (await this.homeScreen.getHamburgerIconEle()).click();
        (await this.leftScreenMenu.getLogOutButton()).click();
        await (await this.getLogOutButtonEle()).waitForDisplayed();
        await (await this.getLogOutButtonEle()).click();
        (await this.getLogOutSucessMsgEle()).waitForDisplayed();
        await (await this.getLogOutOkButtonEle()).waitForDisplayed();
        await (await this.getLogOutOkButtonEle()).click();
        (await this.homeScreen.getProductTextOnHomeScreenEle()).waitForDisplayed();
    }
}