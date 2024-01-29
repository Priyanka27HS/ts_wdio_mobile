import { $ } from "@wdio/globals";
import { BaseActions } from "../../utilities/baseActions";

const platform = process.env.PLATFORM;

let baseActions: BaseActions;

export class HomeScreen extends BaseActions {

    baseActions = new BaseActions();

    private selectors = {

        hamburgerIcon:  platform === 'ANDROID' ? "~open menu": "~tab bar option menu",
        productTextOnHomeScreen: "//android.widget.TextView[@text='Products']",
        fleeceJacketLabel: '//android.widget.TextView[@text="Sauce Labs Fleece Jacket"]',
        fleeceJacketPrice: '//android.widget.TextView[@text="$49.99"]',
        sauceLabsBackPackProduct: "(//android.widget.TextView[@content-desc='store item text'])[1]",
        firstItem: "(//android.view.ViewGroup[@content-desc='store item'])[1]/android.view.ViewGroup[1]/android.widget.ImageView",
        boltTshirtProduct: "//android.widget.TextView[@text='Sauce Labs Bolt T-Shirt']",
        boltTshirtProductPrice: "//android.widget.TextView[@text='$15.99']",
        footerLabel: "//android.widget.TextView[@text='© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy.']/parent::android.view.ViewGroup",
        // productByName: "//android.widget.TextView[@content-desc='store item text' and @text='##PLACEHOLDER##']/parent::android.view.ViewGroup",
        products: "(//android.widget.TextView[@content-desc='store item text'])"
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
        await driver.pause(3000);
        return await $(this.selectors.footerLabel);
    }

    async getFirstItemEle() {
        return await $(this.selectors.firstItem);
    }

    public async getAllProductElements() {
        return await $$(this.selectors.products);
    }

    public async getBoltTshirtProductEle() {
        return await $(this.selectors.boltTshirtProduct);
    }

    async getBoltTshirtPrice() {
        const boltTshirtPrice = await $(this.selectors.boltTshirtProductPrice);
        await boltTshirtPrice.waitForDisplayed();
        return await boltTshirtPrice.getText();
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