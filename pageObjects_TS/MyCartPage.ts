import {test,expect,Locator,Page } from  '@playwright/test';

export class MyCartPage {

    page:Page;
    checkout:Locator;
    checkoutPageComponentsLoad:Locator;


    constructor(page:Page){
        this.page=page;
        this.checkout=page.locator("text=Checkout");
        this.checkoutPageComponentsLoad=page.locator("div li");
    }
    async verifyProductAndCheckout(productsName:string){
         //here waitFor is used because isVisible doesn't have auto wait
        await this.checkoutPageComponentsLoad.first().waitFor();
        
        //locator based on text and tag
        const bool=await this.page.locator(`h3:has-text("${productsName}")`).isVisible();
        expect(bool).toBeTruthy();
        await this.checkout.click();
    }
}

// module.exports = {MyCartPage};