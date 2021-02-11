import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Create from "../components/Create";
import View from "../components/View";
import SignIn from "../views/SignIn";
import SignUp from "../components/SignUp";
import { Box } from '@material-ui/core';
import {useStyles} from '../styles/materialUI/LandingPage';
const Approutes = (props) => {
  const classes = useStyles(props);

  return (
    <BrowserRouter>
    <Box width="100%" height="100%" className={classes.parentContainer}>
        <Switch>
          <Route path="/" component={SignIn} exact={true} />
          <Route path="/create" component={Create} />
          <Route path="/signup" component={SignUp} />
          <Route path="/view" component={View} />
        </Switch>
      </Box>
    </BrowserRouter>
  );
};

export default Approutes;
