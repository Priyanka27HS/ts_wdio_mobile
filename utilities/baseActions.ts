import { SwipeCordinates } from "../test/resources/customTypes/swipeCordinates";
import { LOGGER } from "../customLogger/loggerHelper";

export class BaseActions {

    private static readonly SWIPE_PERCENTAGES = {
        START_SWIPE_Y: 0.5,
        END_SWIPE_Y: 0.2,
    };
  
    private static readonly PAUSE = 500;

    public static async swipeUpFromMiddle(): Promise<void> {
        const windowSize = await driver.getWindowRect();
        const swipeCordinates = {
            startY: windowSize.height * this.SWIPE_PERCENTAGES.START_SWIPE_Y,
            startX: windowSize.width / 2,
            endY: windowSize.height * this.SWIPE_PERCENTAGES.END_SWIPE_Y,
        };
  
        await BaseActions.performSwipe(swipeCordinates);
    }
  
    private static async performSwipe(swipeCordinates: SwipeCordinates): Promise<void> {

        LOGGER.info('*** Performing SWIPE actions ***');

        await browser
            .action('pointer', { parameters: { 'pointerType': 'touch' } })
            .move({ x: swipeCordinates.startX, y: swipeCordinates.startY })
            .down()
            .pause(this.PAUSE)
            .move({ x: swipeCordinates.startX, y: swipeCordinates.endY })
            .up()
            .perform();
    }
    

    public static async swipe(startX: number, startY: number, endY: number): Promise<void> {
        LOGGER.info('*** Performing SWIPE actions ***');
        const swipeCordinates = { startX, startY, endY };
        await BaseActions.performSwipe(swipeCordinates);
    }

    public static async swipeByPercentage(element: WebdriverIO.Element, startPercentageY: number, endPercentageY: number): Promise<void> {
        const windowSize = await driver.getWindowRect();
        const startX = windowSize.width / 2;  // Center of the screen
        const startY = windowSize.height * (startPercentageY / 100);
        const endY = windowSize.height * (endPercentageY / 100);

        const swipeCordinates = { startX, startY, endY };
        await BaseActions.performSwipe(swipeCordinates);
    }
}