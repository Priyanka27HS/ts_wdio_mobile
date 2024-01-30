import { HomeScreen } from "./homeScreen"
import { MyCartScreen } from "./myCartScreen";
import { $ } from "@wdio/globals"

export class CartScreen {

    homeScreen : HomeScreen;
    myCartScreen: MyCartScreen;

    constructor() {
        this.homeScreen = new HomeScreen();
        this.myCartScreen= new MyCartScreen();
    }

    private selectors = {

        productPriceLabel: '~product price',
        increaseQuantity: '//android.view.ViewGroup[@content-desc="counter plus button"]/android.widget.ImageView',
        decreaseQuantity: '//android.view.ViewGroup[@content-desc="counter minus button"]/android.widget.ImageView',
        addToCartButton: '~Add To Cart button',
        productsHighlightsLabel: '//android.widget.TextView[@text="Product Highlights"]',
        cartBadge: '~cart badge',
    }

    async getProductPriceLabel() {
        return await $(this.selectors.productPriceLabel);
    }

    async getIncreaseQuantity() {
        return await $(this.selectors.increaseQuantity);
    }

    async increaseQuantity(qty: number) {
        for(let i=1; i<=qty; i++) {
            (await $(this.selectors.increaseQuantity)).click();
        }
    }

    async getDecreaseQuantity() {
        return await $(this.selectors.decreaseQuantity);
    }

    async getAddToCartButton() {
        return await $(this.selectors.addToCartButton);
    }

    async getProductsHighlightsLabel() {
        return await $(this.selectors.productsHighlightsLabel);
    }

    async getCartIcon() {
        const cartIconEle = $(this.selectors.cartBadge);
        await cartIconEle.click();
    }

    async addToCart() {
        const addToCartButton = await this.getAddToCartButton();
        await addToCartButton.waitForDisplayed();
        await addToCartButton.click();
    }
    
    async getProductPriceLabelText() {
        const productPriceLabelElement = await $(this.selectors.productPriceLabel);
        await productPriceLabelElement.waitForDisplayed();
        return await productPriceLabelElement.getText();
    }

    async addToCartProduct() {

        const fleeceJacketLabelElement = await this.homeScreen.getFleeceJacketLabel();
        await fleeceJacketLabelElement.waitForDisplayed();

        for (let i = 0; i < 3; i++) {
            (await this.getIncreaseQuantity()).click();
        }

        (await this.getAddToCartButton()).click();
        await this.getCartIcon();

        const removeProduct = await this.myCartScreen.getRemoveItem();
        await removeProduct.waitForDisplayed();
        await removeProduct.click();
    }
}