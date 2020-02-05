import React from 'react';
import {connect} from 'react-redux';
import StatusForm from './Statusform'
import {ViewRep} from '../action/ViewRep';
import Header from '../components/Header';


/**
 *  Create Component:- To create the status report
 * @param {*} props props passed to Create component
 */
const Create=(props)=>{

    return (
        <div>
        <Header />
            <StatusForm onSubmit={(report)=>{
                props.dispatch(ViewRep(report))
                props.history.push('/view');
            }}/>
        </div>
    )
}


export default connect()(Create);