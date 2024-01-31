import axios from "axios";
import {
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_LOVING_FAIL,
  PRODUCT_LIST_LOVING_REQUEST,
  PRODUCT_LIST_LOVING_SUCCESS,
  PRODUCT_LIST_SEARCH_REQUEST,
  PRODUCT_LIST_SEARCH_SUCCESS,
  PRODUCT_LIST_SEARCH_FAIL,
  PRODUCT_LIST_SEARCH_NAME_REQUEST,
  PRODUCT_LIST_SEARCH_NAME_SUCCESS,
  PRODUCT_LIST_SEARCH_NAME_FAIL,
  PRODUCT_LIST_CATEGORY_REQUEST,
  PRODUCT_LIST_CATEGORY_SUCCESS,
  PRODUCT_LIST_CATEGORY_FAIL,
} from "../Constants/ProductConstants";
import { logout } from "./userActions";

const instance = axios.create({
  baseURL: 'http://localhost:5000', 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});
// PRODUCT LIST
export const listProduct =
  (keyword = " ", pageNumber = " ") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await instance.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
//list search
export const listSearch = (type) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_SEARCH_REQUEST });
    const { data } = await instance.get(`/api/products/search/${type}`);
    dispatch({ type: PRODUCT_LIST_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//list name search
// export const listNameSearch = (type) => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_LIST_SEARCH_NAME_REQUEST });
//     const { data } = await instance.get(`/api/products/search/${type}`);
//     dispatch({ type: PRODUCT_LIST_SEARCH_NAME_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_LIST_SEARCH_NAME_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };


//loving product
export const listLovingProduct =() =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_LOVING_REQUEST });
      const { data } = await instance.get(
        `/api/products/loving}`
      );
      dispatch({ type: PRODUCT_LIST_LOVING_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_LOVING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


//by category
export const listByCategory = (type) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_CATEGORY_REQUEST });
    const { data } = await instance.get(`/api/products/category/${type}`);
    dispatch({ type: PRODUCT_LIST_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// SINGLE PRODUCT
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await instance.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// PRODUCT REVIEW CREATE
export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await instance.post(`/api/products/${productId}/review`, review, config);
      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };
