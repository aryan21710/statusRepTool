

export const ViewRep =(report)=> {
    console.log('inside action generator',report);
    return {
         type: 'VIEW_REP',
        report
    }
}
