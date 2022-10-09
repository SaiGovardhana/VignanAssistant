const { getSyllabus } = require('../Services/SyllabusService/SyllabusService.js');
const {TimeTableService} =require('../Services/TimeTableService/TimeTableService.js')
class ServiceManager
{
    constructor()
    {   console.log('Modifying branch')
        this.timeTableService=new TimeTableService()
    }
    /**
     * Parse the request according to service
     * receive array of strings
     * request[0] =>command 
     */
    parseRequest(request)
    {   

        
        if(request['service'] == undefined)
            return {'success':false,'message':'Couldnt find Service,\nTry using */help*'};
       

        /**
         * Request for help
         */
        if(request['service']=='/help'||request['service']=='/start')
        {
            if(request['service']=='timetable')
            {
                return  {"success":true,"message":"To Get Section Time:\n*timetable <year> <sec> <Day>*\nDay is not mandatory, \nIf used returns particular day\n(min three characters of day). "}    
            }

            if(request['service']=='syllabus')
            {
                return  {"success":true,"message":"To get a subjects Syllabus:\n*syllabus <SubjectCode>*\n\n OR \n\n*syllabus <SubjectName>*"}    
            }

            return  {"success":true,"message":"This is a chat assistant in its early stage, only supported services are \n*TimeTable*\n*Syllabus*"}

        }

        /**
         * If request belongs to timetable
         */
        if(request['service']=='timetable')
            {   
                return this.timeTableService.parse(request);
            }

        /**
         * If request belongs to syllabus
         */
        if(request['service']=='syllabus')
            return getSyllabus(request['arg'].toLowerCase());
            
            /**
             * Couldn't find a service
             */
            return {'success':false,'message':'Couldnt find Service,\nTry using */help*'};
    }

}

exports.ServiceManager=ServiceManager;