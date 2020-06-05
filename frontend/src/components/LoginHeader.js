import React from "react";
import { NavLink } from "react-router-dom";

const LoginHeader = () => {
  return (
    <React.Fragment>
      <NavLink
        activeStyle={{ textDecoration: "none", color: "white" }}
        className="signInHeader"
        to="/"
      >
        SIGNIN
      </NavLink>

      <NavLink
        activeStyle={{ textDecoration: "none", color: "white" }}
        className="signUpHeader"
        to="/signup"
      >
        SIGNUP
      </NavLink>
    </React.Fragment>
  );
};

export default LoginHeader;
