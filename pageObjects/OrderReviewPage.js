const {expect} = require('@playwright/test');
class OrderReviewPage{

    constructor(page){
        this.page=page;
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderIdText=page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrdersButton=page.locator("button[routerlink*='myorders']");
    }

    async orderReview(text){
        const orderConfirmation = await this.orderConfirmationText.textContent();
        expect(orderConfirmation).toContain(text);
        const orderId=await this.orderIdText.textContent();
        console.log(orderId);
        await this.myOrdersButton.click();
        return orderId;
    }
}
module.exports = { OrderReviewPage };