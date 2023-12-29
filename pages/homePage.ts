export class HomePage {

    private seletorts = {

        hamburgerIcon: "~open menu",
        productTextOnHomeScreen: "//android.widget.TextView[@text='Products']"

    }

    public async getHamburgerIconEle() {
        return await $(this.seletorts.hamburgerIcon);
    }

    public async getProductTextOnHomeScreenEle() {
        return await $(this.seletorts.productTextOnHomeScreen);
    }


}