import { ProductsPage } from "./productsPage"

export class MyCartPage {

    productsPage : ProductsPage;

    constructor() {
        this.productsPage = new ProductsPage();
    }

    private selectors = {

        myCartLabel: '//android.widget.TextView[@text="My Cart"]',
        removeItem: '//android.widget.TextView[@text="Remove Item"]',
        noItemsLabel: '//android.widget.TextView[@text="No Items"]',
        cartIsEmptyMessage: '//android.widget.TextView[@text="Oh no! Your cart is empty. Fill it up with swag to complete your purchase."]',
        goShoppingButton: '//android.view.ViewGroup[@content-desc="Go Shopping button"]',

    }

    async getMyCartLabel() {
        return await $(this.selectors.myCartLabel);
    }

    async getRemoveItem() {
        return await $(this.selectors.removeItem);
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

}