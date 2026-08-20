import {
  GET_USER_BYID_REQUEST,
  GET_USER_BYID_SUCCESS,
  GET_USER_BYID_FAIL,
} from "../constants/usersConstants";

export const getUserReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case GET_USER_BYID_REQUEST:
      return { loading: true, error: false };
    case GET_USER_BYID_SUCCESS:
      return { loading: false, error: false, userDetails: action.payload };
    case GET_USER_BYID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
