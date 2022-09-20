const { getSyllabus } = require('../Services/SyllabusService/SyllabusService.js');
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
            return {'success':false,'message':'Couldnt find Service,\nTry using */help*'};
        request[0]=request[0].toLowerCase();

        /**
         * Request for help
         */
        if(request[0]=='/help'||request[0]=='/start')
        {
            if(request[1]=='timetable')
            {
                return  {"success":true,"message":"To Get Section Time:\n*timetable <year> <sec> <Day>*\nDay is not mandatory, \nIf used returns particular day\n(min three characters of day). "}    
            }

            if(request[1]=='syllabus')
            {
                return  {"success":true,"message":"To get a subjects Syllabus:\n*syllabus <SubjectCode>*\n\n OR \n\n*syllabus <SubjectName>*"}    
            }

            return  {"success":true,"message":"This is a chat assistant in its early stage, only supported services are \n*TimeTable*\n*Syllabus*"}

        }

        /**
         * If request belongs to timetable
         */
        if(request[0]=='timetable')
            {   
                return this.timeTableService.parse(request);
            }

        /**
         * If request belongs to syllabus
         */
        if(request[0]=='syllabus')
            return getSyllabus(request[1].toLowerCase());
            
            /**
             * Couldn't find a service
             */
            return {'success':false,'message':'Couldnt find Service,\nTry using */help*'};
    }

}

exports.ServiceManager=ServiceManager;