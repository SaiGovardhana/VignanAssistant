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
     * receive array of strings
     * request[0] =>command 
     */
    parseRequest(request)
    {   

        
        if(request.length == 0)
            return {'success':false,'message':'Couldnt find Service,\nTry using *help*'};
        request[0]=request[0].toLowerCase();

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
                return this.timeTableService.parse(request);
            }

            
            /**
             * Couldn't find a service
             */
            return {'success':false,'message':'Couldnt find Service,\nTry using *help*'};
    }

}

exports.ServiceManager=ServiceManager;