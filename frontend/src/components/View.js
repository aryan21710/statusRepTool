import React from 'react';
import ViewReport from './ViewReport';
import {connect} from 'react-redux';


const View= (props)=>{
    return (
        <div>      
           <ViewReport data={props.data}/>    
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
        data: state.data
    }
}

export default connect(mapStateToProps)(View);