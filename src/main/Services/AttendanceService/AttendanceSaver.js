const fs=require('fs');
function AttendanceSaver(data)
{   if(!fs.existsSync(process.env.resourceDir+`attendance`))
        fs.mkdirSync(process.env.resourceDir+`attendance`);
    let curState={}
    let attendancePath=process.env.resourceDir+`attendance\\attendance.json`;
    if(fs.existsSync(attendancePath))
        {  
            let cur=fs.readFileSync(attendancePath,'utf8');
            curState=JSON.parse(cur)
        }
    for(let x in data)
    {
        curState[x]=data[x];
    }

    fs.writeFileSync(attendancePath,JSON.stringify(curState));

    return {'status':true,'message':'Uploaded given data'};
}

exports.AttendanceSaver=AttendanceSaver;