const{test,expect}=require('@playwright/test');

test('Popup Validation',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('http://google.com');
    // await page.goBack();
    // await page.goForward();
    // await page.reload();

    await page.locator('#show-textbox').click();
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    // Handle Alert
    page.on('dialog', dialog => {
        console.log(dialog.message());
        dialog.accept();
    });
    await page.locator('#confirmbtn').click();

    // Handle Mouse Hover
    await page.locator('#mousehover').hover();

    //Handle iframe
    const frame = page.frameLocator('#courses-iframe');
    //here visible is important because there are multiple links with same href but only one is visible
    await frame.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck=await frame.locator(".text h2").textContent();
    console.log(textCheck.split(' ')[1]);



});