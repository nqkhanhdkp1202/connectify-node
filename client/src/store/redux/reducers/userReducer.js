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

export const getListUserReady = (data) => {
  return {
    type: "GET_LIST_USER_READY",
    payload: data,
  };
};

export const getListUserFail = (data) => {
  return {
    type: "GET_LIST_USER_FAIL",
    payload: data,
  };
};

export const getListUserSuccess = (data) => {
  return {
    type: "GET_LIST_USER_SUCCESS",
    payload: data,
  };
};

export const editProfileReady = (data) => {
  return {
    type: "EDIT_PROFILE_READY",
    payload: data,
  };
};

export const editProfileFail = (data) => {
  return {
    type: "EDIT_PROFILE_FAIL",
    payload: data,
  };
};

export const editProfileSuccess = (data) => {
  return {
    type: "EDIT_PROFILE_SUCCESS",
    payload: data,
  };
};

export const addFriendReady = (data) => {
  return {
    type: "ADD_FRIEND_READY",
    payload: data,
  };
};

export const addFriendSuccess = (data) => {
  return {
    type: "ADD_FRIEND_SUCCESS",
    payload: data,
  };
};

export const addFriendFail = (data) => {
  return {
    type: "ADD_FRIEND_FAIL",
    payload: data,
  };
};

const userReducer = (
  state = {
    token: "",
    user: {},
    isLogin: false,
    isFetchListUser: false,
    listUser: [],
    isEditProfile: false,
    isAddFriend: false,
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case REHYDRATE: {
      const { userReducer } = payload || {};
      const { token, user } = userReducer || "";
      return { ...state, token: token || "", user: user };
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
        user: { ...payload },
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
    case "GET_LIST_USER_READY": {
      return {
        ...state,
        isFetchListUser: true,
      };
    }
    case "GET_LIST_USER_SUCCESS": {
      return {
        ...state,
        isFetchListUser: false,
        listUser: payload,
      };
    }
    case "GET_LIST_USER_FAIL": {
      return {
        ...state,
        isFetchListUser: false,
      };
    }
    case "EDIT_PROFILE_READY": {
      return {
        ...state,
        isEditProfile: true,
      };
    }
    case "EDIT_PROFILE_SUCCESS": {
      return {
        ...state,
        isEditProfile: false,
      };
    }
    case "EDIT_PROFILE_FAIL": {
      return {
        ...state,
        isEditProfile: false,
      };
    }
    case "ADD_FRIEND_READY": {
      return {
        ...state,
        isAddFriend: true,
      };
    }
    case "ADD_FRIEND_SUCCESS": {
      return {
        ...state,
        isAddFriend: false,
      };
    }
    case "ADD_FRIEND_FAIL": {
      return {
        ...state,
        isAddFriend: false,
      };
    }
    case "LOG_OUT_SUCCESS": {
      return {
        ...state,
        user: {},
      };
    }
    default:
      return state;
  }
};

export default userReducer;
