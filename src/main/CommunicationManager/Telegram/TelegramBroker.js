

const fs=require('fs');
const TelegramBot = require('node-telegram-bot-api');
const {CommunicationManager}=require('../CommunicationManager.js')
class TelegramBroker
{   
/**
 * 
 * @param {CommunicationManager} communicationManager 
 */
    constructor(communicationManager)
    {   let token=fs.readFileSync('./TelegramBot.txt').toString('utf-8');
        this.client=new TelegramBot(token,{polling:true});
        this.communicationManager=communicationManager;
        this.client.on('message',(message)=>{this.onMessage(message);});

    }

    /**
     * 
     * @param {TelegramBot.Message} message 
     */
    onMessage(message)
    {   

        let body=message.text;
        let result=this.communicationManager.parse(body);
        
        console.log(result);
        if(!result.success)
            this.client.sendMessage(message.chat.id,result.message,{parse_mode:'Markdown'});
        if(result.success)
            if(result.message!=undefined)
                this.client.sendMessage(message.chat.id,result.message,{parse_mode:'Markdown'});
            else
            if(result.path!==undefined)
            {   
                this.client.sendPhoto(message.chat.id,result.path,{},{filename:result.path,contentType:'image/png',});
            }
            
    }


}

exports.TelegramBroker=TelegramBroker;