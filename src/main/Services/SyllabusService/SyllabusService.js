
const fs=require('fs');

/**
 * Function to save the Pdf Syllabus file 
 */
function SaveSyllabus(fileName,fileDescription,fileData)
{   
    let syllabusDir=process.env.resourceDir+'syllabus';
    
    if(fileData==undefined)
    {
        return {'success':false,'message':'Please provide Attachment'}
    }
    fileName=fileName.toLowerCase();
    fileDescription=fileDescription.toLowerCase();
    if(!fs.existsSync(syllabusDir))
    {   
        fs.mkdirSync(syllabusDir,{recursive:true});
        let maps={};
        fs.writeFileSync(`${syllabusDir}/${'map.json'}`,JSON.stringify(maps));
    }
    
    fs.writeFileSync(`${syllabusDir}/${fileName.toLowerCase()}.pdf`,fileData);
    
    let map=JSON.parse(fs.readFileSync(`${syllabusDir}/map.json`).toString('utf-8'));
    map[fileName]=fileDescription;
    
    fs.writeFileSync(`${syllabusDir}/map.json`,JSON.stringify(map))
   
    return {'message':'File has Been Saved','success':true};
    
}

function deleteSyllabus(query)
{
    if(!fs.existsSync(syllabusDir))
    {   
        fs.mkdirSync(syllabusDir,{recursive:true});
        let maps={};
    fs.writeFileSync(`${syllabusDir}/${'map.json'}`,JSON.stringify(maps));
    }

    let map=JSON.parse(fs.readFileSync(`${syllabusDir}/map.json`).toString('utf-8'));
    
    if(query.trim().toLowerCase() in map)
    {

    }


}

function getSyllabus(query)
{   let syllabusDir=process.env.resourceDir+'syllabus';
    query=query.toLowerCase();
    if(!fs.existsSync(syllabusDir))
    {   
        fs.mkdirSync(syllabusDir,{recursive:true});
        let maps={};
    fs.writeFileSync(`${syllabusDir}/${'map.json'}`,JSON.stringify(maps));
    }
    let map=JSON.parse(fs.readFileSync(`${syllabusDir}/map.json`).toString('utf-8'));
    
    query=query.toLowerCase().trim();



    /**
     * Subject Code has been specified
     */
    if(query in map)
        {
            return {'caption':`Syllabus For *${query.toUpperCase()}*\n\n${map[query]} `,'success':true,'path':`${syllabusDir}/${query}.pdf`};
        }


    let possible=[]
    for(let k in map)
        if(map[k].includes(query))
            possible.push(k);
    if(possible.length ==0)
    {
        return {'success':true, 'message':'*Couldnt find matching subjects*'};
    }

    if(possible.length==1)
    {   query=possible[0];
        return {'caption':`Syllabus For *${query.toUpperCase()}*\n\n${map[query].toUpperCase()} `,'success':true,'path':`${syllabusDir}/${query}.pdf`};   
    }

    let message='*Possible Subjects Are*\n\n';

    for(let x of possible)
        {
            message+=`*${x.toUpperCase()}*\n${map[x].toUpperCase()}\n\n`;
        }

    message+='*Please Specify with Subject code to avoid dispute*';

    return {'success':true, 'message':message};
}
exports.getSyllabus=getSyllabus;
exports.SaveSyllabus=SaveSyllabus;