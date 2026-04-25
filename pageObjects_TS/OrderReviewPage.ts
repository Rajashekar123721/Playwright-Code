import {expect,test,Locator,Page} from '@playwright/test';
export class OrderReviewPage{
    page:Page;
    orderConfirmationText:Locator;
    orderIdText:Locator;
    myOrdersButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderIdText=page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrdersButton=page.locator("button[routerlink*='myorders']");
    }

    async orderReview(text:string){
        const orderConfirmation = await this.orderConfirmationText.textContent();
        expect(orderConfirmation).toContain(text);
        const orderId=await this.orderIdText.textContent();
        console.log(orderId);
        await this.myOrdersButton.click();
        return orderId;
    }
}
// module.exports = { OrderReviewPage };