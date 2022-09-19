


const { eng,removeStopwords } = require('stopword');
const fs=require('fs');
let indexOfA=eng.indexOf('a')
eng[indexOfA]='is';
function parseIntoFormat(tokens)
{   
    let cleaned=removeStopwords(tokens,eng);
    let services=['/help','/start','timetable'];
    let curService=null;
    for(let x of services)
        if(cleaned.includes(x))
            {curService=x;
             break;
            }
    if(curService == null)
        return [];

    if(curService=='/help')
         return tokens;

    if(curService=='/start')
        return tokens;

    if(curService == 'timetable')
        {   /**
            *   Parse Year 
            */
            let years=['1','2','3','4']
            let curYear=undefined;
            for(let x of cleaned)
                if(years.includes(x[0]))
                    curYear=x;
            
            if(curYear == undefined )
                return [curService];
            /**
             * Parse Section
             */
            if(!fs.readdirSync(`${process.env.resourceDir}timetable/`).includes(curYear.substring(0,1)))
                {
                        return [curService,curYear.substring(0,1)];
                }
            let sections=fs.readdirSync(`${process.env.resourceDir}timetable/`+curYear.substring(0,1));
            
            let curSection=undefined;
            if(curYear.length>1&&sections.includes(curYear.substring(1).toUpperCase()))
                curSection=curYear.substring(1).toLowerCase();
            else
                for(let x of cleaned)
                    if(sections.includes(x.toUpperCase()))
                        curSection=x;
            curYear=curYear.substring(0,1);
            if(curSection==undefined)
                return [curService,curYear];
            
            /**
             * Get the day
             */
            let days=['mon','tue','wed','thu','fri','sat','tod'];
            let curDay=undefined;
            for(let x of cleaned)
                if(days.includes(x.substring(0,3)))
                    curDay=x.substring(0,3);

            if(curDay==undefined)
                return [curService,curYear,curSection];
            else
                return [curService,curYear,curSection,curDay];
            
            

        }
    
}


exports.ParseIntoFormat=parseIntoFormat