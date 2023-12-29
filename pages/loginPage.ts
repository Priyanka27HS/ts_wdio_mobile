import { HomePage } from "./homePage";
import { LeftScreenMenuPage } from "./leftScreenMenuPage";


export class LoginPage {

    homePage : HomePage;
    leftScreenMenuPage: LeftScreenMenuPage;

    constructor() {
        this.homePage = new HomePage();
        this.leftScreenMenuPage = new LeftScreenMenuPage();
    }

    private selectors = {
        userNameInputField: '~Username input field',
        passwordInputField: '~Password input field',
        loginButton: '~Login button',
    }

    public async getUserNameInputFieldEle() {
        return await $(this.selectors.userNameInputField);
    }

    public async getPasswordInputFieldEle() {
        return await $(this.selectors.passwordInputField);
    }

    public async getLoginButtonEle() {
        return await $(this.selectors.loginButton);
    }

    public async login(username : string, password : string) {

        await (await this.homePage.getHamburgerIconEle()).click();
        const menuItemLoginEle = await this.leftScreenMenuPage.getLoginButtonFromSideMenu();
        await menuItemLoginEle.waitForDisplayed();
        await menuItemLoginEle.click();
        const userNameInputFieldEle = await $(this.selectors.userNameInputField);
        await userNameInputFieldEle.waitForDisplayed();
        await userNameInputFieldEle.setValue(username);
        const passwordInputFieldEle = await $(this.selectors.passwordInputField);
        await passwordInputFieldEle.waitForDisplayed();
        await passwordInputFieldEle.setValue(password);
        const loginButtonEle = await $(this.selectors.loginButton);
        await loginButtonEle.click();

    }

}

        // usernameInputField: "~Username input field",
        // passwordInputField: "~Password input field",
        // loginButton: "~Login button",
        // firstProductEle: '(//android.widget.TextView[@content-desc="store item text"])[1]',
        // errorMessage: '//android.view.ViewGroup[@content-desc="generic-error-message"]/android.widget.TextView',
