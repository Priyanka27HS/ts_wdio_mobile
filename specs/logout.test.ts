import { LoginScreen } from "../screens/loginScreen";
import { LogoutScreen } from "../screens/logOutScreen";
import { LOGGER, LoggerHelper } from "../reporting/loggerHelper";


let loginScreen : LoginScreen;
let logoutScreen  : LogoutScreen;

const specName: string = 'Logout test scenario';

before(() => {
    LoggerHelper.setupLogger(specName);
    loginScreen = new LoginScreen();
    logoutScreen = new LogoutScreen();
});


describe("Logout from the application", () => {

    it("Performing login and logout operations", async () => {
        try {
            LOGGER.info("*** Logging into the app ***");
            await loginScreen.login("bob@example.com", "10203040");
            await logoutScreen.logout();
            LOGGER.info('*** Logging out of the app ***');
        } catch (error) {
            LOGGER.error(`Error during test execution: ${(error as Error).message}`);
            throw error;
        }
    });
})