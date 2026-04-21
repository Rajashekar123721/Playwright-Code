//2nd way for API Test

//this js code is for store session storage and inject into new browser context(Ex: we use login for one test and for other tests it wont ask login again since we send the token in local storage and it will be available for all tests)
//Login-UI -> .json(which includes all session storage/local storage values)
//pass that json to other tests



const {test, expect} = require('@playwright/test');
let webContext;

test.beforeAll(async ({browser})=>{
       const context=await browser.newContext();
       const page=await context.newPage();
       await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
       await page.locator("#userEmail").fill("shekar@gmail.com");
       await page.locator("#userPassword").fill("Iamking@000");
       await page.locator("#login").click();
       await page.waitForLoadState('networkidle');

      //get session storage and save it in a json file
         const storage=await context.storageState({path: 'storages.json'});
         webContext=await browser.newContext({storageState:'storages.json'}); //this will create a new browser context with the same session storage as the previous context

});       



test('Client App login', async () => {
   

    const page=await webContext.newPage();

    const productsName="ADIDAS ORIGINAL";
    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForLoadState('networkidle');
    const products=page.locator(".card-body");
  
   //wait till first product loads
   await products.first().waitFor();
   const titles=await page.locator(".card-body b").allTextContents();
   const count=titles.length;
   console.log(count);
   console.log(titles);
 
   const count1=await products.count();
    for(let i=0;i<count1;i++){
        if(await products.nth(i).locator("b").textContent()===productsName){    
            //locator based on text add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    //here waitFor is used because isVisible doesn't have auto wait
    await page.locator("div li").first().waitFor();
    //locator based on text and tag
    const bool=await page.locator(`h3:has-text("${productsName}")`).isVisible();
    expect(bool).toBeTruthy();


    const checkout=page.locator("text=Checkout");
    await checkout.click();
//here pressSequentially is used to type letter by letter with delay of 150ms because the dropdown is dynamic and it will show options after typing some letters
    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:150});
    const dropdown=page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount=await dropdown.locator("button").count();
    for(let i=0;i<optionsCount;i++){
        const text=await dropdown.locator("button").nth(i).textContent();
        if(text.trim()==="India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await page.locator(".action__submit").click();
    const orderConfirmation = await page.locator(".hero-primary").textContent();
    expect(orderConfirmation).toContain("Thankyou for the order.");

    const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    //wait till order items load
    await page.locator("tbody").waitFor();
//here we are getting all the rows of the table and then iterating through them to find the order id and then clicking on view button of that order id
    const rows=await page.locator("tbody tr");
    const rowCount=await rows.count();
    for(let i=0;i<rowCount;i++){
        const rowOrderId=await rows.nth(i).locator("th").textContent();
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    //checking order id
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    // await page.pause();


});




test('@API Test Case 2', async () => {
   
    const productsName="ADIDAS ORIGINAL";

    const page=await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForLoadState('networkidle');


    const products=page.locator(".card-body");
  
   //wait till first product loads
   await products.first().waitFor();
   const titles=await page.locator(".card-body b").allTextContents();
   const count=titles.length;
   console.log(count);
   console.log(titles);

});