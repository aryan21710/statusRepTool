import React from 'react';
import {NavLink} from 'react-router-dom';


export default ()=>{

    return (
		<div className="header">
			<div className="logoHeader">
				<img src={require('./../../public/images/mylogo.jpg')} /> <h1>StaRt.. A Status Reporting Tool</h1>
			</div>
			<div className="navLinks">
				<NavLink to='/' activeClassName='is-active' activeStyle={{ color: 'red' }} exact={true}>
					<button>ADD</button>
				</NavLink>
				<NavLink to='/view' activeClassName='is-active' activeStyle={{ color: 'red' }}>
					<button>VIEW</button>
				</NavLink>
			</div>
		</div>
	);
}