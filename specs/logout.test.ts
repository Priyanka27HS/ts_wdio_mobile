import { LoginScreen } from "../screens/loginScreen";
import { LogoutScreen } from "../screens/logOutScreen";

let loginScreen : LoginScreen;
let logoutScreen  : LogoutScreen;


before(() => {
    loginScreen = new LoginScreen();
    logoutScreen = new LogoutScreen();
});


describe("Logout to the application", () => {
    it("should able to login and logout", async () => {
        await loginScreen.login("bob@example.com", "10203040");
        await logoutScreen.logout();
    });
})