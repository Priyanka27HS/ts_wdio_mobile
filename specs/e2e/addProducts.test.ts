import { LoginScreen } from "../../screens/loginScreen.ts";
import { ProductsScreen } from "../../screens/productScreen.ts";
import { CartScreen } from "../../screens/cartScreen.ts";
import { MyCartScreen } from "../../screens/myCartScreen.ts";
import { CheckOutScreen } from "../../screens/checkOutScreen.ts";
import { ShippingAddressUi } from "../../resources/shippingAddressUi.ts";
import { CardDetails } from "../../resources/cardDetailsUi.ts"
import { AppActionsUtil } from "../../utilities/appActionsUtil.ts";

let loginScreen : LoginScreen;
let productsScreen : ProductsScreen;
let checkOutScreen : CheckOutScreen;
let cartScreen : CartScreen;
let myCartScreen : MyCartScreen;

const appActionsUtil = new AppActionsUtil;

describe('Add Products to the cart', () => {

    before(async () => {
        loginScreen = new LoginScreen();
        productsScreen = new ProductsScreen();
        cartScreen = new CartScreen();
        myCartScreen = new MyCartScreen();
        checkOutScreen = new CheckOutScreen();
    });

    afterEach(async () => {
        await appActionsUtil.appActions();
    });
    

    it('Add first item to the cart', async () => {

        const username: string = 'bob@example.com';
        const password: string = '10203040';

        const shippingAddressDetails: ShippingAddressUi = {
            fullName: 'Rebecca Winter',
            addressLine1: 'Mandorley 112',
            addressLine2: 'Entrance 1',
            city: 'Truro',
            state: 'Cornwall',
            zipCode: 89750,
            country: 'United Kingdom'
        };

        const cardDetails: CardDetails = {
            fullName: 'Rebecca Winter',
            cardNumber: '325812657568789',
            expirationDate: '0325',
            securityCode: 123
        }

        await loginScreen.login(username, password);
        await productsScreen.clickOnProduct();
        await cartScreen.addToCart();
        await cartScreen.getCartIcon();
        await myCartScreen.clickProceedToCheckoutButton();
        await checkOutScreen.enterShippingAddressDetails(shippingAddressDetails);
        await checkOutScreen.clickToPaymentButton();
        await checkOutScreen.enterCardDetails(cardDetails);
        await checkOutScreen.clickReviewOrderButton();
        await checkOutScreen.clickPlaceOrderButton();
        await checkOutScreen.clickContinueShoppingButton();
    });
});