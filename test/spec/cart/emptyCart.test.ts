import { LOGGER, LoggerHelper } from "../../../customLogger/loggerHelper.ts";
import { LoginScreen } from "../../screens/loginScreen.ts";
import { HomeScreen } from "../../screens/homeScreen.ts";
import { CartScreen } from "../../screens/cartScreen.ts";
import { MyCartScreen } from "../../screens/myCartScreen.ts";
import { LoginDetails } from "../../resources/customTypes/loginDetails.ts";
import * as loginDetailsJson from "../../resources/testdata/loginDetails.json"
import { FileUtils } from "../../../utilities/fileUtil.ts";
import { ProductDetails } from "../../resources/customTypes/productDetails.ts";
import { CartUtil } from "../../commonFunctions/cartUtil.ts";
import { AppActionsUtil } from "../../../utilities/appActionsUtil.ts";
import * as productDetailJson from "../../resources/testdata/productDetails.json"

const appActionsUtil = new AppActionsUtil;

let loginScreen: LoginScreen;
let homeScreen: HomeScreen;
let cartScreen: CartScreen;
let myCartScreen: MyCartScreen;
let loginDetails: LoginDetails;
let productDetails: ProductDetails;
let cartUtil: CartUtil;

const NO_ITEMS_LABEL = 'No Items';
const CART_IS_EMPTY_MESSAGE = 'Oh no! Your cart is empty. Fill it up with swag to complete your purchase.';

const specName = 'Empty cart';
describe("Should able to empty the cart", () => {

    before(async () => {
        LoggerHelper.setupLogger(specName);
        loginScreen = new LoginScreen();
        homeScreen = new HomeScreen();
        cartScreen = new CartScreen();
        myCartScreen = new MyCartScreen();
        cartUtil = new CartUtil();
        loginDetails = FileUtils.convertJsonToCustomType(loginDetailsJson);
        // productDetails = FileUtils.convertJsonToCustomType(productDetailJson);
        await loginScreen.login(loginDetails.username, loginDetails.password);
    });

    afterEach(async () => {
        await appActionsUtil.appActions();
    });

    it("Add products and empty the cart", async () => {

        try {

            const productDetailsList: ProductDetails[] = FileUtils.convertJsonToCustomType(productDetailJson);

            const addedQuantity = 1;
            const initialQuantity = 1;
            await cartUtil.addToCart(productDetailsList[0].name, addedQuantity);

            // const individualProductPrice = 15.99;
            const expectedTotalPrice = productDetailsList[0].price * (initialQuantity + addedQuantity);

            await cartScreen.getCartIcon();

            await verifyTotalPriceInCart(expectedTotalPrice);

            await myCartScreen.getRemoveItem();

            const noItemsLabel = await (await myCartScreen.getNoItemsLabel()).getText();
            expect(noItemsLabel).toBe(NO_ITEMS_LABEL);

            const cartIsEmptyMsg = await (await myCartScreen.getCartIsEmptyMessage()).getText();
            expect(cartIsEmptyMsg).toBe(CART_IS_EMPTY_MESSAGE);

            (await myCartScreen.getGoShoppingButton()).click();
        } catch (error) {
            LOGGER.error(`Error during test execution: ${(error as Error).message}`);
            throw error;
        }
    });

    async function verifyTotalPriceInCart(expectedTotalPrice: number) {
        const actualTotalPriceBeforeRemove = await (await myCartScreen.getTotalPriceEle()).getText();
        const actualTotalPrice = Number(actualTotalPriceBeforeRemove.replace('$', ''));

        expect(actualTotalPrice).toEqual(expectedTotalPrice);
    }
})