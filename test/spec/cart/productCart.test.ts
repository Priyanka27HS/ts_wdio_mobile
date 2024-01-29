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
import * as productDetailJson from "../../resources/testdata/productDetails.json"
import { AppActionsUtil } from "../../../utilities/appActionsUtil.ts";

const appActionsUtil = new AppActionsUtil;

let loginScreen: LoginScreen;
let homeScreen: HomeScreen;
let cartScreen: CartScreen;
let myCartScreen: MyCartScreen;
let loginDetails: LoginDetails;
let productDetails: ProductDetails[];
let cartUtil: CartUtil;

const specName = 'Product price scenarios';
describe("Product Price Comparison", () => {

    before(async () => {
        LoggerHelper.setupLogger(specName);
        loginScreen = new LoginScreen();
        homeScreen = new HomeScreen();
        cartScreen = new CartScreen();
        myCartScreen = new MyCartScreen();
        cartUtil = new CartUtil();
        loginDetails = FileUtils.convertJsonToCustomType(loginDetailsJson);
        await loginScreen.login(loginDetails.username, loginDetails.password);
        // const productDetailsList: ProductDetails[] = FileUtils.convertJsonToCustomType(productDetailJson);
        productDetails = FileUtils.convertJsonToCustomType(productDetailJson);

    });

    afterEach(async () => {
        await appActionsUtil.appActions();
    });

    it('Add multiple products to the cart', async function () {

        try {
            const product1Quantity = 3;
            await cartUtil.addToCart(productDetails[0].name, product1Quantity);
            await driver.back();

            const product2Quantity = 2;
            await cartUtil.addToCart(productDetails[1].name, product2Quantity);
            await driver.back();

            await cartScreen.getCartIcon();
        } catch (error) {
            LOGGER.error(`Error during test execution: ${(error as Error).message}`);
            throw error;
        }
    });
})