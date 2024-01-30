import { BaseActions } from "../../../utilities/baseActions.ts";
import { HomeScreen } from "../../screens/homeScreen.ts";
import { AppActionsUtil } from "../../../utilities/appActionsUtil.ts";
import { LOGGER, LoggerHelper } from "../../../customLogger/loggerHelper.ts";

let homeScreen: HomeScreen;
let baseActions: BaseActions;

const appActionsUtil = new AppActionsUtil;
const specName: string = 'Swipe gestures';

describe("***** Performing Swipe Gestures *****", () => {

    before(async () => {
        homeScreen = new HomeScreen();
        baseActions = new BaseActions();
        LoggerHelper.setupLogger(specName);
    });

    afterEach(async () => {
        await appActionsUtil.appActions();
    });

    it('Scroll until an element is visible on a mobile app', async () => {
        const footerEle = await homeScreen.getFooterLabel();
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
        await (await homeScreen.getFirstItemEle()).waitForDisplayed();
        await driver.pause(3000);
        await BaseActions.swipeByPercentage(await homeScreen.getFooterLabel(), 30, 70);
        LOGGER.info('***** Swipe by percentage is done *****');
    });
})