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
        console.log(message)
        
        if(message.trim().startsWith('admin'))
        {
            let tokens=message.split(' ');
            

            return {'success':false};              
        }

        else{
       
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