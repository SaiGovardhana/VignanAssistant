let {MessageProcessor}=require('./MessageProcessor/SimpleMessageProcessor');
let { TelegramBroker }=require('./CommunicationManager/Telegram/TelegramBroker');
const { AdminManager } = require('./AdminManager/AdminManager');
const express=require('express');
const fs=require('fs');
const { startWebApp } = require('./AdminPortal');
process.env.token=fs.readFileSync('./TelegramBot.txt').toString('utf-8');
process.env.resourceDir=process.cwd()+"/resources/";
let resourceDir=process.env.resourceDir;
process.env.NTBA_FIX_350=true;
process.env.serverStart=Math.floor(new Date().getTime() / 1000);
if(!fs.existsSync(resourceDir))
    fs.mkdirSync(resourceDir);
    
if(!fs.existsSync(`${resourceDir}syllabus`))
{
    fs.mkdirSync(`${resourceDir}syllabus`);
    fs.writeFileSync(`${resourceDir}syllabus/map.json`,JSON.stringify({}));
}

if(!fs.existsSync(`${resourceDir}timetable`))
    fs.mkdirSync(`${resourceDir}timetable`);
let messageProcessor=new MessageProcessor();
let adminManager=new AdminManager();
let telegramBroker=new TelegramBroker(messageProcessor,adminManager);
let app=startWebApp(telegramBroker);