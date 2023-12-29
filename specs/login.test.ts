import { LoginPage } from "../pages/loginPage";

let loginPage : LoginPage;


before(() => {
    loginPage = new LoginPage();

});


describe("Login to the application", () => {
    it("should able to login with valid credentials", async () => {
        await loginPage.login("bob@example.com", "10203040");
    });
})



// import { LoginPage } from "../pages/loginPage";
// import { LeftScreenMenuPage } from "../pages/leftScreenMenuPage";

// let loginPage: LoginPage;
// let leftScreenMenuPage: LeftScreenMenuPage;

// before(() => {
//     loginPage = new LoginPage();
//     leftScreenMenuPage = new LeftScreenMenuPage();
// });

// describe("Login to the application", () => {
//     const testUser = {
//         username: "bob@example.com",
//         password: "10203040",
//     };

//     it("Should be able to login with valid credentials", async () => {

//         await leftScreenMenuPage.navigateToLoginPage();

//         await loginPage.login(testUser.username, testUser.password);



//         // const firstProductEle = await loginPage.getFirstProductEle();
//         // await firstProductEle.waitForDisplayed();

//         // const firstProductText = await firstProductEle.getText();
//         // console.log('First product text:', firstProductText);

//         // expect(firstProductText).toBe('Sauce Labs Backpack');
//     });

//     it("Should not login with invalid credentials", async () => {
//         const invalidUser = {
//             username: "wrongUser",
//             password: "wrongPassword",
//         };

//         await loginPage.login(invalidUser.username, invalidUser.password);
//         const errorMessageElement = await loginPage.getErrorMessageText();
//         await errorMessageElement.waitForDisplayed();

//         const errorMessage = await errorMessageElement.getText();

//         console.log('Error message:', errorMessage);
//         expect(errorMessage).toBe("Provided credentials do not match any user in this service.");
//     });
// });
