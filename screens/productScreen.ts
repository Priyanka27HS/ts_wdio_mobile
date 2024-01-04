import { $ } from "@wdio/globals";
import { BaseActions } from "../utilities/baseActions";

let baseActions: BaseActions;

export class ProductsScreen {

    baseActions = new BaseActions();

    private selectors = {

        hamburgerIcon: "~open menu",
        productTextOnHomeScreen: "//android.widget.TextView[@text='Products']",
        fleeceJacketLabel: '//android.widget.TextView[@text="Sauce Labs Fleece Jacket"]',
        fleeceJacketPrice: '//android.widget.TextView[@text="$49.99"]',
        sauceLabsBackPackProduct: "(//android.widget.TextView[@content-desc='store item text'])[1]",
        firstItem: "(//android.view.ViewGroup[@content-desc='store item'])[1]/android.view.ViewGroup[1]/android.widget.ImageView",
        footerLabel: "//android.widget.TextView[@text='© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy.']/parent::android.view.ViewGroup"

    }

    async getHamburgerIconEle() {
        return await $(this.selectors.hamburgerIcon);
    }

    async getProductTextOnHomeScreenEle() {
        return await $(this.selectors.productTextOnHomeScreen);
    }

    async getFleeceJacketLabel() {
        return await $(this.selectors.fleeceJacketLabel);
    }

    async getFleeceJacketPrice() {
        return await $(this.selectors.fleeceJacketPrice);
    }

    async getFleeceJacketPriceText() {
        const fleeceJacketPriceElement = await $(this.selectors.fleeceJacketPrice);
        await (await this.getFleeceJacketPrice()).waitForDisplayed();
        return await fleeceJacketPriceElement.getText();
    }

    public async getSauceLabsBackPackProductEle() {
        return await $(this.selectors.sauceLabsBackPackProduct);
    }

    async clickOnProduct() {
        const productElement = await this.getSauceLabsBackPackProductEle();
        await productElement.waitForDisplayed();
        await productElement.click();
    }

    async getFooterLabel() {
        return await $(this.selectors.footerLabel);
    }

    async getFirstItemEle() {
        return await $(this.selectors.firstItem);
    }

}