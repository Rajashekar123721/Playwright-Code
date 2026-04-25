
import {test, expect} from '@playwright/test';
import {customTest} from '../utils_TS/test-base';
import {POManager} from '../pageObjects_TS/POManager';
declare const require: any;
//json->string->js object(inorder to avoid encoding issues)
const testData=JSON.parse(JSON.stringify(require('../utils_TS/ClientAppPOTestData.json')));

for (const data of testData) {
test(`Client App login ${data.productsName}`, async ({ page }) => {
    
    const poManager=new POManager(page);
    const url=data.url;
    const email=data.email;
    const password=data.password;
    const productsName=data.productsName;
    const text=data.text;
    
    const login=poManager.getLoginPage();
    await login.goTo(url);
    await login.validLogin(email, password);
  
    const dashboardPage=poManager.getDashboardPage();
    await dashboardPage.searchProductAddToCart(productsName);
    await dashboardPage.navigateToCart();
    
    const myCartPage=poManager.getMyCartPage();
    await myCartPage.verifyProductAndCheckout(productsName);
   
    const paymentsPage=poManager.getPaymentsPage();
    await paymentsPage.shippingDetails("ind","India");

   const orderReviewPage=poManager.getOrderReviewPage();
   const orderId = await orderReviewPage.orderReview(text);
   
    const orderHistoryPage=poManager.getOrderHistoryPage();
    await orderHistoryPage.verifyOrderHistory(orderId);

   const orderSummaryPage=poManager.getOrderSummaryPage();
   await orderSummaryPage.verifyOrderIdDetails(orderId);


});
}



customTest("Client App login", async ({ page, testDataForOrder }) => {
    
    const poManager=new POManager(page);
    const url=testDataForOrder.url;
    const email=testDataForOrder.email;
    const password=testDataForOrder.password;
    const productsName=testDataForOrder.productsName;
    const text=testDataForOrder.text;
    
    const login=poManager.getLoginPage();
    await login.goTo(url);
    await login.validLogin(email, password);
  
    const dashboardPage=poManager.getDashboardPage();
    await dashboardPage.searchProductAddToCart(productsName);
    await dashboardPage.navigateToCart();
    
    const myCartPage=poManager.getMyCartPage();
    await myCartPage.verifyProductAndCheckout(productsName);
   
    const paymentsPage=poManager.getPaymentsPage();
    await paymentsPage.shippingDetails("ind","India");

   const orderReviewPage=poManager.getOrderReviewPage();
   const orderId = await orderReviewPage.orderReview(text);
   
    const orderHistoryPage=poManager.getOrderHistoryPage();
    await orderHistoryPage.verifyOrderHistory(orderId);

   const orderSummaryPage=poManager.getOrderSummaryPage();
   await orderSummaryPage.verifyOrderIdDetails(orderId);


});