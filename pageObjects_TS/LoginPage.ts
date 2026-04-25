
import {test,expect,Locator,Page } from  '@playwright/test';

export class LoginPage {

    page:Page;
    usernameInput:Locator;
    passwordInput:Locator;
    loginButton:Locator;
    
    constructor(page:Page){
        this.page = page;
        this.usernameInput = page.locator("#userEmail");
        this.passwordInput = page.locator("#userPassword");
        this.loginButton =page.locator("#login");
    }

    async goTo(url:any) {
        // await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
        await this.page.goto(url);
    }

    async validLogin(username:string, password:string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        //code for networkidle
        await this.page.waitForLoadState('networkidle');
    }

}

// module.exports = {LoginPage};