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

export const openUserDialog = (data) => {
  return {
    type: "OPEN_USER_DIALOG",
    payload: data,
  }
}

export const closeUserDialog = (data) => {
  return {
    type: "CLOSE_USER_DIALOG",
    payload: data,
  }
}

export const openEditDialog = (data) => {
  return {
    type: "OPEN_EDIT_DIALOG",
    payload: data,
  }
}

export const closeEditDialog = (data) => {
  return {
    type: "CLOSE_EDIT_DIALOG",
    payload: data,
  }
}

const appReducer = (
  state = {
    isOpenCreateDialog: false,
    isOpenUserDialog: false,
    isOpenEditDialog: false
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
        case "OPEN_USER_DIALOG": {
      return {
        ...state,
        isOpenUserDialog: true,
      }
    }
    case "CLOSE_USER_DIALOG": {
      return {
        ...state,
        isOpenUserDialog: false,
      }
    }
    case "OPEN_EDIT_DIALOG": {
      return {
        ...state,
        isOpenEditDialog: true,
      }
    }
    case "CLOSE_EDIT_DIALOG": {
      return {
        ...state,
        isOpenEditDialog: false,
      }
    }
    default:
      return state;
  }
};

export default appReducer;
