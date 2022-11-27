const { EventEmitter } = require("events");
const { SaveSyllabus, DeleteSyllabus } = require("../Services/SyllabusService/SyllabusService");
const { BuildTimeTables } = require("../Services/TimeTableService/Utility/BuildTimeTable");
const {AttendanceParser}=require('../Services/AttendanceService/AttendanceParser.js');
const { AttendanceSaver } = require("../Services/AttendanceService/AttendanceSaver");
;

class AdminManager
{
    constructor()
    {
        

    }
    
    async parse(request,client)
    {   let myToken=request['text'].split(' ')[1];
        
        let tokens=request['text'].trim().toLowerCase().split(' ');
        tokens=tokens.filter((x)=>x!='');
        
        if(tokens.length==1)
        {
            return {'success':true,'message':'*Update Timetable:*\n\n/admin <token> timetable <year>\n\n*Add syllabus:*\n\n/admin <token> syllabus <SubjectCode> <SubjectName>'};
        }
        if(myToken!=process.env.token)
        {   console.log(myToken,process.env.token)
            return {'success':false,'message':'Please provide valid token'};
        }
        else
        {   /** Updates time table
            *  Syntax:  /admin <token> timetable year
             */
            if(tokens[2]=='timetable')
            {
                if(tokens[3]!=undefined)
                {   
                    let eventEmitter=new EventEmitter();
                    if(request['data']==undefined)
                        return {'success':false,'message':'Please send attachment'};
                    let callBack=(message)=>{client.sendMessage(request['chat'].id,`*${message}*`,{parse_mode:'Markdown'});}
                    try{    
                            eventEmitter.on('status',callBack);
                            await BuildTimeTables(request['data'],tokens[3],eventEmitter);
                        
                      }
                      catch(E)
                      { console.log(E);
                        eventEmitter.removeAllListeners('status');
                        return {'success':false,'message':'Error While Parsing'};
                      }
                      eventEmitter.removeAllListeners('status');
                }
                return {'success':true,'message':'Done Parsing'};
            }
            /**
             * Syllabus saving 
             * use:
             * /admin <token> syllabus SubCode SubName
             * ex:
             * /admin  akslakslak syllabus 191CS301 Database And Managment
             */
            if(tokens[2]=='syllabus')
            {   if(tokens.length<=3)
                    return {'success':false,'message':'Invalid Use of command'}
                let subjectName=tokens.slice(4).reduce((x,y)=>x+" "+y);
                let subjectCode=tokens[3];

                console.log(subjectCode,subjectName);                
                return SaveSyllabus(subjectCode,subjectName,request['data'],request['fileName']);
            }
            if(tokens[2]=='syllabusdelete')
            {   if(tokens[3]==undefined)
                    return {'status':false,'message':'Specify Subject Code'};
                return DeleteSyllabus(tokens[3]);   
            }   

        }

        if(tokens[2] == 'attendance')
        {
            if(request['data']==undefined)
                return {'success':false,'message':'Please send attachment'};

            try
            {   //Convert into json
                let res=await AttendanceParser(request['data']);
                let result=AttendanceSaver(res);  
                return result;
            }
            catch(E)
            {   
                return {'success':false,'message':'Error While Parsing'};

            }

        }

        return {'success':false,'message':'*Couldnt find any command or invalid use of command,use /admin*',};
    }

}

exports.AdminManager=AdminManager;