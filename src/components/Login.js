import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { userlogin } from "./../action/userLogin";

class Login extends React.Component {
  state = {
    email: "",
    passwd: "",
    loginStatus: "",
    mouseOverLogin: false
  };

  enteruname = e => {
    console.log(`E.TARGET.NAME IS CHANGED:- ${e.target.name}`);
    this.setState(
      {
        email: e.target.value
      },
      () => {
        console.log(this.state.email.match(/admin/g));
      }
    );
  };

  enterpasswd = e => {
    // console.log(`E.TARGET.NAME IS CHANGED:- ${e.target.name}`);
    this.setState({
      passwd: e.target.value
    });
  };

  submitCredentialsWithAxios = e => {
    e.preventDefault();
    axios
      .post(
        "./login",
        {
          user: {
            email: this.state.email,
            passwd: this.state.passwd
          }
        },

        { withCredentials: true }
      )
      .then(res => {
        console.log("RESPONSE BACK FROM SERVER:-" + JSON.stringify(res));
        if (
          this.state.email.length > 0 &&
          this.state.passwd.length > 0 &&
          this.state.email.match(/admin/g).length > 0
        ) {
          // console.log('THIS.PROPS:-'+JSON.stringify(this.props));
          this.setState({
            loginStatus: "Logged In"
          });
          this.props.dispatch(
            userlogin({
              email: this.state.email,
              passwd: this.state.passwd
            })
          );
          if (this.state.email.split("@")[0] === "admin") {
            this.props.history.push("/create");
          } else {
            this.props.history.push("/create");
          }
        }
      })
      .catch(error => {
        console.log("ERROR OCCURED:-" + error);
        alert("USER DOES NOT EXIST. LOGIN WITH A VALID USER");
      });

    // console.log(JSON.stringify(this.props));
  };

  submitCredentials = e => {
    e.preventDefault();
    try {
      if (
        this.state.email.length > 0 &&
        this.state.passwd.length > 0 &&
        this.state.email.match(/admin/g).length > 0
      ) {
        this.setState({
          loginStatus: "Logged In"
        });
        // this.props.dispatch(userlogin({
        // 	email:this.state.email,
        // 	passwd:this.state.passwd
        // }));
        if (this.state.email.split("@")[0] === "admin") {
          this.props.history.push("/create");
        }
      }
    } catch (err) {
      console.log("ERROR OCCURED:-" + error);
      alert("USER DOES NOT EXIST. LOGIN WITH A VALID USER");
    }
  };

  render() {
    return (
      <div
        className="login"
        onMouseMove={() => {
          this.setState({
            mouseOverLogin: true
          });
        }}
      >
        <form
          onSubmit={this.submitCredentials}
          className={
            this.state.mouseOverLogin ? "loginForm animateLogin" : "loginForm"
          }
        >
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
