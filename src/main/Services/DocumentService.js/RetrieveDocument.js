
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
        if(givenName.indexOf(x['fid'])!=-1)
        {
            matchCount=1;
            matchedResult=[]
            matchedResult.push(x);
            break;
        }
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
    {   let buts=[]
        for(let z of matchedResult)
            buts.push([{'text':z['fileName'],'callback_data':z['fid']}])
        return {'success':true,'message':'*Multiple Files Detected*','buttons':buts};
    }
    else
        return {'success':true,'caption':`Heres Your Document \n *${matchedResult[0]['fileName']}*`,'path':`${docDir}${matchedResult[0]['fid']}/${matchedResult[0]['fileName']}`,'mimetype':matchedResult[0]['mimetype']};

    
}

exports.RetrieveDocument=RetrieveDocument;