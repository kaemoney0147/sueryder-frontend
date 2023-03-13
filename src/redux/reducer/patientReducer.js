import {
  LOGIN_REQUEST,
  SET_ACCESS_TOKEN,
  USER_STATUS,
  LOGOUT_USER,
  DELETE_ACCESS_TOKEN,
} from "../actions/index.js";

const initialState = {
  userInfo: {
    _id: "",
    username: "",
    avatar: "",
  },
  accessToken: {
    token: null,
  },
  loginStatus: {
    status: null,
  },
  currentUser: {
    userSignIn: null,
  },
};

export const getListOfPatient = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        userInfo: action.payload,
      };
    }
    case SET_ACCESS_TOKEN: {
      return {
        ...state,
        accessToken: action.payload,
      };
    }
    case USER_STATUS: {
      return {
        ...state,
        loginStatus: action.payload,
      };
    }
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case DELETE_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    default:
      return state;
  }
};
