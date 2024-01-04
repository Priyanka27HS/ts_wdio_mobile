import { BaseActions } from "../../commonFunctions/baseActions";
import { ProductsScreen } from "../../screens/productScreen";

let productsScreen: ProductsScreen;
let baseActions: BaseActions;

describe("***** Swipe Gestures *****", () => {

    before(async () => {
        productsScreen = new ProductsScreen();
        baseActions = new BaseActions();
    });

    afterEach(async () => {

        // Terminate and Launch the driver again
        await driver.terminateApp("com.saucelabs.mydemoapp.rn");
        await driver.activateApp("com.saucelabs.mydemoapp.rn");
    });


    it('Scroll until an element is visible on a mobile app', async () => {
        const footerEle = await productsScreen.getFooterLabel();
        await baseActions.swipe(footerEle);
    })


    it('Perform a vertical swipe (scroll down) on a mobile app', async () => {
        await driver.pause(2000);

        const startX = 500;
        const startY = 800;
        const endY = 200;

        await driver.touchAction([
            { action: 'press', x: startX, y: startY },
            { action: 'wait', ms: 500 },
            { action: 'moveTo', x: startX, y: endY },
            { action: 'release' }
        ]);
    });


    it('Scroll until an element is visible on a mobile app (Swipe Gestures Based on Screen Percentages)', async () => {
        await (await productsScreen.getFirstItemEle()).waitForDisplayed();
        await baseActions.swipeByPercentage(await productsScreen.getFooterLabel(), 30, 70);
    });

})