const {LoginPage}=require('./LoginPage');
const {PaymentsPage}=require('./PaymentsPage');
const {MyCartPage}=require('./MyCartPage');
const {DashboardPage}=require('./DashboardPage');
const {OrderReviewPage}=require('./OrderReviewPage');
const {OrdersHistoryPage}=require('./OrdersHistoryPage');
const {OrderSummaryPage}=require('./OrderSummaryPage');

class POManager{
    constructor(page){
        this.page=page;
        this.loginPage=new LoginPage(page);
        this.paymentsPage=new PaymentsPage(page);
        this.myCartPage=new MyCartPage(page);
        this.dashboardPage=new DashboardPage(page);
        this.orderReviewPage=new OrderReviewPage(page);
        this.orderHistoryPage=new OrdersHistoryPage(page);
        this.orderSummaryPage=new OrderSummaryPage(page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getPaymentsPage(){
        return this.paymentsPage;
    }

    getMyCartPage(){
        return this.myCartPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getOrderReviewPage(){
        return this.orderReviewPage;
    }

    getOrderHistoryPage(){
        return this.orderHistoryPage;
    }

    getOrderSummaryPage(){
        return this.orderSummaryPage;
    }
    

}
module.exports={POManager};