const {test, expect,request} = require('@playwright/test');
const {APIUtils}= require('./utils/APIUtils');
//this loginPayload will come from network tab login response 
const loginPayload = {userEmail: "shekar@gmail.com", userPassword: "Iamking@000"};
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};

let response;

test.beforeAll(async () => 
    {

    console.log("Before all tests");

    //Login API and get token
    //here we are using newContext instead of newPage because we want to create a new context for API testing and we don't want to use the same context for UI testing because it will have cookies and other data which can interfere with our API testing
    const apiContext = await request.newContext();
    //we sent loginPayload since it is basic authentication and we need to send email and password to get the token
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
  

});



test('Place the order', async ({ page }) => {
    
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    

    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator("button[routerlink*='myorders']").click();
    //wait till order items load
    await page.locator("tbody").waitFor();
//here we are getting all the rows of the table and then iterating through them to find the order id and then clicking on view button of that order id
    const rows=await page.locator("tbody tr");

    const rowCount=await rows.count();
    for(let i=0;i<rowCount;i++){
        const rowOrderId=await rows.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause();
    //checking order id
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
   


});