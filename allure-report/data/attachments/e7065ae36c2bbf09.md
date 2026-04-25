# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppPO.spec.js >> Client App login ADIDAS ORIGINAL
- Location: tests\ClientAppPO.spec.js:9:1

# Error details

```
Test timeout of 50000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 50000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e11] [cursor=pointer]:
      - /url: https://techsmarthire.com/
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart 1" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
          - generic [ref=e22]: "1"
      - listitem [ref=e23] [cursor=pointer]:
        - button "Sign Out" [ref=e24]:
          - generic [ref=e25]: 
          - text: Sign Out
  - generic [ref=e26]:
    - generic [ref=e27]:
      - heading "My Cart" [level=1] [ref=e28]
      - button "Continue Shopping❯" [ref=e29] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e31]
```

# Test source

```ts
  1  | const { expect } = require('@playwright/test');
  2  | 
  3  | class MyCartPage {
  4  |     constructor(page){
  5  |         this.page=page;
  6  |         this.checkout=page.locator("text=Checkout");
  7  |         this.checkoutPageComponentsLoad=page.locator("div li");
  8  |     }
  9  |     async verifyProductAndCheckout(productsName){
  10 |          //here waitFor is used because isVisible doesn't have auto wait
> 11 |         await this.checkoutPageComponentsLoad.first().waitFor();
     |                                                       ^ Error: locator.waitFor: Test timeout of 50000ms exceeded.
  12 |         
  13 |         //locator based on text and tag
  14 |         const bool=await this.page.locator(`h3:has-text("${productsName}")`).isVisible();
  15 |         expect(bool).toBeTruthy();
  16 |         await this.checkout.click();
  17 |     }
  18 | }
  19 | module.exports = { MyCartPage };
```