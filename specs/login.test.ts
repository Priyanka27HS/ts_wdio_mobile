import { LoginPage } from "../pages/loginPage";

let loginPage : LoginPage;

describe("Login to the application", () => {

    before(async () => {
        loginPage = new LoginPage();
    });

    it("should able to login with valid credentials", async () => {
        await loginPage.login("bob@example.com", "10203040");
    });
})
