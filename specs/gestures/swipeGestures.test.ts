import { BaseActions } from "../../utilities/baseActions.ts";
import { ProductsScreen } from "../../screens/productScreen";
import { AppTerminationUtil } from "../../utilities/appTerminationUtil.ts";


let productsScreen: ProductsScreen;
let baseActions: BaseActions;

const appTerminationUtil = new AppTerminationUtil;


describe("***** Swipe Gestures *****", () => {

    before(async () => {
        productsScreen = new ProductsScreen();
        baseActions = new BaseActions();
    });

    afterEach(async () => {
        await appTerminationUtil.terminateApp();
    });


    it('Scroll until an element is visible on a mobile app', async () => {
        const footerEle = await productsScreen.getFooterLabel();
        await BaseActions.swipeUpFromMiddle();
    })

    it('Perform a vertical swipe (scroll down) on a mobile app', async () => {
        await driver.pause(2000);
    
        const startX = 500;
        const startY = 800;
        const endY = 200;
    
        await BaseActions.swipe(startX, startY, endY);
    });
    

    it('Scroll until an element is visible on a mobile app (Swipe Gestures Based on Screen Percentages)', async () => {
        await (await productsScreen.getFirstItemEle()).waitForDisplayed();
        await BaseActions.swipeByPercentage(await productsScreen.getFooterLabel(), 30, 70);
    });

})