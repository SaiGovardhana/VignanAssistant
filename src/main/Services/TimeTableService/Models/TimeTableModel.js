
let {SectionModal}=require('./SectionModal.js')
class TimeTableModel
{   
    constructor(year)
    {
        this.year=year;

    }
    
    //Function to parse timeTable array to structure
    /**
     * Argument provides a 2d array of strings representing the whole timetable
     * @param {Array<Array<String>>} timeTable 
     */
    parse(timeTable)
    {   let i=0;
       
        let section={}
        while(i<timeTable.length)
        {
            //Insignificant rows
            if(timeTable[i].length==0||timeTable[i][0]==null)
                {
                    i+=1;
                    continue;
                }
            //Parse the section
            if(timeTable[i][0].startsWith('Section'))
            {   //Get the current Section and Default Room
                let defaultRoomIndex=timeTable[i][0].indexOf('(');
                let curSection =defaultRoomIndex == -1?timeTable[i][0].trim() :timeTable[i][0].substring(0,timeTable[i][0].indexOf('(')).trim();
                let defaultRoom=defaultRoomIndex == -1?"Mobile":timeTable[i][0].substring(timeTable[i][0].indexOf('(')).trim();
                if(defaultRoomIndex==-1)
                    defaultRoomIndex=curSection.length;
                curSection=curSection.substring(curSection.indexOf(':')+1,defaultRoomIndex).trim();
                
                i+=1;
                //Parse the timings
                let timings=timeTable[i].slice(1);
                timings=timings.filter((x)=>x!=null?true:false);
                timings=timings.map((x)=>x.substring(0,x.indexOf('\n')));
                
                let currentSection=new SectionModal(this.year,curSection,defaultRoom,timings);
                i+=1;
                //Parse the days
                for(let j=0;j<6;j++)
                {   
                   
                    let day=timeTable[i][0];
                    
                    //Set nulls to allocated
                    let filtered=timeTable[i].map(x=>{return x==null?'Unallocated':x});
                    
                    
                
                    if(filtered[filtered.length-1]=='Unallocated'&&filtered.length>9)
                        filtered.pop();
                    currentSection.periods[day]=filtered.slice(1);
                    i+=1;
                }

                section[curSection]=currentSection;

                while(i<timeTable.length&&timeTable[i][0]!=null&&!timeTable[i][0].startsWith('Section'))
                {
                    for(let j=0;j<timeTable[i].length;j++)
                        {
                            if(timeTable[i][j]==null)
                                continue;
                            let indexOfColon=timeTable[i][j].indexOf(':');
                            if(indexOfColon==-1)
                                continue;
                            section[curSection]['faculty'][timeTable[i][j].substring(0,indexOfColon).trim()]=timeTable[i][j].substring(indexOfColon+1).trim();
                        }
                    i+=1;
                }
            }
            else
                i+=1;
            
            
        }
        this.sections=section;
        return section;
    }
    /**
     * 
     * @param {*} section 
     * @returns {SectionModal}
     */
    getSection(section)
    {
        return this.sections[section];
    }

    getYear(year)
    {
        return this.year;
    }

}
exports.TimeTableModel=TimeTableModel;