const { MessageProcessor } = require("../main/MessageProcessor/SimpleMessageProcessor");
const { TimeTableService } = require("../main/Services/TimeTableService/TimeTableService");
process.env.resourceDir=process.cwd()+'/resources'
let a=new MessageProcessor()
let argv=process.argv;
let x=a.parseMessage(argv[2]+" "+argv[3]+" "+argv[4]+" "+argv[5])
console.log(x)