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
    {   if(request.length==2)
        {
            let yearDir=fs.readdirSync(`${process.env.resourceDir}timetable`);
            console.log('here',yearDir)
            if(!yearDir.includes(request[1]))
                return {'success':false,'message':'Couldnt Find the year'}
            let sections=fs.readdirSync(`${process.env.resourceDir}timetable/${request[1]}`);
            let msg='';
            for(let x of sections)
                msg+=`*${x}*\n`
            return {'success':true,'message':'The available section are\n'+msg};
        }
        if(request.length==3)
        {
            return this.getSectionTimeTable(request[1],request[2]);
        }
        if(request.length==4)
        {
            let day=request[3].substring(0,3);
            if(day=='tod')
                {
                    let d=new Date();
                    console.log(d);
                    let x=d=utcToIndiantime(d);
                    
                    day=date.format(x,'ddd');

                    console.log(day);
                }
            day=day.toLowerCase();
            day=day.substring(0,1).toUpperCase()+day.substring(1);

            return this.getDayTimeTable(request[1],request[2],day);
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