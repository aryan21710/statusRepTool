import {
  STATUS_REP_SUCCESS,
  STATUS_REP_LOADING,
  STATUS_REP_FAILURE,
} from "../../../common/constants";

const initialState = {
    loading: false,
    error: null,
    success: false,
    data: [],
  }


export const statusReducer = (state = initialState, action) => {
  console.log("action.data inside statusReducer", action.data);
  switch (action.type) {
    case STATUS_REP_LOADING: {
      return { ...state, loading: true, error: null, success: false };
    }

    case STATUS_REP_SUCCESS: {
      return {
        loading: false,
        error: null,
        success: true,
        ...state,
        data: [...action.data]
      };
    }
    case STATUS_REP_FAILURE: {
      return { ...state, loading: false, error: true, success: false };
    }

    default : {
        return state
    }
  }
};
