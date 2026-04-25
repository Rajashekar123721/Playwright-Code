import {test as baseTest} from '@playwright/test';
interface TestDataForOrder {    
    url: string;
    email: string;
    password: string;
    productsName: string;
    text: string;
}

//creating a new test with name as base and using it in other test files
export const customTest=baseTest.extend<{testDataForOrder:TestDataForOrder}>(
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