import {expect,Page,test,Locator} from '@playwright/test';

export class OrderSummaryPage {

    page:Page;
    orderIdText:Locator;

    constructor(page:Page) {
        this.page = page;
        this.orderIdText = page.locator(".col-text");
    }

    async verifyOrderIdDetails(orderId:any){
     const orderIdDetails = await this.orderIdText.textContent();
    //checking order id
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    }
}
// module.exports={OrderSummaryPage};