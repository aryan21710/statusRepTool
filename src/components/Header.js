import {NavLink} from 'react-router-dom';
import React, { Component } from 'react';
import { compose } from 'redux';

class Header extends Component{
	state={
		isActive:true
	}

	handleClick=()=>{
		this.setState({
			isActive: !this.state.isActive
		})
	}

	render(){
		return (
			<div className="header">
				<div className="logoHeader">
					 <h1>StaRt.. A Status Reporting Tool</h1>
				</div>
				<div className="navLinks">
					<NavLink to='/' activeClassName='is-active'  exact={true}>
						<button className={this.state.isActive ?  "addBtn activeButton" : "addBtn"}
						onClick={this.handleClick}
						>ADD</button>
					</NavLink>
					<NavLink to='/view' activeClassName='is-active'>
					<button className={this.state.isActive ? "viewBtn" : "viewBtn activeButton"}
					onClick={this.handleClick}
					>VIEW</button>
					</NavLink>
				</div>
			</div>
		);
	}

  
}

export default Header;