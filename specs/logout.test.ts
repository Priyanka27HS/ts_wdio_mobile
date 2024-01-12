import { LoginScreen } from "../screens/loginScreen";
import { LogoutScreen } from "../screens/logOutScreen";
import { LOGGER, LoggerHelper } from "../customLogger/loggerHelper";
import { LoginDetails } from "../resources/customTypes/loginDetails";
import * as loginDetailsJson from "../resources/testdata/loginDetails.json"

let loginScreen : LoginScreen;
let logoutScreen  : LogoutScreen;
let loginDetails: LoginDetails;

const specName: string = 'Logout test scenario';

before(() => {
    LoggerHelper.setupLogger(specName);
    loginScreen = new LoginScreen();
    logoutScreen = new LogoutScreen();
    loginDetails = loginDetailsJson as LoginDetails;
});


describe("Logout from the application", () => {

    it("Performing login and logout operations", async () => {
        try {
            LOGGER.info("*** Logging into the app ***");
            await loginScreen.login(loginDetails.username, loginDetails.password);
            await logoutScreen.logout();
            LOGGER.info('*** Logging out of the app ***');
        } catch (error) {
            LOGGER.error(`Error during test execution: ${(error as Error).message}`);
            throw error;
        }
    });
})