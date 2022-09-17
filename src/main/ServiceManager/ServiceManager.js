const {TimeTableService} =require('../Services/TimeTableService/TimeTableService.js')
class ServiceManager
{
    constructor()
    {
        this.timeTableService=new TimeTableService()
    }
    /**
     * Parse the request according to service
     * @param {Array<string>}request  
     */
    parseRequest(request)
    {   
        /**
         * Request for help
         */
        if(request[0]=='help'||request[0]=='/start')
        {
            if(request[1]=='timetable')
            {
                return  {"success":true,"message":"To Get Section Time:\n*timetable <year> <sec> <Day>*\nDay is not mandatory, \nIf used returns particular day\n(min three characters of day). "}    
            }

            return  {"success":true,"message":"This is a chat assistant in its early stage, only supported service is *TimeTable*"}

        }

        /**
         * If request belongs to timetable
         */
        if(request[0]=='timetable')
            {
                if(request.length==3)
                    {
                        return this.timeTableService.getSectionTimeTable(request[1],request[2]);
                    }
                if(request.length==4)
                {
                    let day=request[3].substring(0,3);
                    day=day.toLowerCase();
                    day=day.substring(0,1).toUpperCase()+day.substring(1);

                    return this.timeTableService.getDayTimeTable(request[1],request[2],day);
                }

                return {'success':false , 'message':"Invalid use of command try using  *help timetable*  "}
            }

            
            /**
             * Couldn't find a service
             */
            return {'success':false,'message':'Couldnt find Service,\nTry using *help*'};
    }

}

exports.ServiceManager=ServiceManager;