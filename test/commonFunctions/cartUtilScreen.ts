import { CartScreen } from "../screens/cartScreen";
import { MyCartScreen } from "../screens/myCartScreen";
import { HomeScreen } from "../screens/homeScreen";

export class CartUtilScreen {

    cartScreen: CartScreen;
    myCartScreen: MyCartScreen;
    homeScreen: HomeScreen;

    constructor() {
        this.cartScreen = new CartScreen();
        this.myCartScreen = new MyCartScreen();
        this.homeScreen = new HomeScreen();
    }

    async addToCart(productName: string, addedQuantity:number) {
        const productElement = await this.homeScreen.findProductElementByName(productName);

        if (productElement) {
            await productElement.click();

            const addToCartButton = await this.cartScreen.getAddToCartButton();

            if(addToCartButton) {
                await addToCartButton.waitForDisplayed();
                await this.cartScreen.increaseQuantity(addedQuantity);
                await addToCartButton.click();
            } else {
                throw new Error(`Add to Cart button not found for product: ${productName}`);
            }    
        } else {
            throw new Error(`Product not found: ${productName}`);
        }
    }

    async getCartItems() {
        await driver.pause(3000);
        const cartItemsElements = await this.myCartScreen.getProductText();
        const cartItems: string[] = [];
        for (const cartItemElement of cartItemsElements) {
            const itemName = await cartItemElement.getText();
            cartItems.push(itemName);
        }
        return cartItems;
    }

    async verifyTotalPriceInCart(expectedTotalPrice: number) {
        const actualTotalPriceBeforeRemove = await (await this.myCartScreen.getTotalPriceEle()).getText();
        const actualTotalPrice = Number(actualTotalPriceBeforeRemove.replace('$', ''));
        expect(actualTotalPrice).toEqual(expectedTotalPrice);
    }
}