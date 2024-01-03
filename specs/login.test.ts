import { LoginScreen } from "../screens/loginScreen";

let loginScreen : LoginScreen;

describe("Login to the application", () => {

    before(async () => {
        loginScreen = new LoginScreen();
    });

    it("should able to login with valid credentials", async () => {
        await loginScreen.login("bob@example.com", "10203040");
    });
})
