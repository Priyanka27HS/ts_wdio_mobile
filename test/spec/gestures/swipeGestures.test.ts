import { BaseActions } from "../../../utilities/baseActions.ts";
import { ProductsScreen } from "../../screens/productScreen.ts";
import { AppActionsUtil } from "../../../utilities/appActionsUtil.ts";
import { LOGGER, LoggerHelper } from "../../../customLogger/loggerHelper.ts";

let productsScreen: ProductsScreen;
let baseActions: BaseActions;

const appActionsUtil = new AppActionsUtil;
const specName: string = 'Swipe gestures';

describe("***** Performing Swipe Gestures *****", () => {

    before(async () => {
        productsScreen = new ProductsScreen();
        baseActions = new BaseActions();
        LoggerHelper.setupLogger(specName);
    });

    afterEach(async () => {
        await appActionsUtil.appActions();
    });


    it('Scroll until an element is visible on a mobile app', async () => {
        const footerEle = await productsScreen.getFooterLabel();
        await BaseActions.swipeUpFromMiddle();
        LOGGER.info('***** Scroll an element is done *****');
    })

    it('Perform a vertical swipe (scroll down) on a mobile app', async () => {
        await driver.pause(5000);
    
        const startX = 500;
        const startY = 800;
        const endY = 200;
    
        await BaseActions.swipe(startX, startY, endY);
        LOGGER.info('***** Vertical swipe operations are done *****');
    });
    

    it('Scroll until an element is visible on a mobile app -> Swipe Gestures Based on Screen Percentages', async () => {
        await (await productsScreen.getFirstItemEle()).waitForDisplayed();
        await driver.pause(3000);
        await BaseActions.swipeByPercentage(await productsScreen.getFooterLabel(), 30, 70);
        LOGGER.info('***** Swipe by percentage is done *****');
    });

})