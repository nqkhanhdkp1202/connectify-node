import { REHYDRATE } from "redux-persist";

export const openCreateDialog = (data) => {
  return {
    type: "OPEN_CREATE_DIALOG",
    payload: data,
  }
}

export const closeCreateDialog = (data) => {
  return {
    type: "CLOSE_CREATE_DIALOG",
    payload: data,
  }
}

const appReducer = (
  state = {
    isOpenCreateDialog: false
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case REHYDRATE:
      {
        return { ...state }
      }
    case "OPEN_CREATE_DIALOG": {
      return {
        ...state,
        isOpenCreateDialog: true,
      }
    }
    case "CLOSE_CREATE_DIALOG": {
      return {
        ...state,
        isOpenCreateDialog: false,
      }
    }
    default:
      return state;
  }
};

export default appReducer;
