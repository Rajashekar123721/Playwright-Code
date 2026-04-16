//add dependency exceljs in package.json

const ExcelJs=require("exceljs");
const {test, expect} = require('@playwright/test');

async function writeExcelData(searchText, replaceText,change,filePath)
{
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output=await readExcelData(worksheet,searchText);

    const cell=worksheet.getCell(output.row+change.rowChange,output.col+change.colChange);
    cell.value=replaceText;
    await workbook.xlsx.writeFile(filePath);
    console.log(`Changed value of ${searchText} price to ${replaceText} in row ${output.row+change.rowChange} and column ${output.col+change.colChange}`);
}

async function readExcelData(worksheet,searchText)
{
    let output={row:-1,col:-1};
    worksheet.eachRow((row,rowNumber)=>{
        row.eachCell((cell,colNumber)=>{
            if(cell.value===searchText){
                
                output = { row: rowNumber, col: colNumber };
                // output.row=rowNumber;
                // output.col=colNumber;
            }
        });
    });
    return output;
}

//update mango price to 350
test('Upload Download Excel Validation', async ({page})=>
    {
    const textSearch="Mango";
    const replacedText="350";
    const filePath = "C:\\Users\\graja\\Downloads\\download.xlsx";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const downloadPromise = page.waitForEvent('download');

    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
    writeExcelData(textSearch,replacedText,{rowChange:0,colChange:2},filePath);
    // await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);
    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has: textLocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(replacedText);
});