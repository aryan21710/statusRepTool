import {
    SIGNIN_SUCCESS,
    SIGNIN_LOADING,
    SIGNIN_FAILED,
  } from "../../../common/constants";
  
  const signInInfo = {
    email: "",
    success: false,
    loading: false,
    error: null,
    success: false,
    token: null,
    name: ""
  };
  
  export const signInReducer = (state = signInInfo, action) => {
    switch (action.type) {
      case SIGNIN_LOADING: {
        return { ...status, loading: true, error: null,  success: false,
        };
      }
      case SIGNIN_SUCCESS: {
        console.log('data from axios post inside signInReducer',action.data)
        return { ...status, token:action.data.token, email: action.data.userCred.email , name: action.data.userCred.name,
          loading: false, error: null, success: true };
      }
  
      case SIGNIN_FAILED: {
        return { ...status, loading: false, error: true,  success: false,
        };
      }
      default: {
        return state;
      }
    }
  };
  