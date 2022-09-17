const { SectionModal } = require("../Models/SectionModal");

 function generateHeaders()
 {
    let arr=[` <html lang="en">
    <head>
  
        <title>Document</title>
        <style>
          html
          {   display:flex;
              width:wrap-content;
              height:wrap-content;
              
          }
          body
          {   display:flex;
              width:wrap-content;
              
              height: 1000px;
          }
            table
            {
                border-collapse: collapse;
            }
            tr,th
            {   text-align: center;
                
                border: black solid 3px;
            }
            td
            {   text-align: center;
                border: black solid 3px;
            }
        </style>
    </head>
    <body><table>`,
    ` </table>
    </body>
    </html>`
]
return arr;}
/**
 * 
 * @param {string} year 
 * @param {string} section 
 * @param {string} day 
 * @param {SectionModal} timeTable 
 * @returns 
 */
function generateDay(day,timeTable)
{   
    let header=`<tr><th colspan='3'>${timeTable.getYear()} - ${timeTable.getSection()} ${timeTable.getDefaultRoom()} (${day})  </th></tr><tr><th>Timings</th><th>Periods</th><th>Faculty</th></tr>`;
    let timings=timeTable.getTimings();
    let daysTimeTable=timeTable.getTimeTableForDay(day);
    let body='';
    for(let i=0;i<daysTimeTable.length;i++)
        {   let faculty=timeTable.getFaculty(daysTimeTable[i]);
            if(faculty==undefined)
                faculty='Not Assigned';
            body+=`<tr><td>${timings[i]}</td><td>${daysTimeTable[i]}</td><td>${faculty}</td></tr>`
        }
     let headerAndFooter=generateHeaders();
     
     return headerAndFooter[0]+header+body+headerAndFooter[1];


}
/**
 * 
 * @param {SectionModal} timeTable 
 */
function generateSection(timeTable)
{   let maxCols=timeTable.getTimings().length+1;
    let header=`<tr><th colspan='${maxCols}'>${timeTable.getYear()} - ${timeTable.getSection()} ${timeTable.getDefaultRoom()}  </th></tr>`;
    let timings='';
    for(let x of timeTable.getTimings())
        timings+=`<td>${x}</td>`;
    timings='<tr><td>Day</td>'+timings+'</tr>';
    let breakIndex=[]
    let i=0;
    for(let x of timeTable.getTimeTableForDay('Mon'))
    {
        if( (x!=undefined&& x!=null) && (x.toLowerCase().trim() == 'break' || x.toLowerCase().trim() == 'lunch' ))
            breakIndex.push(i);
        i+=1;
    }

    let body='';
    let days=['Mon','Tue','Wed','Thu','Fri','Sat'];
    for(i=0;i<6;i++)
        {
            let curDay=`<tr><th>${days[i]}</th>`;
            for(let j=0;j<maxCols-1;j++)
            {
                if(breakIndex.indexOf(j)==-1)
                {   let period=timeTable.getPeriod(days[i],j);
                    if(period==undefined)
                        period='Unallocated';
                    curDay+=`<td>${period}</td>`
                }
                else
                    if(i==0)
                        curDay+=`<th rowspan='6'>BREAK</th>`;
            }
            body+=curDay;
        }
        let leftSpan=maxCols%2==0?maxCols/2:(maxCols+1)/2;
        let rightSpan=maxCols-leftSpan;
        let faculty=""
        let count=0;
        for(let x in timeTable.faculty)
            faculty+=`<tr><td colspan='${maxCols}'>${x} : ${timeTable.getFaculty(x)}</tr>`
        let headerAndFooter=generateHeaders();
        return  headerAndFooter[0]+header+timings+body+faculty+headerAndFooter[1];

}
exports.generateDay=generateDay;
exports.generateSection=generateSection;