import { LoginPage } from "../pages/loginPage";
import { LogoutPage } from "../pages/logOutPage";

let loginPage : LoginPage;
let logoutPage : LogoutPage;


before(() => {
    loginPage = new LoginPage();
    logoutPage = new LogoutPage();

});


describe("Logout to the application", () => {
    it("should able to login and logout", async () => {
        await loginPage.login("bob@example.com", "10203040");
        await logoutPage.logout();
    });
})