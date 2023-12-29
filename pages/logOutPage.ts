import { $ } from "@wdio/globals"
import { HomePage } from "./homePage";
import { LeftScreenMenuPage } from "./leftScreenMenuPage";


export class LogoutPage {

    homePage : HomePage;
    leftScreenMenuPage: LeftScreenMenuPage;

    constructor() {
        this.homePage = new HomePage();
        this.leftScreenMenuPage = new LeftScreenMenuPage();
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

        (await this.homePage.getHamburgerIconEle()).click();
        (await this.leftScreenMenuPage.getLogOutButton()).click();
        await (await this.getLogOutButtonEle()).waitForDisplayed();
        await (await this.getLogOutButtonEle()).click();
        (await this.getLogOutSucessMsgEle()).waitForDisplayed();
        await (await this.getLogOutOkButtonEle()).waitForDisplayed();
        await (await this.getLogOutOkButtonEle()).click();
        (await this.homePage.getProductTextOnHomeScreenEle()).waitForDisplayed();

    }

}