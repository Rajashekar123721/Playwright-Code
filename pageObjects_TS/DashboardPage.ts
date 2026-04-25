import { expect,Locator,test,Page } from '@playwright/test';

export class DashboardPage {
    page:Page;
    products:Locator;
    productsText:Locator;
    cart:Locator;


    constructor(page: Page) {
        this.page=page;
        this.products = page.locator(".card-body");
        this.productsText=page.locator(".card-body b");
        this.cart=page.locator("[routerlink*='cart']");
    }

    async searchProductAddToCart(productsName:string){
    // Wait for products to load
    await this.products.first().waitFor();
    const count = await this.products.count();
    for(let i = 0; i < count; i++){
        let productText:any;
        productText = await this.products.nth(i).locator("b").textContent();
        if(productText.trim() === productsName){
            await this.products.nth(i).locator("text=Add To Cart").click();
            // ✅ CRITICAL FIX: wait for confirmation
            await expect(this.page.locator("#toast-container")).toBeVisible();
            await expect(this.page.locator("#toast-container")).toContainText("Added");
            // Alternative (more stable in CI)
            // await expect(this.page.locator(".cart-count")).toHaveText("1");
            break;
        }
    }
}

//or

//  async searchProductAddToCart(productsName){
//     const product = this.products.filter({
//         has: this.page.locator(`b:has-text("${productsName}")`)
//     });
//     await product.locator("text=Add To Cart").click();
//     // wait for confirmation
//     await expect(this.page.locator("#toast-container")).toBeVisible();
//     }


    async navigateToCart(){  
    // Optional but helps in CI
    await this.page.waitForLoadState('networkidle');
    await this.cart.click();
    // Ensure cart page is loaded
    await this.page.locator("h1:has-text('My Cart')").waitFor();
    }
}

// module.exports={DashboardPage};