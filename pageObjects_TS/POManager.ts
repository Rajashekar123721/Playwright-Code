import {LoginPage} from '../pageObjects_TS/LoginPage';
import {PaymentsPage} from '../pageObjects_TS/PaymentsPage';
import {MyCartPage} from '../pageObjects_TS/MyCartPage';
import {DashboardPage} from '../pageObjects_TS/DashboardPage';
import {OrderReviewPage} from '../pageObjects_TS/OrderReviewPage';
import {OrdersHistoryPage} from '../pageObjects_TS/OrdersHistoryPage';
import {OrderSummaryPage} from '../pageObjects_TS/OrderSummaryPage';
import { Page } from '@playwright/test';

export class POManager{

    loginPage:LoginPage;
    paymentsPage:PaymentsPage
    myCartPage:MyCartPage;
    dashboardPage:DashboardPage;
    orderReviewPage:OrderReviewPage;
    orderHistoryPage:OrdersHistoryPage;
    orderSummaryPage:OrderSummaryPage;
    page:Page;


    constructor(page:any){
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
// module.exports={POManager};