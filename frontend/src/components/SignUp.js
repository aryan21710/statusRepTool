import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import LoginHeader from "./LoginHeader";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpAction } from "../redux/action/LoginAction";



const SignUp=()=>{
  const history = useHistory();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    success: false,
    serverError: "",

  });
  const nameInput = useRef();
  const emailInput = useRef();
  const passwdInput = useRef();
  const submitInput = useRef();

  const { name, password, email, success, serverError } = values;

  useEffect(() => {
    nameInput.current.focus();

  }, []);

  useEffect(() => {
    if (success) {
      history.push("/");
    }
  }, [success]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data=await dispatch(signUpAction({ name, email, password }))
    console.log('data back from axios post  for signUpAction',data)
    if (data.error) {
        setValues({ ...values, serverError: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          serverError: "",
          success: true,
        });
      }
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
      serverError: false
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.name == "name") {
        emailInput.current.focus();
      } else if (e.target.name == "email") {
        passwdInput.current.focus();
      } else if (e.target.name == "email") {
        submitInput.current.focus();
      }
    }
  };

    return (
      <div className="login">
        <form onSubmit={handleSubmit} className="loginForm">
        <LoginHeader/>

          {name.length==1 && <div className="secondaryBkgLogin"></div>}
          <p>Sign-Up</p>
          <hr />

          <input
          className="nameSignup"
          value={name || ""}
          name="name"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          type="name"
          ref={nameInput}
          placeholder="NAME"
        />

          <input
            className="emailSignup"
            value={email || ""}
            name="email"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            type="email"
            ref={emailInput}
            placeholder="EMAIL ADDRESS"
          />
          <input
            className="passwdSignup"
            value={password || ""}
            type="password"
            name="password"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            ref={passwdInput}
            placeholder="PASSWORD"

          />
          <button
          className="loginBtnSignup"
          ref={submitInput}
          onKeyDown={handleKeyDown}
          onClick={handleSubmit}
        >
          Sign Up
        </button>
        {serverError && (
          <div className="signUperror flexStyling">{serverError}</div>
        )}
        </form>
       
      </div>
    );
  
}

export default SignUp
