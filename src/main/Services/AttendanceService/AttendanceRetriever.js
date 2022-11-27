const fs=require('fs');
function getAttendance(query)
{   
    let attendancePath=process.env.resourceDir+`attendance\\attendance.json`;
    if(fs.existsSync(attendancePath))
    {
        let res=JSON.parse(fs.readFileSync(attendancePath,'utf8'));
        if(query.toLowerCase() in res )
        {   
            let student=res[query.toLowerCase()];
            let msg=`Attendace for\n*${student['regd'].toUpperCase()}*\n*${student['name'].toUpperCase()}* is\n*${student['attendance']}%*\nUploaded on\n${student['date']} at\n${student['time']}`
            return {'success':true,'message':msg};
        }
        else
        {
            let matching=[]
            for(let x in res)
            {   
                if(res[x]['name'].toLowerCase().indexOf(query.toLowerCase())!=-1)
                    matching.push(res[x]);
                
            }
            if(matching.length >= 1)
            {
                if(matching.length == 1)
                {
                let student=matching[0];
                let msg=`Attendace for\n*${student['regd'].toUpperCase()}*\n*${student['name'].toUpperCase()}* is\n*${student['attendance']}%*\nUploaded on\n${student['date']} at\n${student['time']}`
                return {'success':true,'message':msg};
                }
                else
                {   let msg='MATCHING STUDENTS ARE:\n';
                    for(let t of matching)
                    {
                        msg+=`*${t['regd'].toUpperCase()}:\n${t['name'].toUpperCase()}\n\n*`;

                    }
                    msg+='*Please specify with register number to avoid collision*\n'.toUpperCase();
                    return {'success':true,message:msg};
                }
            }

        }
    }
    
    return {'success':false,'message':"Couldn't find any related data"};
}

exports.getAttendance=getAttendance;