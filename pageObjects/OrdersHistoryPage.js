class OrdersHistoryPage{

    constructor(page){
        this.page=page;
        this.orderTable=page.locator("tbody");
        this.ordersHistoryTableRows=page.locator("tbody tr");

    }

    async verifyOrderHistory(orderId){
        //wait till order items load
        await this.orderTable.waitFor();
         //here we are getting all the rows of the table and then iterating through them to find the order id and then clicking on view button of that order id
        const rowCount=await this.ordersHistoryTableRows.count();
        for(let i=0;i<rowCount;i++){
            const rowOrderId=await this.ordersHistoryTableRows.nth(i).locator("th").textContent();
            if(orderId.includes(rowOrderId)){
                await this.ordersHistoryTableRows.nth(i).locator("button").first().click();
                break;
            }
        }
    }
}
module.exports = { OrdersHistoryPage };