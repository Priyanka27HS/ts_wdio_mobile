export class ProductsPage {

    private selectors = {

        hamburgerIcon: "~open menu",
        productTextOnHomeScreen: "//android.widget.TextView[@text='Products']",
        fleeceJacketLabel: '//android.widget.TextView[@text="Sauce Labs Fleece Jacket"]',
        fleeceJacketPrice: '//android.widget.TextView[@text="$49.99"]',

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

}