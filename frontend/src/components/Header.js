import { NavLink } from "react-router-dom";
import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="appTitle">
          <h1>StaRt.. A Status Reporting Tool</h1>
        </div>
        <div className="navLinks">
          <NavLink
            to="/create"
            className="addBtn"
            activeClassName="activeButton"
          >
            ADD
          </NavLink>
          <NavLink
            to="/view"
            className="viewBtn"
            activeClassName="activeButton"
          >
            VIEW
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Header;
