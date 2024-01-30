import { $ } from "@wdio/globals";
import { BaseActions } from "../../utilities/baseActions";
import { expect } from 'chai';
import { LOGGER } from "../../customLogger/loggerHelper";
import { XpathUtil } from "../../utilities/xpathUtil";

const platform = process.env.PLATFORM;

let baseActions: BaseActions;

export class HomeScreen extends BaseActions {

    baseActions = new BaseActions();

    private selectors = {

        hamburgerIcon:  platform === 'ANDROID' ? "~open menu": "~tab bar option menu",
        productTextOnHomeScreen: platform === "ANDROID" ?
        "//android.widget.TextView[@text='Products']" :
        "//XCUIElementTypeStaticText[@name='Products']",

        fleeceJacketLabel: '//android.widget.TextView[@text="Sauce Labs Fleece Jacket"]',
        fleeceJacketPrice: '//android.widget.TextView[@text="$49.99"]',
        sauceLabsBackPackProduct: "(//android.widget.TextView[@content-desc='store item text'])[1]",

        firstItem: platform === 'ANDROID' ?
        "(//android.view.ViewGroup[@content-desc='store item'])[1]/android.view.ViewGroup[1]/android.widget.ImageView" :
        "",

        footerLabel: platform === "ANDROID" ?
        "//android.widget.TextView[@text='© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy.']/parent::android.view.ViewGroup" :
        "",
      
        products: "(//android.widget.TextView[@content-desc='store item text'])",
        
        sortButton: platform === "ANDROID" ?
            "~sort button" :
            "",
        sortType: platform === "ANDROID" ?
            "~##PLACEHOLDER##" :
            "",
        productName: platform === "ANDROID" ?
            "//android.widget.TextView[@content-desc='store item text']" :
            "",
        productPrice: platform === "ANDROID" ?
            "//android.widget.TextView[@content-desc='store item price']" :
            "",
    }

    static sortingOrder = {
        NAME_ASCENDING: 'nameAsc',
        NAME_DESCENDING: 'nameDesc',
        PRICE_ASCENDING: 'priceAsc',
        PRICE_DESCENDING: 'priceDesc'
    };

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

    async clickSortButton(): Promise<void> {
        await (await $(this.selectors.sortButton)).click();
    }

    async clickOnProduct() {
        const productElement = await this.getSauceLabsBackPackProductEle();
        await productElement.waitForDisplayed();
        await productElement.click();
    }

    async getFooterLabel() {
        await driver.pause(3000);
        return await $(this.selectors.footerLabel);
    }

    async getFirstItemEle() {
        return await $(this.selectors.firstItem);
    }

    public async getAllProductElements() {
        return await $$(this.selectors.products);
    }

    public async selectProductByName(productName: string): Promise<void> {
        const productElement = await this.findProductElementByName(productName);
        if (productElement) {
            await productElement.click();
        } else {
            throw new Error(`Product not found: ${productName}`);
        }
    }

    public async findProductElementByName(productName: string): Promise<WebdriverIO.Element | undefined> {
        const allProductElements = await this.getAllProductElements();

        return allProductElements.find(async (element) => {
            const elementName = await element.getText();
            return elementName === productName;
        });
    }
}