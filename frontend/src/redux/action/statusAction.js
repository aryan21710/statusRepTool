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
    // const token = JSON.parse(localStorage.getItem("jwt")).trim();
    // const userId = JSON.parse(localStorage.getItem("signInInfo"))._id;
    const userId = "5ed69dc12cbbd2f967f4ced6";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQ2OWRjMTJjYmJkMmY5NjdmNGNlZDYiLCJyb2xlIjowLCJpYXQiOjE1OTExNzE1ODF9.yAFMfNk6pCA-LctkYCxPVRwhPV4jCC2LaHxunWauAOQ";

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

export const getAllStatusAction = (userId) => {
  return async (dispatch) => {
    console.log("axios get for ", userId);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQ2OWRjMTJjYmJkMmY5NjdmNGNlZDYiLCJyb2xlIjowLCJpYXQiOjE1OTExOTkwMTN9.CXjxyqwsU8AxAkPtOfoq71EZtx2K_vbv-QSeuVzmGrI";

    dispatch({ type: GET_ALL_STATUS_REP_LOADING });

    try {
      const response = await axios.get(
        `${STATUS_URL}/getallstatus/${userId}`,
        {
          userIdForBackend: userId,
        },
        {
          headers: { ...dataHeaders},
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
