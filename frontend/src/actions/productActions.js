import axios from "axios";
import {
  GET_PRICES_REQUEST,
  GET_PRICES_SUCCESS,
  GET_PRODUCTS_SEARCHED_FAIL,
  GET_PRODUCTS_SEARCHED_REQUEST,
  GET_PRODUCTS_SEARCHED_SUCCESS,
  GET_TOP_RATED_PRODUCTS_FAIL,
  GET_TOP_RATED_PRODUCTS_REQUEST,
  GET_TOP_RATED_PRODUCTS_SUCCESS,
  GET_PRICES_FAIL,
  POST_PRICE_REQUEST,
  POST_PRICE_SUCCESS,
  POST_PRICE_FAIL,
  DELETE_PRICE_REQUEST,
  DELETE_PRICE_SUCCESS,
  DELETE_PRICE_FAIL,
  DELETE_ALL_PRICE_SUCCESS,
  DELETE_ALL_PRICE_REQUEST,
  DELETE_ALL_PRICE_FAIL,
  GET_PRODUCT_BYID_REQUEST,
  GET_PRODUCT_BYID_SUCCESS,
  GET_PRODUCT_BYID_FAIL,
  REMOVE_FROM_WISHLIST_REQUEST,
  REMOVE_FROM_WISHLIST_SUCCESS,
  GET_MOST_DOWNLOADED_PRODUCTS_REQUEST,
  GET_MOST_DOWNLOADED_PRODUCTS_SUCCESS,
  GET_MOST_DOWNLOADED_PRODUCTS_FAIL,
  GET_YOUNGEST_PRODUCTS_REQUEST,
  GET_YOUNGEST_PRODUCTS_SUCCESS,
  GET_YOUNGEST_PRODUCTS_FAIL,
  GET_OLDEST_PRODUCTS_REQUEST,
  GET_OLDEST_PRODUCTS_SUCCESS,
  GET_OLDEST_PRODUCTS_FAIL
} from "../constants/gamesConstants";

import { AccessConfig } from "../components/AccessConfig";

export const getTopRatedProductsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_TOP_RATED_PRODUCTS_REQUEST,
    });
    const response = await axios.get("/api/games/getTopRatedGames/");

    dispatch({
      type: GET_TOP_RATED_PRODUCTS_SUCCESS,
      payload: response.data.data,
    });
  } catch (e) {
    dispatch({
      type: GET_TOP_RATED_PRODUCTS_FAIL,
      payload: e,
    });
  }
};

export const getMostDownloadedProductsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_MOST_DOWNLOADED_PRODUCTS_REQUEST,
    });
    const response = await axios.get("/api/games/getMostDownloadedGames/");

    dispatch({
      type: GET_MOST_DOWNLOADED_PRODUCTS_SUCCESS,
      payload: response.data.data,
    });
  } catch (e) {
    dispatch({
      type: GET_MOST_DOWNLOADED_PRODUCTS_FAIL,
      payload: e,
    });
  }
};

export const getYoungestProductsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_YOUNGEST_PRODUCTS_REQUEST,
    });
    const response = await axios.get("/api/games/getYoungestGames/");

    dispatch({
      type: GET_YOUNGEST_PRODUCTS_SUCCESS,
      payload: response.data.data,
    });
  } catch (e) {
    dispatch({
      type: GET_YOUNGEST_PRODUCTS_FAIL,
      payload: e,
    });
  }
};

export const getOldestProductsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_OLDEST_PRODUCTS_REQUEST,
    });
    const response = await axios.get("/api/games/getOldestGames/");

    dispatch({
      type: GET_OLDEST_PRODUCTS_SUCCESS,
      payload: response.data.data,
    });
  } catch (e) {
    dispatch({
      type: GET_OLDEST_PRODUCTS_FAIL,
      payload: e,
    });
  }
};

export const getSearchedProduct =
  (keyword = "", page = 1) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_PRODUCTS_SEARCHED_REQUEST,
      });

      const response = await axios.get(
        `/api/games/search/?keyword=${keyword}&page=${page}`
      );
      const reducerData = {
        products: response.data.data,
        pages: response.data.pages,
      };

      dispatch({
        type: GET_PRODUCTS_SEARCHED_SUCCESS,
        payload: reducerData,
      });
    } catch (e) {
      dispatch({
        type: GET_PRODUCTS_SEARCHED_FAIL,
        payload: e,
      });
    }
  };

export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_BYID_REQUEST });
    const response = await axios.get(`http://127.0.0.1:8000/api/games/${id}`);

    console.log(response.data.data);
    dispatch({
      type: GET_PRODUCT_BYID_SUCCESS,
      payload: response.data.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: GET_PRODUCT_BYID_FAIL,
      payload: e,
    });
  }
};

export const getPrices = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRICES_REQUEST,
    });

    const response = await axios.get("api/payments/");

    let array = [];

    for (let i = 2; i < response.data.data.length; i += 3) {
      let miniarray = [];
      miniarray.push(response.data.data[i - 2]);
      miniarray.push(response.data.data[i - 1]);
      miniarray.push(response.data.data[i]);

      array.push(miniarray);
    }
    let length = response.data.data.length;
    if (length % 3 === 1) {
      let miniarray = [];
      miniarray.push(response.data.data[length - 1]);
      array.push(miniarray);
    } else if (length % 3 === 2) {
      let miniarray = [];
      miniarray.push(response.data.data[length - 2]);
      miniarray.push(response.data.data[length - 1]);

      array.push(miniarray);
    }

    dispatch({
      type: GET_PRICES_SUCCESS,
      payload: array,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: GET_PRICES_FAIL,
      payload: e,
    });
  }
};

export const addPrice =
  ({ money, coins, bonus, priceId }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: POST_PRICE_REQUEST,
      });
      const dataToPost = {
        money,
        coins,
        bonus,
        priceId,
      };

      const response = await axios.post("api/payments/", dataToPost);

      dispatch({
        type: POST_PRICE_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: POST_PRICE_FAIL,
        payload: e,
      });
    }
  };

export const deletePrice = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRICE_REQUEST,
    });

    const response = await axios.delete(`api/payments/${id}`);

    if (response.status === 200) window.location.reload();

    dispatch({
      type: DELETE_PRICE_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: DELETE_PRICE_FAIL,
      payload: e,
    });
  }
};

export const deletePriceWithoutId = () => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ALL_PRICE_REQUEST,
    });

    const response = await axios.delete(`api/payments/`);

    dispatch({
      type: DELETE_ALL_PRICE_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: DELETE_ALL_PRICE_FAIL,
      payload: e,
    });
  }
};

export const addToWishList = (id,userId) => async (dispatch) => {

const userWishListKey = `userWishList_${userId}`;

let userWishList = localStorage.getItem(userWishListKey);

if (!userWishList) {
  localStorage.setItem(userWishListKey, JSON.stringify([id]));
} else {
  userWishList = JSON.parse(userWishList);

  if (!userWishList.some((game) => game === id)) {
    userWishList.push(id);
    localStorage.setItem(userWishListKey, JSON.stringify(userWishList));
  }
}
};

export const deleteFromWishList = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_FROM_WISHLIST_REQUEST,
  });

  let userWishList = localStorage.getItem("userWishList");

  userWishList = JSON.parse(userWishList);
  console.log("userWishList", userWishList, id);
  userWishList = userWishList.filter((game) => parseInt(game) !== id);
  localStorage.setItem("userWishList", JSON.stringify(userWishList));

  dispatch({
    type: REMOVE_FROM_WISHLIST_SUCCESS,
    payload: id,
  });
};
