const fs=require('fs');
class InteractiveMessageProcessor
{

    constructor(serviceManager)
    {
       this.serviceManager=serviceManager;
    }
    /**
     * 
     * @param {string} message 
     */
    parse(message)
    {
        tokens=message.toLowerCase().trim().split(' ');
        if(tokens[0]=='syllabus')
            {
                if(tokes.length==2)
                {   

                }
            }
        

    }

}