import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Create from "../components/Create";
import View from "../components/View";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import backgroundImg from "../images/office.png";

const Approutes = () => {
  return (
    <BrowserRouter>
      <div>
        <img src={backgroundImg} className="commonBackground" alt="background"/>

        <Switch>
          <Route path="/" component={SignIn} exact={true} />
          <Route path="/create" component={Create} />
          <Route path="/signup" component={SignUp} />
          <Route path="/view" component={View} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Approutes;
