export class AppTerminationUtil {
    
    async terminateApp(): Promise<void> {
        await driver.terminateApp("com.saucelabs.mydemoapp.rn");
        await driver.activateApp("com.saucelabs.mydemoapp.rn");
    }
}