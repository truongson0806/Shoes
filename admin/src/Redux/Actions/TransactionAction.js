import {
    TRANSACTION_LIST_FAIL,
    TRANSACTION_LIST_REQUEST,
    TRANSACTION_LIST_SUCCESS,
  } from "../Constants/TransactionConstants";
  import { logout } from "./userActions";
  import axios from "axios";
  import { URL } from "../Url";

  export const listTransactions = () => async (dispatch, getState) => {
    try {
      dispatch({ type: TRANSACTION_LIST_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/transaction/all`, config);
      dispatch({ type: TRANSACTION_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: TRANSACTION_LIST_FAIL,
        payload: message,
      });
    }
  };