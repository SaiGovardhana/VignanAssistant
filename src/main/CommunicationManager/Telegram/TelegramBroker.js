

const fs=require('fs');
const axios = require('axios').default;
const TelegramBot = require('node-telegram-bot-api');
const { AdminManager } = require('../../AdminManager/AdminManager');
const {MessageProcessor}=require('../../MessageProcessor/SimpleMessageProcessor');
const { BuildTimeTables } = require('../../Services/TimeTableService/Utility/BuildTimeTable');
class TelegramBroker
{   
/**
 * @param {AdminManager} adminManager
 * @param {MessageProcessor} messageManager
 */
    constructor(messageManager,adminManager)
    {   this.token=fs.readFileSync('./TelegramBot.txt').toString('utf-8');
        this.client=new TelegramBot(this.token,{polling:true});
        this.messageManager=messageManager;
        this.adminManager=adminManager;
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
        
        
        if(process.env.serverStart>message.date)
            {
                this.client.sendMessage(message.chat.id,'*Sorry the Server was down, Please try now.*',{parse_mode:'Markdown'})
                return ;
            }
        let attachment=message.document;
        
        let caption=message.caption;
        /**
         * Set body to caption if no body
         */
        if(body==null)
            body=caption;
        /**
         * If not body send message
         */
        if(body==null)
        {   
            this.client.sendMessage(message.chat.id,`*Doesn't have caption or message*`,{parse_mode:'Markdown'});
            return;
        }
        console.log(body);
        let request={'text':body,'caption':caption,'attachment':attachment};

        /**
         * Get the attachment and save it in data
         */
        if(attachment!=undefined)
            {   if(body.trim().toLowerCase().startsWith('/admin'))
                   {    console.log('Getting File');
                        let fileInfo=await this.client.getFile(attachment.file_id);
                        
                        let data=await axios.get(`https://api.telegram.org/file/bot${this.token}/${fileInfo.file_path}`,{responseType:'arraybuffer'})
                        request['data']=data.data;
                        
                        request['fileName']=message.document.file_name;
                       
            
                    }
                   else
                   {
                    this.client.sendMessage(message.chat.id,`*Normal Users can't send attachments*`,{parse_mode:'Markdown'});
                    
                   }
            }
        

        request['chat']=message.chat;
        
        /**
         * Parse the message For admin
         * The format of request is
         * { text:text ,caption:text,chat:'chat_details',data:'attachment data' }
         */
        if(body.trim().toLowerCase().startsWith('/admin'))
        {   
            
            /**
             * Process the admin request
             * 
             */
            let result=await this.adminManager.parse(request,this.client);
            /**
             * result has format
             * {'message':text,'success':boolean}
             */
            this.client.sendMessage(message.chat.id,result['message'],{parse_mode:'Markdown'});
            
            return ;

        }

        


        /**
         * Parse the message For a user
         * The format of request is
         * { body:text ,caption:text,chat:'chat_details' }
         */
        let result=this.messageManager.parseMessage(request);
        
        /**
         * result has format
         * path represents a resource that must be sent to client.
         * {text:'text',path:'text',success:boolean}
         *
         */


        if(!result.success)
            this.client.sendMessage(message.chat.id,result.message,{parse_mode:'Markdown'});
        if(result.success)
            if(result.path!==undefined)
            {   console.log(result.path)
                if(result.path.endsWith('.pdf'))
                    this.client.sendDocument(message.chat.id,result.path,{caption:result.caption,parse_mode:'Markdown'},{filename:result.path,contentType:'application/pdf',});
                else
                    this.client.sendPhoto(message.chat.id,result.path,{caption:result.caption,parse_mode:'Markdown'},{filename:result.path,contentType:'image/png',});
            }
            else
                if(result.message!=undefined)
                    this.client.sendMessage(message.chat.id,result.message,{parse_mode:'Markdown'});

            

        }
        catch(E)
        {
            console.log("Error",E)
            this.client.sendMessage(message.chat.id,"*Unable to process message, Use /help*",{parse_mode:'Markdown'});
        }
    }


}

exports.TelegramBroker=TelegramBroker;