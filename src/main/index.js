let {MessageProcessor}=require('./MessageProcessor/SimpleMessageProcessor');
let { TelegramBroker }=require('./CommunicationManager/Telegram/TelegramBroker')
process.env.resourceDir=process.cwd()+"/resources/";
process.env.NTBA_FIX_350=true;
let messageProcessor=new MessageProcessor();
let telegramBroker=new TelegramBroker(messageProcessor);