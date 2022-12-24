
const fs=require('fs');
let docDir=process.env.resourceDir+'documents/';

function getMatches(tags,name)
{
    let count=0;
    for(let x of tags)
        if(name.toLowerCase().indexOf(x.toLowerCase())!=-1)
            count+=1;
    return count;
}
function RetrieveDocument(givenName)
{
    if(!fs.existsSync(docDir))
        return {'success':true,'message':'Couldnt Find Any Related Documents'};    
    
    let matchedResult=[];let matchCount=0;

    let allFiles=JSON.parse(fs.readFileSync(`${docDir}map.json`));
    for(let x of allFiles)
    {
        let curCount=getMatches(x['tags'],givenName);
        if(curCount==0)
            continue;
        if(curCount>matchCount)
            {
                matchedResult=[];
                matchedResult.push(x);
                matchCount=curCount;
                continue;
            }
        
        if(curCount == matchCount)
        {
            matchedResult.push(x);
        }
    }

    if(matchCount==0)
     return {'success':true,'message':'Couldnt Find Any Related Documents'};

    if(matchedResult.length >1)
        return {'success':true,'message':'Multiple Files Detected'};
    else
        return {'success':true,'file':matchedResult[0]};

    
}

exports.RetrieveDocument=RetrieveDocument;