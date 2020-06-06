import {
    SIGNUP_SUCCESS,
    SIGNUP_LOADING,
    SIGNUP_FAILED,
  } from "../../common/constants";
  
  const signUpInfo = {
    email: "",
    loading: false,
    error: null,
    success: false,
  };
  
  export const signUpReducer = (state = signUpInfo, action) => {
    switch (action.type) {
      case SIGNUP_LOADING: {
        return { ...state, loading: true, error: null,  success: false,
        };
      }
      case SIGNUP_SUCCESS: {
        console.log('data from axios post inside signUpReducer',action.data)
        return { ...state, email:action.data, loading: false, error: null, success: true };
      }
  
      case SIGNUP_FAILED: {
        return { ...state, loading: false, error: true,  success: false,
        };
      }
      default: {
        return state;
      }
    }
  };
  