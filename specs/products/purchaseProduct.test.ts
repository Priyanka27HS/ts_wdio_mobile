import * as assert from 'assert';
import { LoginScreen } from "../../screens/loginScreen";
import { LogoutScreen } from "../../screens/logOutScreen";
import { ProductsScreen } from '../../screens/productScreen';
import { CartScreen } from "../../screens/cartScreen";
import { MyCartScreen } from "../../screens/myCartScreen";
import { AppActionsUtil } from "../../utilities/appActionsUtil.ts";
import { LOGGER, LoggerHelper } from '../../reporting/loggerHelper.ts';
import { LoginDetails } from "../../resources/customTypes/loginDetails";
import * as loginDetailsJson from "../../resources/testdata/loginDetails.json"

const appActionsUtil = new AppActionsUtil;
const specName: string = 'Purchasing a product';
let loginDetails: LoginDetails;

describe('Product Price Comparison', () => {

    let loginScreen : LoginScreen;
    let productsScreen : ProductsScreen;
    let cartScreen : CartScreen;
    let myCartScreen : MyCartScreen;
    let logoutScreen  : LogoutScreen;

    before(async () => {

        loginScreen = new LoginScreen();
        productsScreen = new ProductsScreen();
        cartScreen = new CartScreen();
        myCartScreen = new MyCartScreen();
        logoutScreen = new LogoutScreen();
        loginDetails = loginDetailsJson as LoginDetails;
        LoggerHelper.setupLogger(specName);
    });

    afterEach(async () => {
        await appActionsUtil.appActions();
    });

    it('Assert the prices from both the pages', async () => {

        (await productsScreen.getFleeceJacketLabel()).click();

        const productsPagePrice = await productsScreen.getFleeceJacketPriceText();
        const cartPagePrice = await cartScreen.getProductPriceLabelText();

        assert.equal(productsPagePrice, cartPagePrice, 'Product prices do not match');
        LOGGER.info('***** Product prices are compared *****');
    });

    it('Add products to the cart and remove item', async () => {

        (await productsScreen.getFleeceJacketLabel()).click();
        await cartScreen.addToCartProduct();

        const noItemsLabel = await (await myCartScreen.getNoItemsLabel()).getText();
        expect(noItemsLabel).toBe('No Items');

        const cartIsEmptyMessage = await (await myCartScreen.getCartIsEmptyMessage()).getText();
        expect(cartIsEmptyMessage).toBe('Oh no! Your cart is empty. Fill it up with swag to complete your purchase.');

        (await myCartScreen.getGoShoppingButton()).click();
        LOGGER.info('***** Item is removed from the cart *****');
    });
})
