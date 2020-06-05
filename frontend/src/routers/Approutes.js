
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Create from '../components/Create';
import View from '../components/View';
import Login from '../components/SignIn'
import PagenotFound from '../../src/components/PagenotFound';
import backgroundImg from '../../public/images/office.png'


 const Approutes=()=>{
    
    return (
		<BrowserRouter>
			<div>
			<img src={backgroundImg} className="commonBackground" />

				<Switch>
				<Route path="/" component={Login} exact={true} />
					<Route path="/create" component={Create} />
					<Route path="/view" component={View} />
					<Route component={PagenotFound} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default Approutes