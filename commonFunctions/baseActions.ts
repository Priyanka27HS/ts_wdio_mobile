import { $ } from "@wdio/globals"

export class BaseActions {

    async tap(element: string | WebdriverIO.Element, timeout?: number): Promise<void> {
        const actualTimeout = timeout ?? 30000;
        try {
            if (typeof element === 'string') {
                element = await $(element);
            }
            await element.waitForDisplayed({ timeout: actualTimeout });

            await driver.touchAction([
                {
                    action: 'tap',
                    element: element
                }
            ]);
        } catch (err: any) {
            console.error(`Error tapping on element: ${element}: \n${err.stack}`);
            throw err;
        }
    }


    async pressAndHold(element: string | WebdriverIO.Element, pressDuration: number, timeout?: number): Promise<void> {
        const actualTimeout = timeout ?? 30000;

        try {
            if (typeof element === 'string') {
                element = await $(element);
            }
            await element.waitForDisplayed({ timeout: actualTimeout });

            await driver.touchAction([
                { action: 'press', element: element },
                { action: 'wait', ms: pressDuration },
                { action: 'release' }
            ]);
        } catch (err: any) {
            console.error(`Error performing press and hold on element (${element}): \n${err.stack}`)
            throw err;
        }
    }


    async swipe(element: string | WebdriverIO.Element, maxScrollAttempts: number = 5): Promise<void> {
        let elementFound: boolean = false;

        try {
            if (typeof element === 'string') {
                element = await $(element);
            }

            for (let attempt = 0; attempt < maxScrollAttempts; attempt++) {
                console.log(`Attempt ${attempt} of ${maxScrollAttempts}`);
                if (await element.isDisplayed()) {
                    elementFound = true;
                    break;
                }

                const startX = 500;
                const startY = 800;
                const endY = 200;

                await driver.touchAction([
                    { action: 'press', x: startX, y: startY },
                    { action: 'wait', ms: 500 },
                    { action: 'moveTo', x: startX, y: endY },
                    { action: 'release' }
                ]);
            }

            if (!elementFound) {
                console.warn(`Element not found after ${maxScrollAttempts} swipe attempts.`);
            }
        } catch (err: any) {
            console.error(`Error performing swipe: \n${err.stack}`);
            throw err;
        }
    }


    async pressAndHoldAtOffset(element: string | WebdriverIO.Element, offsetX: number, offsetY: number, pressDuration: number, timeout?: number): Promise<void> {
        const actualTimeout = timeout ?? 30000;

        try {
            if (typeof element === 'string') {
                element = await $(element);
            }
            await element.waitForDisplayed({ timeout: actualTimeout });

            const location = await element.getLocation();
            const xCoordinate = location.x;
            const yCoordinate = location.y;

            await driver.touchAction([
                { action: 'press', x: xCoordinate + offsetX, y: yCoordinate + offsetY },
                { action: 'wait', ms: pressDuration },
                { action: 'release' }
            ]);
        } catch (err) {
            console.error(`Error performing press and hold on element (${element}) with offset (${offsetX}, ${offsetY}): \n${err.stack}`)
            throw err;
        }
    }


    async swipeByPercentage(element: string | WebdriverIO.Element, startPercentage: number = 50, endPercentage: number = 20, maxScrollAttempts: number = 5): Promise<boolean> {
        let elementFound: boolean = false;

        try {
            if (typeof element === 'string') {
                element = await $(element);
            }

            for (let attempt = 0; attempt < maxScrollAttempts; attempt++) {
                if (await element.isDisplayed()) {
                    elementFound = true;
                    break;
                }

                const screenSize = await driver.getWindowRect();

                const startX = screenSize.width * (startPercentage / 100);
                const startY = screenSize.height * (80 / 100);
                const endY = screenSize.height * (endPercentage / 100);

                await driver.touchAction([
                    { action: 'press', x: startX, y: startY },
                    { action: 'wait', ms: 500 },
                    { action: 'moveTo', x: startX, y: endY },
                    { action: 'release' }
                ]);
            }

            if (!elementFound) {
                console.warn(`Element not found after ${maxScrollAttempts} swipe attempts.`);
            }

            return elementFound;
        } catch (err) {
            console.error(`Error during swipeByPercentage: ${err.stack}`);
            throw err;
        }
    }

}