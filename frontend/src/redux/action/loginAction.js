import {
	SIGNUP_SUCCESS,
	SIGNUP_LOADING,
	SIGNUP_FAILED,
	SIGNIN_SUCCESS,
	SIGNIN_LOADING,
	SIGNIN_FAILED,
  } from "../../../common/constants";
  import {  LOGIN_URL } from "../../../common/mydotenv";
  import { dataHeaders } from "../../../common/axiosHeaders";
  import axios from "axios";
  
  export const signUpAction = (user) => {
	console.log("user ", user);
	const { name, email, password } = user;
	return async (dispatch) => {
	  dispatch({ type: SIGNUP_LOADING });
	  try {
		const response = await axios.post(
		  `${ LOGIN_URL}/signup`,
		  {
			name,
			email,
			password,
		  },
		  {
			headers: dataHeaders,
		  }
		);
		console.log("response inside signupaction", response);
		if (
		  response.status == 200 &&
		  Object.keys(response.data).includes("user")
		) {
		  dispatch({ type: SIGNUP_SUCCESS, data: response.data.user.email });
		  return response.data;
		} else {
		  dispatch({ type: SIGNUP_FAILED });
		}
	  } catch (error) {
		dispatch({ type: SIGNUP_FAILED });
  
		return error.response.data;
	  }
	};
  };
  
  export const signInAction = (user) => {
	console.log("user ", user);
	const { email, password } = user;
	return async (dispatch) => {
	  dispatch({ type: SIGNIN_LOADING });
	  try {
		const response = await axios.post(
		  `${ LOGIN_URL}/signin`,
		  {
			email,
			password,
		  },
		  {
			headers: dataHeaders,
		  }
		);
		console.log("response inside siginInAction", response);
		if (
		  response.status == 200 &&
		  Object.keys(response.data).includes("token") && Object.keys(response.data).includes("userCred")
		) {
		  dispatch({ type: SIGNIN_SUCCESS, data: response.data });
		  return response.data;
		} else {
		  dispatch({ type: SIGNIN_FAILED });
		}
	  } catch (error) {
		dispatch({ type: SIGNIN_FAILED });
  
		return error.response.data;
	  }
	};
  };
  