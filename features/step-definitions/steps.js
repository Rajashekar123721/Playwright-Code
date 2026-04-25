const { When, Then, Given } = require("@cucumber/cucumber");
const { POManager } = require("../../pageObjects/POManager");
const { expect } = require("@playwright/test");

Given(
  "Login to the application with {string} and {string}",
  { timeout: 100000 },
  async function (email, password) {
    const products = this.page.locator(".card-body");
    const login = this.poManager.getLoginPage();
    await login.goTo("https://rahulshettyacademy.com/client/#/auth/login");
    await login.validLogin(email, password);
  },
);

When("Add {string} to the cart and checkout", async function (productsName) {
  // Write code here that turns the phrase above into concrete actions
  this.dashboardPage = this.poManager.getDashboardPage();
  await this.dashboardPage.searchProductAddToCart(productsName);
  await this.dashboardPage.navigateToCart();
});

Then("Verify {string} is displayed in the cart", async function (productsName) {
  // Write code here that turns the phrase above into concrete actions
  const myCartPage = this.poManager.getMyCartPage();
  await myCartPage.verifyProductAndCheckout(productsName);
});

When("Enter valid details and Place the order", async function () {
  // Write code here that turns the phrase above into concrete actions
  const paymentsPage = this.poManager.getPaymentsPage();
  await paymentsPage.shippingDetails("ind", "India");
  const orderReviewPage = this.poManager.getOrderReviewPage();
  this.orderId = await orderReviewPage.orderReview("Thankyou for the order.");
});

Then("Verify the order is present in the order history.", async function () {
  // Write code here that turns the phrase above into concrete actions
  const orderHistoryPage = this.poManager.getOrderHistoryPage();
  await orderHistoryPage.verifyOrderHistory(this.orderId);
  const orderSummaryPage = this.poManager.getOrderSummaryPage();
  await orderSummaryPage.verifyOrderIdDetails(this.orderId);
});

//=====================================================================

// await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
//     console.log(await page.title())
//     await userName.fill("rahulshetty");
//     await page.locator("[type='password']").fill("Learning@830$3mK2");
//     await signIn.click();
//     console.log(await page.locator("[style*='block']").textContent());
//     await expect(page.locator("[style*='block']")).toContainText("Incorrect");

Given(
  "Login to the Ecommerce2 application with {string} and {string}",
  async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const userName = this.page.locator("input#username");
    const signIn = this.page.locator("input#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await userName.fill(username);
    await this.page.locator("[type='password']").fill(password);
    await signIn.click();
  },
);

Then("Verify the error message {string} is displayed", async function (string) {
  // Write code here that turns the phrase above into concrete actions
  console.log(await this.page.locator("[style*='block']").textContent());
  await expect(this.page.locator("[style*='block']")).toContainText(
    "Incorrect",
  );
});



//======================================================================

Given("I print hello", function () {
  // Write code here that turns the phrase above into concrete actions
  console.log("Hello working fine");
});