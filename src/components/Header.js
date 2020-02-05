import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../../public/images/mylogo.jpg';


export default ()=>{

    return (
		<div className="header">
			<div className="logoHeader">
				 <h1>StaRt.. A Status Reporting Tool</h1>
			</div>
			<div className="navLinks">
				<NavLink to='/' activeClassName='is-active'  exact={true}>
					<button className='addBtn'
					>ADD</button>
				</NavLink>
				<NavLink to='/view' activeClassName='is-active' activeStyle={{ color: 'red' }}>
					<button className='viewBtn'
					>VIEW</button>
				</NavLink>
			</div>
		</div>
	);
}