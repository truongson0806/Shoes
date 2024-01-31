import {
    TRANSACTION_LIST_FAIL,
    TRANSACTION_LIST_REQUEST,
    TRANSACTION_LIST_SUCCESS,
  } from "../Constants/TransactionConstants";
  
  export const transactionListReducer = (state = { transactions: [] }, action) => {
    switch (action.type) {
      case TRANSACTION_LIST_REQUEST:
        return { loading: true };
      case TRANSACTION_LIST_SUCCESS:
        return { loading: false, transactions: action.payload };
      case TRANSACTION_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };