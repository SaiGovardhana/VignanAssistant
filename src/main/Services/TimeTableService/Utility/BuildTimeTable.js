const {ParseTimeTable} = require('../Parsers/TimeTableParser.js');
const {generateSection,generateDay} = require('../Parsers/TimeTableHTML.js');
const nodeHtmlToImage=require('node-html-to-image');
const fs=require('fs');
const path = require('path');
const EventEmitter = require('events');

/**
 * 
 * @param {EventEmitter} eventEmitter
 */
async function BuildTimeTables(buffer,year,eventEmitter)
{
    let map={'IV':'4','III':'3','II':'2','I':'1','1':'1','2':'2','3':'3','4':'4'};
    let timeTable=await ParseTimeTable(buffer,year);
    let days=['Mon','Tue','Wed','Thu','Fri','Sat'];
  
    for(let x in timeTable.sections)
    {
        fs.mkdirSync(process.env.resourceDir+`timetable/${map[year]}/${x}/`,{recursive:true});
        let currentSection=generateSection(timeTable.getSection(x));
        if(eventEmitter!=null)
            eventEmitter.emit('status',`Parsing Section:${map[year]} ${x}`);
        await nodeHtmlToImage({
            html:currentSection,
            output:process.env.resourceDir+`timetable/${map[year]}/${x}/timetable.png`
        });

        for(d of days)
            {   console.log(`Parsing day:${map[year]} ${x} ${d}`);
                if(eventEmitter!=null)
                    eventEmitter.emit('status',`Parsing day:${map[year]} ${x} ${d}`);
                let currentDay=generateDay(d,timeTable.getSection(x));
                await nodeHtmlToImage({
                    html:currentDay,
                    output:process.env.resourceDir+`timetable/${map[year]}/${x}/${d}.png`
                });   
            }

    }



}
exports.BuildTimeTables=BuildTimeTables;

