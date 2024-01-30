import { LoginScreen } from "../../screens/loginScreen.ts";
import { HomeScreen } from "../../screens/homeScreen.ts";
import { CartScreen } from "../../screens/cartScreen.ts";
import { MyCartScreen } from "../../screens/myCartScreen.ts";
import { CheckOutScreen } from "../../screens/checkOutScreen.ts";
import { ShippingAddress } from "../../resources/customTypes/shippingAddress.ts";
import { CardDetails } from "../../resources/customTypes/cardDetails.ts"
import { AppActionsUtil } from "../../../utilities/appActionsUtil.ts";
import { LOGGER, LoggerHelper } from "../../../customLogger/loggerHelper.ts";
import * as shippingAddressDetailsJson from "../../resources/testdata/shippingAddressDetails.json"
import * as cardDetailsJson from "../../resources/testdata/cardDetails.json"
import { FileUtils } from "../../../utilities/fileUtil.ts";
import { LoginDetails } from "../../resources/customTypes/loginDetails.ts";
import * as loginDetailsJson from "../../resources/testdata/loginDetails.json"

let loginScreen : LoginScreen;
let homeScreen : HomeScreen;
let checkOutScreen : CheckOutScreen;
let cartScreen : CartScreen;
let myCartScreen : MyCartScreen;
let loginDetails: LoginDetails;

const appActionsUtil = new AppActionsUtil;
const specName: string = 'E2E test scenario';

describe('Add Products to the cart', () => {

    before(async () => {
        loginScreen = new LoginScreen();
        homeScreen = new HomeScreen();
        cartScreen = new CartScreen();
        myCartScreen = new MyCartScreen();
        checkOutScreen = new CheckOutScreen();
        LoggerHelper.setupLogger(specName);
        loginDetails = loginDetailsJson as LoginDetails;
    });

    afterEach(async () => {
        await appActionsUtil.appActions();
    });

    it('Add first item to the cart', async () => {

        const loginDetails: LoginDetails = FileUtils.convertJsonToCustomType(loginDetailsJson);
        const shippingAddressDetails: ShippingAddress = FileUtils.convertJsonToCustomType(shippingAddressDetailsJson);
        const cardDetails: CardDetails = FileUtils.convertJsonToCustomType(cardDetailsJson);

        await loginScreen.login(loginDetails.username, loginDetails.password);
        LOGGER.info('***** Adding products to the cart *****');
        await homeScreen.clickOnProduct();
        await cartScreen.addToCart();
        await cartScreen.getCartIcon();
        await myCartScreen.clickProceedToCheckoutButton();
        await checkOutScreen.enterShippingAddressDetails(shippingAddressDetails);
        await checkOutScreen.clickToPaymentButton();
        await checkOutScreen.enterCardDetails(cardDetails);
        await checkOutScreen.clickReviewOrderButton();
        await checkOutScreen.clickPlaceOrderButton();

        const orderConfirmationEle = await checkOutScreen.getOrderConfirmationEle();
        const orderConfirmationText = await orderConfirmationEle.getText();

        expect(orderConfirmationText).toBe(' Your order has been dispatched and will arrive as fast as the pony gallops!');

        await checkOutScreen.clickContinueShoppingButton();
        LOGGER.info('***** Added products to the cart successfully *****')
    });
});