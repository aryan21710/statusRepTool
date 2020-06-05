import {
  STATUS_REP_SUCCESS,
  STATUS_REP_LOADING,
  STATUS_REP_FAILURE,
  GET_ALL_STATUS_REP_SUCCESS,
  GET_ALL_STATUS_REP_LOADING,
  GET_ALL_STATUS_REP_FAILURE,
} from "../../../common/constants";

import { STATUS_URL } from "../../../common/mydotenv";
import { dataHeaders } from "../../../common/axiosHeaders";
import axios from "axios";

export const postStatusAction = (reports) => {
  return async (dispatch) => {
    console.log("sending the axios post for ", reports);
    const token = JSON.parse(localStorage.getItem("jwt")).trim();
    const userId = JSON.parse(localStorage.getItem("signInInfo"))._id;
    

    const reportsWithUserIdAppended = reports.data.map((report) => ({
      ...report,
      userIdForBackend: userId,
    }));
    console.log("reportsWithUserIdAppended", reportsWithUserIdAppended);
    dispatch({ type: STATUS_REP_LOADING });

    try {
      const response = await axios.post(
        `${STATUS_URL}/poststatus/${userId}`,
        {
          reportsWithUserIdAppended,
          userIdForBackend: userId,
        },
        {
          headers: { ...dataHeaders, Authorization: `Bearer ${token}` },
        }
      );
      console.log("response back from server in postStatusAction", response);

      if (response.data) {
        dispatch({ type: STATUS_REP_SUCCESS, data: response.data });
      } else {
        dispatch({ type: STATUS_REP_FAILURE });
      }
      return response;
    } catch (error) {
      dispatch({ type: STATUS_REP_FAILURE });

      return error.response;
    }
  };
};

export const getAllStatusAction = () => {
  return async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("jwt")).trim();
    const userId = JSON.parse(localStorage.getItem("signInInfo"))._id;
    console.log("axios get for ", userId);
    console.log("axios get for ", token);


    dispatch({ type: GET_ALL_STATUS_REP_LOADING });

    try {
      const response = await axios.get(
        `${STATUS_URL}/getallstatus/${userId}`,
        {
            headers: { ...dataHeaders, Authorization: `Bearer ${token}` },
        }
      );
      console.log("response back from server in GETALLSTATUSACTION", response);

      if (response.data) {
        dispatch({ type: GET_ALL_STATUS_REP_SUCCESS, data: response.data });
      } else {
        dispatch({ type: GET_ALL_STATUS_REP_FAILURE });
      }
      return response;
    } catch (error) {
      dispatch({ type: GET_ALL_STATUS_REP_FAILURE });

      return error.response;
    }
  };
};
