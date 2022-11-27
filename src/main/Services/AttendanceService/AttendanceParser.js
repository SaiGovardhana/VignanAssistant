const Excel=require('exceljs');

/**
 * Function to parse Excel for Attendance
 * The sheet names should be attendance in lower case
 * It must contain three columns name,regd,attendance
 * @param {*} buffer
 * @returns 
 */
async function ParseAttendance(buffer)
{   try{
            // Read the Excel and get the worksheet, Name can be found at bottom right of excel 
            let workBook=new Excel.Workbook();
           
            await workBook.xlsx.load(buffer);
            
            //let workSheet=workBook.getWorksheet(workSheetName);
            
            let worksheet=workBook.getWorksheet('attendance');
            //Get the worksheet into json format
         
            let rows=worksheet.rowCount;
            let firstRow=worksheet.getRow(1);
            let nameIndex=-1;
            let attendanceIndex=-1;
            let rollIndex=-1;
            let curDay=new Date();
            let date=curDay.toLocaleDateString();
            let time=curDay.toLocaleTimeString();
            for(let i=1;i<=firstRow.cellCount;i++){
                let colVal=firstRow.getCell(i).value.toString().toLowerCase();
                if( colVal== 'regd' )
                    rollIndex=i;
                if (colVal =='attendance')
                    attendanceIndex=i;
                if(colVal == 'name')
                    nameIndex=i;


            }
            let res={}
            for(let i=2;i<=rows;i++)
            {
                let currentRow=worksheet.getRow(i);
                res[currentRow.getCell(rollIndex).value.toString().toLowerCase()]={regd:currentRow.getCell(rollIndex).value.toString().toLowerCase(),name:currentRow.getCell(nameIndex).value.toString().toUpperCase(),
                    attendance:currentRow.getCell(attendanceIndex).value.toString().toLowerCase(),'date':date,'time':time
                };
            }
            
            return res;
    
}
catch(E)
{
    console.error('Error While Parsing');
    
}
return undefined;
    
}  

exports.AttendanceParser=ParseAttendance;
