const base=require('playwright/test');

//creating a new test with name as base and using it in other test files
exports.customtest=base.test.extend(
{
    testDataForOrder :
    {
        url: "https://rahulshettyacademy.com/client/#/auth/login",
        email: "shekar@gmail.com",
        password: "Iamking@000",
        productsName: "ADIDAS ORIGINAL",
        text: "Thankyou for the order."
    }
});