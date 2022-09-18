const { EventEmitter } = require("events");
const { BuildTimeTables } = require("../Services/TimeTableService/Utility/BuildTimeTable");

class AdminManager
{
    constructor()
    {
        

    }
    
    async parse(request,client)
    {   let myToken=request['text'].split(' ')[1];
        let tokens=request['text'].trim().toLowerCase().split(' ');
        if(tokens.length==1)
        {
            return {'success':true,'message':'*Use /admin token timetable year to update timetable\n*'};
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

        }

        return {'success':false,'message':'*Couldnt find any command or invalid use of command,use /admin*',};
    }

}

exports.AdminManager=AdminManager;