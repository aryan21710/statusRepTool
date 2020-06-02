

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';




const Template=()=>{
    let inp=''
    console.log('inp:-'+inp);
     const data = [
			{
				date: 'May 16 2019',
                 category: 'REACT',
                 status: inp
            }
		];

   const columns = [
		{
			Header: 'Date',
			accessor: 'date', // String-based value accessors!
		},
		{
			Header: 'Category',
			accessor: 'category',
		},
		{
			Header: 'Status',
			accessor: 'status',
		},
   ];
    return (
		<div>
            <h1>BASE TABLE EXAMPLE</h1>
            <input onInput={(e)=>{
                inp=e.target.value;
                e.target.value;
            }}/>
			<ReactTable data={data} columns={columns} />
		</div>
	);
}


ReactDOM.render(<Template/>, document.getElementById('app'));







