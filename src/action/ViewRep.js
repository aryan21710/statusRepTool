

export const ViewRep =(report)=> {
    console.log('inside action generator');
    return {
         type: 'VIEW_REP',
        report
    }
}
