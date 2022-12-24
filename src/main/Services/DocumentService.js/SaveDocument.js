const fs=require('fs');
let resourceDir=process.env.resourceDir;
let docDir=resourceDir+'documents/';
function SaveDocument(tags,buffer,fileName,mimetype)
{   
    if(!fs.existsSync(resourceDir+'documents/'))
    {
        fs.mkdirSync(resourceDir+'documents/');
        fs.writeFileSync(docDir+'/map.json','[]',{encoding:"utf8"});
    }

    let currentFiles=JSON.parse(fs.readFileSync(docDir+'map.json',{encoding:'utf8'}));
    let time=Date.now();
    if(!fs.existsSync(`${docDir}${time}`))
        fs.mkdirSync(`${docDir}${time}`);
    
    currentFiles.push({'fid':time,'tags':tags,'fileName':fileName,'mimetype':mimetype});
    
    //Make changes in map.json 
    fs.writeFileSync(docDir+'/map.json',JSON.stringify(currentFiles),{encoding:"utf8"});

    //Save the File in memory
    fs.writeFileSync(`${docDir}${time}/${fileName}`,buffer);


}

exports.SaveDocument=SaveDocument;