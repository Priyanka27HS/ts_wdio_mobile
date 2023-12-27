import { $ } from '@wdio/globals'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage {
    /**
     * define selectors using getter methods
     */
    get burgerIcon() {
        return $("~open menu");
    }

    get loginButtonFromSideMenu() {
        return $("~menu item log in");
    }

    get usernameInputField() {
        return $("~Username input field");
    }

    get passwordInputField() {
        return $('~Password input field');
    }

    get loginButton() {
        return $("~Login button")
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
  
    async login(username : string, password : string) {
        await this.burgerIcon.waitForDisplayed();
        (await this.burgerIcon).click();

        await this.loginButtonFromSideMenu.waitForDisplayed();
        await this.loginButtonFromSideMenu.click();

        await this.usernameInputField.waitForDisplayed();
        await this.usernameInputField.setValue(username);

        await this.passwordInputField.waitForDisplayed();
        await this.passwordInputField.click();
        await this.passwordInputField.setValue(password);
        await this.loginButton.click();
    }    
}

export default new LoginPage();
// module.exports = new LoginPage();