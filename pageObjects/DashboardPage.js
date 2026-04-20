class DashboardPage {
    constructor(page) {
        this.products = page.locator(".card-body");
        this.productsText=page.locator(".card-body b");
        this.cart=page.locator("[routerlink*='cart']");
    }

    async searchProductAddToCart(productsName){
         
          
          const titles=await this.productsText.allTextContents();
          const count=titles.length;
          console.log(count);
          console.log(titles);
          const count1=await this.products.count();
    for(let i=0;i<count1;i++){
        if(await this.products.nth(i).locator("b").textContent()===productsName){    
            //locator based on text add to cart
            await this.products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    }

    async navigateToCart(){
        await this.cart.click();
    }
}
module.exports={DashboardPage};