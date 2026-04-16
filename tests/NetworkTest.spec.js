const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./utils/APIUtils");
//this loginPayload will come from network tab login response
const loginPayload = {
  userEmail: "shekar@gmail.com",
  userPassword: "Iamking@000",
};
const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }],
};
const fakePayloadOrders = { data: [], message: "No Orders" };
let response;

test.beforeAll(async () => {
  console.log("Before all tests");

  //Login API and get token
  //here we are using newContext instead of newPage because we want to create a new context for API testing and we don't want to use the same context for UI testing because it will have cookies and other data which can interfere with our API testing
  const apiContext = await request.newContext();
  //we sent loginPayload since it is basic authentication and we need to send email and password to get the token
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test("Verify order is displayed in order history", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      //request added to convert browser mode to API call mode
      const response = await page.request.fetch(route.request());
      //here converting the javascript response to json format
      let body = JSON.stringify(fakePayloadOrders);

      route.fulfill({
        response,
        body,
      });

      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    },
  );

  await page.locator("button[routerlink*='myorders']").click();

  //print message
  console.log(await page.locator(".mt-4").textContent());
});
