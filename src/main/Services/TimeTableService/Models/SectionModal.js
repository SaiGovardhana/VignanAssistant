
class SectionModal
{
    constructor(year,section,room,timings)
    {   this.year=year;
        this.section=section;
        this.defaultRoom=room;
        this.periods={};
        this.timings=timings;
        this.faculty={};
    }
    
    /**
     * 
     * @returns {string}
     */
    getSection()
    {
        return this.section;
    }
    /**
     * 
     * @returns {string}
     */
    getDefaultRoom()
    {
        return this.defaultRoom;
    }
    /**
     * 
     * @returns {Array<string>}
     */
    getTimings()
    {
        return this.timings;

    }


    /**
     * 
     * @param {string} subject 
     * @returns {string}
     */
    getFaculty(subject)
    {   if(subject==undefined)
            return undefined;
        if(subject.indexOf('(')!=-1)
            subject=subject.substring(0,subject.indexOf('(')).trim();
        return this.faculty[subject];
    }

    getPeriod(day,periodNo)
    {

        return this.periods[day][periodNo];
    }
    /**
     * 
     * @param {string} day 
     * @returns {Array<string>}
     */
    getTimeTableForDay(day)
    {
        return this.periods[day];
    }
    /**
     * 
     * @returns string
     */
    getYear()
    {
        return this.year;
    }

}

exports.SectionModal=SectionModal;