
const {test, expect} = require('@playwright/test');
const console = require('node:console');

test('Client App login', async ({ page }) => {
    const userName=page.locator("#userEmail");
    const password=page.locator("#userPassword");
    const productsName="ADIDAS ORIGINAL";
    const products=page.locator(".card-body");
   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   await userName.fill("shekar@gmail.com");
   await password.fill("Iamking@000");
   await page.locator("#login").click();
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