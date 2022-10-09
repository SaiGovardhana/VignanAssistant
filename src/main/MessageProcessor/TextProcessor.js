


const { eng,removeStopwords } = require('stopword');
const fs=require('fs');
let indexOfA=eng.indexOf('a')
eng[indexOfA]='is';

function parseIntoFormat(tokens)
{   
    let cleaned=removeStopwords(tokens,eng);
    let services=['/help','/start','timetable','syllabus'];
    let curService=null;
    for(let x of services)
        if(cleaned.includes(x))
            {curService=x;
             break;
            }
    if(curService == null)
        return {'service':undefined};

    if(curService=='/help')
         return {'service':'/help','arg':tokens[1]};

    if(curService=='/start')
        return {'service':'/start'};

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
                return {'service':'timetable'};
            /**
             * Parse Section
             */
            if(!fs.readdirSync(`${process.env.resourceDir}timetable/`).includes(curYear.substring(0,1)))
                {
                        return {'service':curService,'year':curYear.substring(0,1)};
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
                return {'service':curService,'year':curYear};
            
            /**
             * Get the day
             */
            let days=['mon','tue','wed','thu','fri','sat','tod','tom'];
            let curDay=undefined;
            for(let x of cleaned)
                if(days.includes(x.substring(0,3)))
                    curDay=x.substring(0,3);

            if(curDay==undefined)
                return {'service':curService,'year':curYear,'section':curSection};
            else
                return {'service':curService,'year':curYear,'section':curSection,'day':curDay};
            
            

        }

    if(curService=='syllabus')
        {   
            let query=''
            for(let x of cleaned)
                if(x.toLowerCase()!='syllabus')
                    query=query+" "+x.toLowerCase();
            query=query.trim();
            return {'service':'syllabus','arg':query};
        }

        return {'service':undefined}
    
}


exports.ParseIntoFormat=parseIntoFormat