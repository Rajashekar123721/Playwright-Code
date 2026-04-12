const {test, expect} = require('@playwright/test');

test('Calender', async ({ page }) => {

    const month="6";
    const year="2027";
    const date="17";
    const expectedList=[month, date, year];

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.locator("//abbr[text()='" + date + "']").click();

    const inputs = await page.locator(".react-date-picker__inputGroup__input");
    for(let i=0;i<expectedList.length ;i++){
        const text=await inputs.nth(i).inputValue();
        expect(text).toEqual(expectedList[i]);


        //Calender test changes in shekar_fixes branch
    }

});