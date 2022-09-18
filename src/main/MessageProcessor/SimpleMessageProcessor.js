const { ServiceManager } = require("../ServiceManager/ServiceManager.js");

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
       /**
        * Parse the request['text'] to get array of string
        * ex: timetable 4 a mon => [timetable,4,a,mon]
        * also changes 1st to 1 2nd 2
        */
        let tokens=message.split(" ");
        let tempTokens=[]
        
        for(let i=0;i<tokens.length;i++)
        {
            tokens[i]=this.mapper(tokens[i]);
            if(tokens[i]!='')
                tempTokens.push(tokens[i]);
        }

        return this.serviceManager.parseRequest(tempTokens);
    }
        
    }

    mapper(text)
    {   if(text.startsWith('1'))
            return '1'
        if(text.startsWith('2'))
            return '2';
        if(text.startsWith('3'))
            return "3";
        if(text.startsWith('4'))
            return '4';
        return text;
    }

}

exports.MessageProcessor=SimpleMessageProcessor;