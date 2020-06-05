import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Create from "../components/Create";
import View from "../components/View";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import PagenotFound from "../../src/components/PagenotFound";
import backgroundImg from "../../public/images/office.png";

const Approutes = () => {
  return (
    <BrowserRouter>
      <div>
        <img src={backgroundImg} className="commonBackground" />

        <Switch>
          <Route path="/" component={SignIn} exact={true} />
          <Route path="/create" component={Create} />
          <Route path="/signup" component={SignUp} />
          <Route path="/view" component={View} />
          <Route component={PagenotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Approutes;
