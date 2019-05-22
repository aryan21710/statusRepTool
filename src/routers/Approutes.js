
import React from 'react';
import { BrowserRouter, Route, link, NavLink, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Create from '../components/Create';
import View from '../components/View';
import PagenotFound from '../../src/components/PagenotFound';



 const Approutes=()=>{
    	var mainBg = require('./../../public/images/mainBg.jpg');
		var bannerStyle = {
			background: 'url(' + mainBg + ')',
			backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            margin: "0",
            padding: "0",
		};
    return (
		<BrowserRouter>
			<div style={bannerStyle}>
				<Header />
				<Switch>
					<Route path="/" component={Create} exact={true} />
					<Route path="/view" component={View} />
					<Route component={PagenotFound} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default Approutes