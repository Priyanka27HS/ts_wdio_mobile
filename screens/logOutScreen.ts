import { $ } from "@wdio/globals"
import { LeftScreenMenu } from "./leftScreenMenu";
import { ProductsScreen } from "./productScreen"


export class LogoutScreen {

    productsScreen : ProductsScreen;
    leftScreenMenu: LeftScreenMenu;

    constructor() {
        this.productsScreen = new ProductsScreen();
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

        (await this.productsScreen.getHamburgerIconEle()).click();
        (await this.leftScreenMenu.getLogOutButton()).click();
        await (await this.getLogOutButtonEle()).waitForDisplayed();
        await (await this.getLogOutButtonEle()).click();
        (await this.getLogOutSucessMsgEle()).waitForDisplayed();
        await (await this.getLogOutOkButtonEle()).waitForDisplayed();
        await (await this.getLogOutOkButtonEle()).click();
        (await this.productsScreen.getProductTextOnHomeScreenEle()).waitForDisplayed();

    }

}