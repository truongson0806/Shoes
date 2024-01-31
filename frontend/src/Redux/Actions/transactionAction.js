import axios from "axios";
import {
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
} from "../Constants/TransactionConstants";

//pay vnpay
export const payOrderVN = () => async (dispatch) => {
  try {
    dispatch({ type: TRANSACTION_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  } catch (error) {}
   await axios.post(`/api/vn_response`, config);
  //  const { data } =axios.get('/api/vnpay_ipn',config)
};
