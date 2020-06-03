import React from 'react';
import { shallowEqual, useSelector } from "react-redux";
import ViewReport from './ViewReport';



const View= ()=>{

    const loading = useSelector(
        (state) => state.statusReducer.loading,
        shallowEqual
      );

      const data = useSelector(
        (state) => state.statusReducer.data,
        shallowEqual
      );

      

    return (
        <div>      
           <ViewReport data={data}/>    
        </div>
    )
}



export default React.memo(View);