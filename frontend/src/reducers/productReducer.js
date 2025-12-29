import {
  ADD_TO_WISH_LIST_REQUEST,
  ADD_TO_WISH_LIST_SUCCESS,
  DELETE_ALL_PRICE_FAIL,
  DELETE_ALL_PRICE_REQUEST,
  DELETE_ALL_PRICE_SUCCESS,
  DELETE_PRICE_FAIL,
  DELETE_PRICE_REQUEST,
  DELETE_PRICE_SUCCESS,
  GET_PRICES_FAIL,
  GET_PRICES_REQUEST,
  GET_PRICES_SUCCESS,
  GET_PRODUCTS_SEARCHED_FAIL,
  GET_PRODUCTS_SEARCHED_REQUEST,
  GET_PRODUCTS_SEARCHED_SUCCESS,
  GET_PRODUCT_BYID_FAIL,
  GET_PRODUCT_BYID_REQUEST,
  GET_PRODUCT_BYID_SUCCESS,
  GET_TOP_RATED_PRODUCTS_FAIL,
  GET_TOP_RATED_PRODUCTS_REQUEST,
  GET_TOP_RATED_PRODUCTS_SUCCESS,
  POST_PRICE_FAIL,
  POST_PRICE_REQUEST,
  POST_PRICE_SUCCESS,
  UPDATE_USER_PREFERENCES_FAIL,
  UPDATE_USER_PREFERENCES_REQUEST,
  UPDATE_USER_PREFERENCES_SUCCESS,
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

export const getTopRatedProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TOP_RATED_PRODUCTS_REQUEST:
      return { loading: true, error: false };
    case GET_TOP_RATED_PRODUCTS_SUCCESS:
      return { loading: false, error: false, games: action.payload };
    case GET_TOP_RATED_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getMostDownloadedProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MOST_DOWNLOADED_PRODUCTS_REQUEST:
      return { loading: true, error: false };
    case GET_MOST_DOWNLOADED_PRODUCTS_SUCCESS:
      return { loading: false, error: false, games: action.payload };
    case GET_MOST_DOWNLOADED_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getYoungestProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_YOUNGEST_PRODUCTS_REQUEST:
      return { loading: true, error: false };
    case GET_YOUNGEST_PRODUCTS_SUCCESS:
      return { loading: false, error: false, games: action.payload };
    case GET_YOUNGEST_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getOldestProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_OLDEST_PRODUCTS_REQUEST:
      return { loading: true, error: false };
    case GET_OLDEST_PRODUCTS_SUCCESS:
      return { loading: false, error: false, games: action.payload };
    case GET_OLDEST_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getProductByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_BYID_REQUEST:
      return { loading: true, error: false };
    case GET_PRODUCT_BYID_SUCCESS:
      return { loading: false, error: false, game: action.payload };
    case GET_PRODUCT_BYID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSearchedProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SEARCHED_REQUEST:
      return { loading: true, error: false };

    case GET_PRODUCTS_SEARCHED_SUCCESS:
      return {
        loading: false,
        error: false,
        games: action.payload,
        pages: action.pages,
      };

    case GET_PRODUCTS_SEARCHED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPricesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRICES_REQUEST:
      return { loading: true, error: false };

    case GET_PRICES_SUCCESS:
      return { loading: false, error: false, data: action.payload };

    case GET_PRICES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const addPriceReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_PRICE_REQUEST:
      return { loading: true, error: false };

    case POST_PRICE_SUCCESS:
      return { loading: false, error: false, data: action.payload };

    case POST_PRICE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const deletePriceReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRICE_REQUEST:
      return { loading: true, error: false };

    case DELETE_PRICE_SUCCESS:
      return { loading: false, error: false, data: action.payload };

    case DELETE_PRICE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const deletePriceWithoutReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ALL_PRICE_REQUEST:
      return { loading: true, error: false };

    case DELETE_ALL_PRICE_SUCCESS:
      return { loading: false, error: false, data: action.payload };

    case DELETE_ALL_PRICE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const addToWishListReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_WISH_LIST_REQUEST:
      return { loading: true, error: false };

    case ADD_TO_WISH_LIST_SUCCESS:
      return { loading: false, error: false, data: "success" };

    default:
      return state;
  }
};

export const updateUserPreferencesReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_PREFERENCES_REQUEST:
      return { loading: true, error: false };

    case UPDATE_USER_PREFERENCES_SUCCESS:
      return { loading: false, error: false, data: action.payload };

    case UPDATE_USER_PREFERENCES_FAIL:
      return { loading: false, error: true, data: action.payload };

    default:
      return state;
  }
};
