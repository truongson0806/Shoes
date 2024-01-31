import {
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
} from "../Constants/TransactionConstants";
// ORDER VNPAY
export const transactionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_CREATE_REQUEST:
      return { loading: true };
    case TRANSACTION_CREATE_SUCCESS:
      return { loading: false, success: true };
    case TRANSACTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
