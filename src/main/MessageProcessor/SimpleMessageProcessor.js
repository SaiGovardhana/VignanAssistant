const { ServiceManager } = require("../ServiceManager/ServiceManager.js");
const {ParseIntoFormat}=require('./TextProcessor');
class SimpleMessageProcessor
{

    constructor()
    {   
        this.serviceManager=new ServiceManager();
    }

    /**
     * Parses the Message and sends it to service manager
     * @param {Object.<string,string|any>} request
     */
    parseMessage(request)
    {  let message=request['text'];
        if(message==undefined)
            message=request['caption']
        
        if(message==undefined)
            return {'success':false}
        
        else{
            message=message.toLowerCase();
       /**
        * Parse the request['text'] to get array of string
        * ex: timetable 4 a mon => [timetable,4,a,mon]
        * also changes 1st to 1 2nd 2
        */
        let tokens=message.split(" ");
        let tempTokens=[]
        
        for(let i=0;i<tokens.length;i++)
        {
            
            if(tokens[i]!='')
                tempTokens.push(tokens[i]);
        }
        let request=ParseIntoFormat(tempTokens);

        return this.serviceManager.parseRequest(request);
    }
        
    }



}

exports.MessageProcessor=SimpleMessageProcessor;