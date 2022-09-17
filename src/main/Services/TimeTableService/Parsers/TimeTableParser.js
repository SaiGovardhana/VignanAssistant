const Excel=require('exceljs');
const {TimeTableModel} =require('../Models/TimeTableModel.js');

/**Used to Parse time table returns timeTableModel
 * 
 * @param {*} path 
 * @param {*} workSheetName 
 * @returns {TimeTableModel}
 */
async function ParseTimeTable(buffer,year)
{   try{
            // Read the Excel and get the worksheet, Name can be found at bottom right of excel 
            let workBook=new Excel.Workbook();
           
            await workBook.xlsx.load(buffer);
            let timeTable=[]
            //let workSheet=workBook.getWorksheet(workSheetName);
            
            
            //Get the worksheet into json format
            for(let workSheet of workBook.worksheets){
            let rows=workSheet.rowCount;
            if(!workSheet.name.startsWith('I'))
                continue;
            for(let i=1;i<=rows;i++)
            {
                let currentRow=workSheet.getRow(i);
                let cols=currentRow.cellCount;
                let currentRowParsed=[]
                for(let j=1;j<=cols;j++)
                    currentRowParsed.push(currentRow.getCell(j).value);
                timeTable.push(currentRowParsed);
            }
        }
        //Convert into the Model
        let sections=new TimeTableModel(year);
        sections.parse(timeTable);
        return  sections;

}
catch(E)
{
    console.error('Error While Parsing');
    
}
return undefined;
    
}
exports.ParseTimeTable=ParseTimeTable;

