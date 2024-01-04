import { ProductsScreen } from "./productScreen"
import { LeftScreenMenu } from "./leftScreenMenu"
import { BaseActions } from "../utilities/baseActions";


export class LoginScreen {

    productsScreen : ProductsScreen;
    leftScreenMenu: LeftScreenMenu;

    constructor() {
        this.productsScreen = new ProductsScreen();
        this.leftScreenMenu = new LeftScreenMenu();
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

        await (await this.productsScreen.getHamburgerIconEle()).click();
        const menuItemLoginEle = await this.leftScreenMenu.getLoginButtonFromSideMenu();
        await menuItemLoginEle.waitForDisplayed();
        await menuItemLoginEle.click();
        const userNameInputFieldEle = await $(this.selectors.userNameInputField);
        await userNameInputFieldEle.waitForDisplayed();
        await userNameInputFieldEle.setValue(username);
        
        const passwordInputFieldEle = await $(this.selectors.passwordInputField);
        await passwordInputFieldEle.click();
        
        BaseActions.swipeUpFromMiddle();

        await passwordInputFieldEle.waitForDisplayed();
        await passwordInputFieldEle.setValue(password);
        const loginButtonEle = await $(this.selectors.loginButton);
        await loginButtonEle.click();

    }
}