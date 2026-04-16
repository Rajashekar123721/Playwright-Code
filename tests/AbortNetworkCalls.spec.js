
const {test, expect} = require('@playwright/test');
const console = require('node:console');

test('Browser Context playwright test', async ({ browser }) => {
   
    const context = await browser.newContext();
    const page = await context.newPage();

    //here we are aborting images from network tab which has png,jpg etc formats in order to reduce the load time of the page and make the test faster
    await page.route("**/*.{png,jpg,jpeg}", route => route.abort());

    const userName=page.locator("input#username");
    const signIn=page.locator("input#signInBtn");
    const cardTitles=page.locator(".card-body a");

    //print all requests,responses & response codes
    page.on("request", request => console.log(">>", request.method(), request.url()));
    page.on("response", response => console.log("<<", response.status(), response.url()));
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title())
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");
        await userName.fill("");
        await userName.fill("rahulshettyacademy");
        await signIn.click();
        console.log(await cardTitles.first().textContent());
        const allTitles=await cardTitles.allTextContents();
        console.log(allTitles);
      


});