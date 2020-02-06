import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { userlogin } from "./../action/userLogin";

class Login extends React.Component {
  state = {
    email: "",
    passwd: "",
    loginStatus: ""
  };

  enteruname = e => this.setState({ email: e.target.value });
  enterpasswd = e => this.setState({ passwd: e.target.value });

  submitCredentials = e => e.preventDefault();

  render() {
    return (
      <div className="login">
        <form onSubmit={this.submitCredentials} className="loginForm">
          <div className="secondaryBkgLogin"></div>
          <p>Login</p>
          <hr />

          <input
            className="uname"
            placeholder="Enter Username"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.enteruname}
          />
          <input
            className="passwd"
            placeholder="Enter Password"
            type="password"
            name="passwd"
            value={this.state.passwd}
            onChange={this.enterpasswd}
          />
          <button className="loginBtn">Login</button>
        </form>
      </div>
    );
  }
}

export default connect()(Login);
