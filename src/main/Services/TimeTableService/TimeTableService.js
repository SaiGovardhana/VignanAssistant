const fs=require('fs');
const date=require('date-and-time');
const utcToIndiantime =require('utc-to-indiantime');
class TimeTableService{
    constructor()
    {

    }
    getDayTimeTable(year,section,day)
    {   let resourceDir=process.env.resourceDir;
        section=section.toUpperCase();
        let path=`${resourceDir}/timetable/${year}/${section.toUpperCase()}/${day}.png`;
        //path=path.replace(/\\/g, '/')
            console.log(path);
        if(!fs.existsSync(path))
            return {'success':false,'message':'Couldnt find the timetable, please check query, or use */help timetable*'}

        return {'success':true,'path':path,'caption':`Timetable for *${year} -${section.toUpperCase()} \nOn ${day.toUpperCase()}* `};


    }
    /**
     * request[0]->timetable ; request[1]->year ; request[2]->section; request[3]->Day
     * @param {string[]} request 
     * @returns 
     */
    parse(request)
    {   if(request['year']!=undefined&&request['section']==undefined)
        {
            let yearDir=fs.readdirSync(`${process.env.resourceDir}timetable`);
            console.log('here',yearDir)
            if(!yearDir.includes(request['year']))
                return {'success':false,'message':'Couldnt Find the year'}
            let sections=fs.readdirSync(`${process.env.resourceDir}timetable/${request['year']}`);
            let msg='';
            for(let x of sections)
                msg+=`*${x}*\n`
            return {'success':true,'message':'The available section are\n'+msg};
        }
        if(request['year']!=undefined&&request['section']!=undefined&&request['day']==undefined)
        {
            return this.getSectionTimeTable(request['year'],request['section']);
        }
        if(request['year']!=undefined&&request['section']!=undefined&&request['day']!=undefined)
        {
            let day=request['day'].substring(0,3);
            let daysArray=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
            if(day=='tod')
                {
                    let d=new Date();
                            
                    day=daysArray[d.getDay()];
                    
                }
            if(day=='tom')
            {
                let d=new Date();
                            
                day=daysArray[(d.getDay()+1)%7];   
            }
            day=day.toLowerCase();
            day=day.substring(0,1).toUpperCase()+day.substring(1);

            return this.getDayTimeTable(request['year'],request['section'],day);
        }

        return {'success':false , 'message':"Invalid use of command try using  */help timetable*  "}

    }

    getSectionTimeTable(year,section)
    {
        let resourceDir=process.env.resourceDir;
        let path=`${resourceDir}/timetable/${year}/${section.toUpperCase()}/timetable.png`;
        section=section.toUpperCase();
        //path=path.replace(/\\/g, '/');
        if(!fs.existsSync(path))
            return {'success':false,'message':'Couldnt find the timetable, please check query,*/help timetable*'}
        
            return {'success':true,'path':path,'caption':`Timetable for *${year} -${section.toUpperCase()}*`};

    }

}

exports.TimeTableService=TimeTableService;