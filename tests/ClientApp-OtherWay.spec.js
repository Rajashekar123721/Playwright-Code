
const {test, expect} = require('@playwright/test');
const console = require('node:console');

test('Client App login', async ({ page }) => {
    const userName=page.getByPlaceholder("email@example.com");
    const password=page.getByPlaceholder("enter your passsword");
    const productsName="ADIDAS ORIGINAL";
    const products=page.locator(".card-body");
   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   await userName.fill("shekar@gmail.com");
   await password.fill("Iamking@000");
   await page.getByRole("button", { name: "Login" }).click();
   //wait till first product loads
   await products.first().waitFor();
   const titles=await page.locator(".card-body b").allTextContents();
   const count=titles.length;
   console.log(count);
   console.log(titles);



    //instead of above for loop code we can also use filter method to find the product and then click on add to cart button(in this single line)
    await products.filter({hasText:productsName}).getByRole("button", { name: "Add To Cart" }).click();

    //here clicking on cart ,but before that cart is in listitems so we have to first go to list item and then click on cart button
     await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();


    //here waitFor is used because isVisible doesn't have auto wait
    await page.locator("div li").first().waitFor();
    //locator based on text and tag
    const bool=await page.locator(`h3:has-text("${productsName}")`).isVisible();
    await expect(page.getByText(productsName)).toBeVisible();


    
    await page.getByRole("button", { name: "Checkout" }).click();
//here pressSequentially is used to type letter by letter with delay of 150ms because the dropdown is dynamic and it will show options after typing some letters
    await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:150});
    await page.getByRole("button", { name: "India" }).nth(1).click();
    await page.getByText("Place Order").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();



    //change this as above locators
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