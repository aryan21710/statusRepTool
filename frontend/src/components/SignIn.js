import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
// import MenuSignIn from "./MenuSignIn";
import { useHistory } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signUpAction,signInAction } from "../redux/action/LoginAction";

import { saveJwtToLocalStorage } from "../api/userAuth";


const SignIn=()=>{
  const history = useHistory();
  const dispatch = useDispatch();

  const emailInput = useRef();
  const passwdInput = useRef();
  const submitInput = useRef();

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  const [values, setValues] = useState({
    password: "aryan1234",
    email: "aryan@gmail.com",
    serverError: "",
    success: false,
    signUpSuccess: false,
  });

  const { password, email, serverError, success, signUpSuccess } = values;

  // const signUpSuccessFromRedux = useSelector(
  //   (state) => state.signUpReducer.success,
  //   shallowEqual
  // );


  const signUpSuccessFromRedux=true

  console.log("signUpSuccessFromRedux", signUpSuccessFromRedux);
  useEffect(() => {
    if (success) {
      history.push("/view");
    }
  }, [success]);

  useEffect(() => {
    if (signUpSuccessFromRedux) {
      setTimeout(() => {
        dispatch(signUpAction({ email, success: false }));
      }, 2000);
    }
    setValues({
      ...values,
      signUpSuccess: signUpSuccessFromRedux,
    });
  }, [signUpSuccess]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data=await dispatch(signInAction({ email, password }))
    console.log('data back from axios post  for signInAction',data)

    if (data.error) {
        setValues({ ...values, serverError: data.error, success: false });
      } else {
        const {email,name,_id } = data.userCred
        saveJwtToLocalStorage(data.token, { name, email,_id }, () => {
          setValues({
            email,
            serverError: false,
            success: true,
          });
        });
      }
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
      serverError: false,
      signUpSuccess: false,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.name == "email") {
        passwdInput.current.focus();
      } else if (e.target.name == "password") {
        submitInput.current.focus();
      }
    }
  };

    return (
      <div className="login">
        <form onSubmit={handleSubmit} className="loginForm">
          <div className="secondaryBkgLogin"></div>
          <p>Login</p>
          <hr />

          <input
            className="uname"
            ref=""
            value={email || ""}
            name="email"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            type="email"
            ref={emailInput}
            placeholder="EMAIL ADDRESS"
          />
          <input
            className="passwd"
            value={password || ""}
            type="password"
            name="password"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            ref={passwdInput}
            placeholder="PASSWORD"

          />
          <button
          className="loginBtn"
          ref={submitInput}
          onKeyDown={handleKeyDown}
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
        </form>
      </div>
    );
  
}

export default SignIn
