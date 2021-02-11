import React, { useEffect, useState, useRef } from "react";
import LoginHeader from "./LoginHeader";
import { useHistory } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signUpAction,signInAction } from "../redux/action/LoginAction";

import { signout,saveJwtToLocalStorage } from "../api/userAuth";

const SignIn=()=>{

  const history = useHistory();
  const dispatch = useDispatch();

  const emailInput = useRef();
  const passwdInput = useRef();
  const submitInput = useRef();

  useEffect(() => {
    emailInput.current.focus();
    signout()
  }, []);

  const [values, setValues] = useState({
    password: "",
    email: "",
    serverError: "",
    success: false,
    signUpSuccess: false,
  });

  const { password, email, serverError, success, signUpSuccess } = values;

  const signUpSuccessFromRedux = useSelector(
    (state) => state.signUpReducer.success,
    shallowEqual
  );



  console.log("signUpSuccessFromRedux", signUpSuccessFromRedux);
  useEffect(() => {
    if (success) {
      history.push("/view");
    }
    // eslint-disable-next-line
  }, [success]);

  useEffect(() => {
    console.log('useeffect is called',signUpSuccess)
    if (signUpSuccessFromRedux) {
      setTimeout(() => {
        dispatch(signUpAction({ email, success: false }));
      }, 2000);
    }
    setValues({
      ...values,
      signUpSuccess: signUpSuccessFromRedux,
    });
        // eslint-disable-next-line
  }, [signUpSuccess]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('before dispatch',values)
    const {email,password}=values
    console.log('email,password',email,password)
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


  /**
   * This will update the state variable email and password with the user entered email and password.
   * @param  {object} e Event Object
   * @returns {object} :- Updates the state variable called values with email & password leaving serverError and signUpSuccess to false;
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    // console.log('name and value',name,':',value)
    setValues({
      ...values,
      [name]: value,
      serverError: false,
      signUpSuccess: false,
    });
  };



  /**
   *  This method will be invoked when user uses keyboard keydown button instead of mouse cursor to navigate
   *  between email and password input boxes.
   * @param  {object} e Event Object
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.name === "email") {
        passwdInput.current.focus();
      } else if (e.target.name === "password") {
        submitInput.current.focus();
      }
    }
  };

    return (
      <div className="login">
        <form onSubmit={handleSubmit} className="loginForm">
        <LoginHeader/>

          {email.length > 0 && <div className="secondaryBkgLogin"></div>}
          <p>Login</p>
          <hr />

          <input
            className="email"
            value={email}
            name="email"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            type="email"
            ref={emailInput}
            placeholder="EMAIL ADDRESS"
          />
          <input
            className="passwd"
            value={password}
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
          Sign In
        </button>
        {serverError && (
          <div className="signUperror flexStyling">{serverError}</div>
        )}
        {serverError
          ? undefined
          : signUpSuccess && (
              <div className="signUpsuccess flexStyling">
                SIGNUP SUCCESS. PLEASE SIGNIN NOW
              </div>
            )}
        </form>
        
      </div>
    );
  
}

export default SignIn
