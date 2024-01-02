import { $ } from "@wdio/globals"
import { LeftScreenMenuPage } from "./leftScreenMenuPage";
import { ProductsPage } from "./productsPage"


export class LogoutPage {

    productsPage : ProductsPage;
    leftScreenMenuPage: LeftScreenMenuPage;

    constructor() {
        this.productsPage = new ProductsPage();
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

        (await this.productsPage.getHamburgerIconEle()).click();
        (await this.leftScreenMenuPage.getLogOutButton()).click();
        await (await this.getLogOutButtonEle()).waitForDisplayed();
        await (await this.getLogOutButtonEle()).click();
        (await this.getLogOutSucessMsgEle()).waitForDisplayed();
        await (await this.getLogOutOkButtonEle()).waitForDisplayed();
        await (await this.getLogOutOkButtonEle()).click();
        (await this.productsPage.getProductTextOnHomeScreenEle()).waitForDisplayed();

    }

}