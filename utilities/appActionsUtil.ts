import { $ } from "@wdio/globals"
export class AppActionsUtil {
    
    async appActions(): Promise<void> {
        await driver.terminateApp("com.saucelabs.mydemoapp.rn");
        await driver.activateApp("com.saucelabs.mydemoapp.rn");
    }
}