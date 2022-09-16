const { ServiceManager } = require("../ServiceManager/ServiceManager.js");

class SimpleMessageProcessor
{

    constructor()
    {   
        this.serviceManager=new ServiceManager();
    }

    /**
     * Parses the Message and sends it to service manager
     * @param {string} message 
     */
    parseMessage(message)
    {   message=message.toLowerCase();

        let tokens=message.split(" ");
        let request=[]
        console.log(tokens)
        for(let i=0;i<tokens.length;i++)
        {
            tokens[i]=this.mapper(tokens[i]);
            if(tokens[i]!='')
                request.push(tokens[i]);
        }

        return this.serviceManager.parseRequest(request);
        
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