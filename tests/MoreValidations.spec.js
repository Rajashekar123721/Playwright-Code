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

//take screenshot of page and store it in some place.In future if we run again the test now it will compare the generated screenshot with stored ones is matching or not.
//for the first time it will fail because there is no stored screenshot but in next runs it will compare the generated screenshot with stored ones and if there is any change in the UI then it will fail the test and we can see the difference in the generated screenshot and stored ones.
test('Visual Testing',async({page})=>{
    await page.goto('https://auth.ultimatix.net/utxLogin/login?TYPE=33554432&REALMOID=06-000e128c-664b-1c1a-9ba7-abcac0a8f081&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=-SM-hH4s%2bx89e0zLyyJB26KwxN5y7fGJNanRUhav0qPo%2f9tiGbWXhsZrLgoPW%2fGInc1a&TARGET=-SM-https%3a%2f%2fwww%2eultimatix%2enet%2futxHomeApp%2fredirectToHome');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);
    expect(await page.screenshot()).toMatchSnapshot('ultimatix.png');
});