import { HomeScreen } from "./homeScreen"

export class MyCartScreen {

    homeScreen : HomeScreen;

    constructor() {
        this.homeScreen = new HomeScreen();
    }

    private selectors = {

        myCartLabel: '//android.widget.TextView[@text="My Cart"]',
        removeItem: '//android.widget.TextView[@text="Remove Item"]',
        noItemsLabel: '//android.widget.TextView[@text="No Items"]',
        cartIsEmptyMessage: '//android.widget.TextView[@text="Oh no! Your cart is empty. Fill it up with swag to complete your purchase."]',
        goShoppingButton: '//android.view.ViewGroup[@content-desc="Go Shopping button"]',
        proceedToCheckoutButton: "~Proceed To Checkout button",
        totalPrice: "~total price",
        productText: '//android.widget.TextView[@content-desc="product label"]',
    }

    async getMyCartLabel() {
        return await $(this.selectors.myCartLabel);
    }

    async getRemoveItem() {
        try {
            const clickRemoveItemButtonEle = await $(this.selectors.removeItem);
            await clickRemoveItemButtonEle.waitForExist({ timeout: 5000 }); 
            await clickRemoveItemButtonEle.waitForDisplayed();
            await clickRemoveItemButtonEle.click();
            return clickRemoveItemButtonEle;
        } catch (error) {
            console.error("Error in getRemoveItem:", error);
            throw error;
        }
    }

    async getNoItemsLabel() {
        return await $(this.selectors.noItemsLabel);
    }

    async getCartIsEmptyMessage() {
        return await $(this.selectors.cartIsEmptyMessage);
    }

    async getGoShoppingButton() {
        return await $(this.selectors.goShoppingButton);
    }

    async getProccedTOCheckoutButtonEle() {
        return await $(this.selectors.proceedToCheckoutButton);
    }

    async getTotalPriceEle() {
        return await $(this.selectors.totalPrice);
    }

    async getProductText() {
        return await $$(this.selectors.productText);
    }

    async clickProceedToCheckoutButton() {
        const proceedToCheckoutButtonEle = await $(this.selectors.proceedToCheckoutButton);
        await proceedToCheckoutButtonEle.waitForDisplayed();
        await proceedToCheckoutButtonEle.click();
    }
}