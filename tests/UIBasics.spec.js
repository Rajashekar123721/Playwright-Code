
const {test, expect} = require('@playwright/test');
const console = require('node:console');

test('Browser Context playwright test', async ({ browser }) => {
   
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName=page.locator("input#username");
    const signIn=page.locator("input#signInBtn");
    const cardTitles=page.locator(".card-body a");
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
      //  console.log(await cardTitles.nth(1).textContent());
        const allTitles=await cardTitles.allTextContents();
        console.log(allTitles);

});



test('UI Controlls', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName=page.locator("input#username")
    const signIn=page.locator("input#signInBtn");
    const dropdown=page.locator("select.form-control");
    const documentLink=page.locator("a[href*='documents-request']");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    //2 types to check whether checkbox is checked or notw
    console.log(await page.locator(".radiotextsty").last().isChecked());       //return true or false
    await expect(await page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    //there are 2 types to check whether checkbox is unchecked or not
    await expect(page.locator("#terms")).not.toBeChecked();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();   //hence it returns false we used falsy
    
    await expect(documentLink).toHaveAttribute("class","blinkingText");
    
    
    //await page.pause();
    
});


// test.only('Child window handle', async ({ browser }) => {
test('Child window handle', async ({ browser }) => {


    //new Context is used to isolate the browser session
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink=page.locator("a[href*='documents-request']");

    //handle to child window
    //Promise.all is used to run 2 tasks simultaneously
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),

    ]);
    const text=await newPage.locator(".red").textContent();
    const domain=text.split("@")[1].split(" ")[0];
    //console.log(domain);

    //to shift back to parent window
    await page.bringToFront();
    const userName=page.locator("input#username");
    await userName.fill(domain);
    // await page.pause();
    console.log(await userName.inputValue()); //will return empty because we are passing the text at run time instead we need to use inputValue()
    //await page.pause();

//close the pages
    await newPage.close();
    await page.close();

});