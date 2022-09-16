const { MessageProcessor } = require("../MessageProcessor/SimpleMessageProcessor.js");
const { TelegramBroker } = require("./Telegram/TelegramBroker.js");


class CommunicationManager
{

    constructor()
    
    {   process.env.resourceDir=process.cwd()+"/resources/";
        process.env.NTBA_FIX_350=true;
        this.messageProcessor=new MessageProcessor();
        this.telegramBroker=new TelegramBroker(this);
        

    }

    parse(message)
    {
      return   this.messageProcessor.parseMessage(message);
    }
}

let cm=new CommunicationManager();
exports.CommunicationManager=CommunicationManager;