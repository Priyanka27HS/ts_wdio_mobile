import { LoginScreen } from "../screens/loginScreen";
import { LOGGER, LoggerHelper } from "../reporting/loggerHelper";

let loginScreen : LoginScreen;

const specName: string = 'Login test scenario';

describe("Login to the application", () => {

    before(async () => {
        loginScreen = new LoginScreen();
        LoggerHelper.setupLogger(specName);
    });

    it("Login to the app with valid credentials", async () => {
        try {
            LOGGER.info("*** Trying to login to the app ***");
            await loginScreen.login("bob@example.com", "10203040");
        } catch (error) {
            LOGGER.error(`Error during test execution: ${(error as Error).message}`);
            throw error;
        }
    });
})
