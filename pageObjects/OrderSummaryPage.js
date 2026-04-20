const {expect}=require('@playwright/test');
class OrderSummaryPage {
    constructor(page) {
        this.page = page;
        this.orderIdText = page.locator(".col-text");
    }

    async verifyOrderIdDetails(orderId){
     const orderIdDetails = await this.orderIdText.textContent();
    //checking order id
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    }
}
module.exports={OrderSummaryPage};