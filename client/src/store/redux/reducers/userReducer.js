import { REHYDRATE } from "redux-persist";

export const loginReady = (data) => {
  return {
    type: "LOGIN_READY",
    payload: data,
  };
};

export const loginSuccess = (data) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: data,
  };
};

export const loginFail = (data) => {
  return {
    type: "LOGIN_FAIL",
    payload: data,
  };
};

export const registerReady = (data) => {
  return {
    type: "REGISTER_READY",
    payload: data,
  };
};

export const registerSuccess = (data) => {
  return {
    type: "REGISTER_SUCCESS",
    payload: data,
  };
};

export const registerFail = (data) => {
  return {
    type: "REGISTER_FAIL",
    payload: data,
  };
};

export const logoutReady = (data) => {
  return {
    type: "LOGOUT_READY",
    payload: data,
  };
};

export const logoutFail = (data) => {
  return {
    type: "LOGOUT_FAIL",
    payload: data,
  };
};

export const logoutSuccess = (data) => {
  return {
    type: "LOGOUT_SUCCESS",
    payload: data,
  };
};

export const getUserInfoReady = (data) => {
  return {
    type: "GET_USER_INFO_READY",
    payload: data,
  };
};

export const getUserInfoFail = (data) => {
  return {
    type: "GET_USER_INFO_FAIL",
    payload: data,
  };
};

export const getUserInfoSuccess = (data) => {
  return {
    type: "GET_USER_INFO_SUCCESS",
    payload: data,
  };
};

const userReducer = (
  state = {
    token: "",
    user: {},
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case REHYDRATE: {
      const { userReducer } = payload || {};
      const { token } = userReducer || "";
      return { ...state, token: token || "" };
    }
    case "LOGIN_READY":
      return {
        ...state,
        isLogin: true,
      };
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        token: payload,
        isLogin: false,
      };
    }
    case "LOGIN_FAIL":
      return {
        ...state,
        isLogin: false,
      };
    case "GET_USER_INFO_READY":
      return {
        ...state,
        isGetInfoUser: true,
      };
    case "GET_USER_INFO_SUCCESS":
      return {
        ...state,
        isGetInfoUser: false,
        uPack: payload?.uPack || null,
        listJoinedTour: payload?.listJoinTour || [],
        countTicket: payload?.countTicket || 0,
        userAvatar: payload?.avatar || "",
        isFullInfo: payload?.checkFullInfor,
        user: {
          ...payload.user,
        },
      };
    case "GET_USER_INFO_FAIL":
      return {
        ...state,
        isGetInfoUser: false,
      };
    case "REGISTER_READY":
      return {
        ...state,
        isRegister: true,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isRegister: false,  
        typeVerifyOTP: "register",
      };
    case "REGISTER_FAIL":
      return {
        ...state,
        isRegister: false,
      };
    case "REMOVE_TOKEN_USER":
      return { ...state, tokenUser: "" };
    case "REGISTER_SUCCESS_FULLY":
      return { ...state, registerValue: payload };
    case "UPDATE_PROFILE_USER":
      return { ...state, isUpdateProfile: true };
    case "UPDATE_PROFILE_USER_SUCCESS":
      return {
        ...state,
        isUpdateProfile: false,
        userAvatar: payload?.avatar,
        isFullInfo: payload?.checkFullInfor,
        user: { ...state.user, userNickName: payload?.nickName },
      };
    case "UPDATE_PROFILE_USER_FAIL":
      return { ...state, isUpdateProfile: false };
    case "LOG_OUT_READY":
      return {
        ...state,
        isLogout: true,
      };
    case "LOG_OUT_SUCCESS":
      return {
        ...state,
        isLogout: false,
        user: {},
        uPack: null,
        listJoinedTour: [],
        countTicket: 0,
        tokenUser: "",
        userAvatar: "",
      };
    case "LOG_OUT_FAIL":
      return {
        ...state,
        isLogout: false,
      };
    case "GET_MY_INFOR":
      return { ...state, isGetMyInfo: true };
    case "GET_MY_INFOR_SUCCESS":
      return { ...state, isGetMyInfo: false };
    case "GET_MY_INFOR_FAIL":
      return { ...state, isGetMyInfo: false };
    default:
      return state;
  }
};

export default userReducer;
