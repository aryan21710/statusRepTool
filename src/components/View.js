import React from 'react';
import ViewReport from './ViewReport';
import {connect} from 'react-redux';


const View= (props)=>{
    // console.log('2:-' + JSON.stringify(props));
    return (
        <div>
            <ViewReport report={props.report}/>   
        </div>
    )
}

const mapStateToProps=(state)=>{
    // console.log('1:-'+JSON.stringify(state))
    return {
        report: state
    }
}

export default connect(mapStateToProps)(View);