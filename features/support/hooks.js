const { chromium } = require("playwright");
const { Before, After, BeforeStep,AfterStep,BeforeAll,AfterAll } = require("@cucumber/cucumber");
const { POManager } = require("../../pageObjects/POManager");

Before(async function () {
// Before will execute before each scenario and it will create a new browser instance and page instance for each scenario. It will also create a new instance of POManager class and pass the page instance to it. This way we can use the same page instance in all the step definitions and we can also use the same POManager instance in all the step definitions.

  // const browser=await playwright.chromium.launch({headless:false});
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  // "this." is a world constructor
  this.page = await context.newPage();
  this.poManager = new POManager(this.page);
});


BeforeAll(async function () {
//   console.log("I am executing before all the scenarios");
});



BeforeStep(async function () {
//   console.log("I am executing before each step");
});

AfterStep(async function ({ result }) {
    if(result.status === "FAILED"){
        await this.page.screenshot({path:"screenshot.png", fullPage:true});
    }
//   console.log("I am executing after each step");
});


After(async function () {
// After will execute after each scenario and it will close the browser instance after each scenario. This way we can ensure that each scenario is independent and does not affect the other scenarios. We can also take a screenshot of the failed scenario and save it in the screenshots folder.
    await this.page.context().browser().close();
    console.log("I am last step to execute for this particular scenario");
});


AfterAll(async function () {
//   console.log("I am executing after all the scenarios");
});