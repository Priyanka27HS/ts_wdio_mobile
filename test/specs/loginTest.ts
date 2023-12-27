import LoginPage from "../pageobjects/loginPage";
describe("Login to the application", () => {
    it("should able to login with valid credentials", async () => {
        await LoginPage.login("bob@example.com", "10203040")
        await driver.pause(5000);
    });
})