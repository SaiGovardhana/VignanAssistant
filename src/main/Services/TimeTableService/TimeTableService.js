const fs=require('fs');
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
            return {'success':false,'message':'Couldnt find the timetable, please check query, use *help timetable*'}

        return {'success':true,'path':path};


    }

    getSectionTimeTable(year,section)
    {
        let resourceDir=process.env.resourceDir;
        let path=`${resourceDir}/timetable/${year}/${section.toUpperCase()}/timetable.png`;
        section=section.toUpperCase();
        //path=path.replace(/\\/g, '/');
        if(!fs.existsSync(path))
            return {'success':false,'message':'Couldnt find the timetable, please check query,*help timetable*'}
        
            return {'success':true,'path':path};

    }

}

exports.TimeTableService=TimeTableService;