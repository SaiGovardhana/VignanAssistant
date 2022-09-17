

const fs=require('fs');
const axios = require('axios').default;
const TelegramBot = require('node-telegram-bot-api');
const {MessageProcessor}=require('../../MessageProcessor/SimpleMessageProcessor');
class TelegramBroker
{   
/**
 * 
 * @param {MessageProcessor} messageManager
 */
    constructor(messageManager)
    {   this.token=fs.readFileSync('./TelegramBot.txt').toString('utf-8');
        this.client=new TelegramBot(this.token,{polling:true});
        this.messageManager=messageManager;
        this.client.on('message',(message)=>{this.onMessage(message);});
        
        this.client.on('error',(error)=>{console.log(error);});

    }

    /**
     * 
     * @param {TelegramBot.Message} message 
     */
    async onMessage(message)
    {   
        try{
        let body=message.text;

        let attachment=message.document;
        
        let caption=message.caption;
        if(body==null)
            body=caption;
        if(body==null)
            return;
        console.log(body);
        let request={'text':body,'caption':caption,'attachment':attachment};
        
        if(attachment!=undefined)
            {   if(body.trim().toLowerCase().startsWith('admin'))
                   {    console.log('Getting File');
                        let fileInfo=await this.client.getFile(attachment.file_id);
                        console.log(fileInfo);
                        let data=await axios.get(`https://api.telegram.org/file/bot${this.token}/${fileInfo.file_path}`)
                        console.log(data,'here');
                        return;
                    }
                   else
                   {
                    this.client.sendMessage(message.chat.id,`*Normal Users can't send attachments*`,{parse_mode:'Markdown'});
                    return ;
                   }
            }
        let result=this.messageManager.parseMessage(request);
       


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
        catch(E)
        {
            console.log("Error")
            this.client.sendMessage(message.chat.id,"*Unable to process message, Use help*",{parse_mode:'Markdown'});
        }
    }


}

exports.TelegramBroker=TelegramBroker;