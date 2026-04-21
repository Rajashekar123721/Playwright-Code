class PaymentsPage {
    constructor(page) {
        this.page = page;
        this.countryInput = page.locator("[placeholder*='Country']");
        this.dropdown=page.locator(".ta-results");
        this.dropdownButton=this.dropdown.locator("button");
        this.placeOrderButton=page.locator(".action__submit");
    }

    async shippingDetails(countryCode,countryName) {
        //here pressSequentially is used to type letter by letter with delay of 150ms because the dropdown is dynamic and it will show options after typing some letters
            await this.countryInput.pressSequentially(countryCode,{delay:150});
            await this.dropdown.waitFor();
            const optionsCount=await this.dropdownButton.count();
            for(let i=0;i<optionsCount;i++){
                const text=await this.dropdownButton.nth(i).textContent();
                if(text.trim()===countryName){
                    await this.dropdownButton.nth(i).click();
                    break;
                }
            }
            await this.placeOrderButton.click();
        }
}
module.exports = { PaymentsPage };