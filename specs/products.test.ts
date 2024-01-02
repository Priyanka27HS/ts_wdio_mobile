import { CartPage } from "../pages/cartPage";
import { LoginPage } from "../pages/loginPage";
import { ProductsPage } from "../pages/productsPage";
import * as assert from 'assert';
import { MyCartPage } from "../pages/myCartPage";
import { LogoutPage } from "../pages/logOutPage";


describe('Product Price Comparison', () => {
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let loginPage : LoginPage;
    let myCartPage : MyCartPage;
    let logoutPage : LogoutPage;

    before(async () => {
        productsPage = new ProductsPage();
        cartPage = new CartPage();
        loginPage = new LoginPage();
        myCartPage = new MyCartPage();
        logoutPage = new LogoutPage();

        await loginPage.login("bob@example.com", "10203040");
    });

    it('Assert the prices from both the pages', async () => {

        (await productsPage.getFleeceJacketLabel()).click();

        const productsPagePrice = await productsPage.getFleeceJacketPriceText();
        const cartPagePrice = await cartPage.getProductPriceLabelText();

        assert.equal(productsPagePrice, cartPagePrice, 'Product prices do not match');

        console.log("*****************FIRST TEST CASE******************");

        // Terminate and Launch the driver again
    //     await driver.terminateApp("com.saucelabs.mydemoapp.rn");
    //     await driver.activateApp("com.saucelabs.mydemoapp.rn");
    });

    it('Add products to the cart and remove item', async () => {

        console.log("**********************SECOND TEST CASE START***************************");


        (await productsPage.getFleeceJacketLabel()).click();
        
        await cartPage.addToCartProduct();

        const noItemsLabel = await (await myCartPage.getNoItemsLabel()).getText();
        expect(noItemsLabel).toBe('No Items');

        const cartIsEmptyMessage = await (await myCartPage.getCartIsEmptyMessage()).getText();
        expect(cartIsEmptyMessage).toBe('Oh no! Your cart is empty. Fill it up with swag to complete your purchase.');

        (await myCartPage.getGoShoppingButton()).click();
        console.log("**********************SECOND TEST CASE END***************************");


        // Terminate and Launch the driver again
        // await driver.terminateApp("com.saucelabs.mydemoapp.rn");
        // await driver.activateApp("com.saucelabs.mydemoapp.rn");
    });
})
