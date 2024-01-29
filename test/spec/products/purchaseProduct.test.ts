import * as assert from 'assert';
import { LoginScreen } from "../../screens/loginScreen.ts";
import { LogoutScreen } from "../../screens/logOutScreen.ts";
import { HomeScreen } from '../../screens/homeScreen.ts';
import { CartScreen } from "../../screens/cartScreen.ts";
import { MyCartScreen } from "../../screens/myCartScreen.ts";
import { AppActionsUtil } from "../../../utilities/appActionsUtil.ts";
import { LOGGER, LoggerHelper } from '../../../customLogger/loggerHelper.ts';
import { LoginDetails } from "../../resources/customTypes/loginDetails.ts";
import * as loginDetailsJson from "../../resources/testdata/loginDetails.json"

const appActionsUtil = new AppActionsUtil;
const specName: string = 'Purchasing a product';
let loginDetails: LoginDetails;

describe('Product Price Comparison', () => {

    let loginScreen : LoginScreen;
    let homeScreen : HomeScreen;
    let cartScreen : CartScreen;
    let myCartScreen : MyCartScreen;
    let logoutScreen  : LogoutScreen;

    before(async () => {

        loginScreen = new LoginScreen();
        homeScreen = new HomeScreen();
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

        (await homeScreen.getFleeceJacketLabel()).click();

        const productsPagePrice = await homeScreen.getFleeceJacketPriceText();
        const cartPagePrice = await cartScreen.getProductPriceLabelText();

        assert.equal(productsPagePrice, cartPagePrice, 'Product prices do not match');
        LOGGER.info('***** Product prices are compared *****');
    });

    it('Add products to the cart and remove item', async () => {

        (await homeScreen.getFleeceJacketLabel()).click();
        await cartScreen.addToCartProduct();

        const noItemsLabel = await (await myCartScreen.getNoItemsLabel()).getText();
        expect(noItemsLabel).toBe('No Items');

        const cartIsEmptyMessage = await (await myCartScreen.getCartIsEmptyMessage()).getText();
        expect(cartIsEmptyMessage).toBe('Oh no! Your cart is empty. Fill it up with swag to complete your purchase.');

        (await myCartScreen.getGoShoppingButton()).click();
        LOGGER.info('***** Item is removed from the cart *****');
    });
})
