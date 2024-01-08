import { LoginScreen } from "../screens/loginScreen";
import { LOGGER, LoggerHelper } from "../reporting/loggerHelper";
import { LoginDetails } from "../resources/customTypes/loginDetails";
import * as loginDetailsJson from "../resources/testdata/loginDetails.json"

let loginScreen : LoginScreen;
let loginDetails: LoginDetails;

const specName: string = 'Login test scenario';

describe("Login to the application", () => {

    before(async () => {
        loginScreen = new LoginScreen();
        LoggerHelper.setupLogger(specName);

        // Load login details from JSON file
        loginDetails = loginDetailsJson as LoginDetails;
    });

    it("Login to the app with valid credentials", async () => {
        try {
            LOGGER.info("*** Trying to login to the app ***");
            await loginScreen.login(loginDetails.username, loginDetails.password);
            LOGGER.info('Logged into the application');
        } catch (error) {
            LOGGER.error(`Error during test execution: ${(error as Error).message}`);
            throw error;
        }
    });
})
