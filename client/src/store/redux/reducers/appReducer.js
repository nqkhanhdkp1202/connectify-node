import { REHYDRATE } from "redux-persist";

export const openCreateDialog = (data) => {
  return {
    type: "OPEN_CREATE_DIALOG",
    payload: data,
  };
};

export const closeCreateDialog = (data) => {
  return {
    type: "CLOSE_CREATE_DIALOG",
    payload: data,
  };
};

export const openUserDialog = (data) => {
  return {
    type: "OPEN_USER_DIALOG",
    payload: data,
  };
};

export const closeUserDialog = (data) => {
  return {
    type: "CLOSE_USER_DIALOG",
    payload: data,
  };
};

export const openEditDialog = (data) => {
  return {
    type: "OPEN_EDIT_DIALOG",
    payload: data,
  };
};

export const closeEditDialog = (data) => {
  return {
    type: "CLOSE_EDIT_DIALOG",
    payload: data,
  };
};

export const openLoadDialog = (data) => {
  return {
    type: "OPEN_LOAD_DIALOG",
    payload: data,
  };
};

export const closeLoadDialog = (data) => {
  return {
    type: "CLOSE_LOAD_DIALOG",
    payload: data,
  };
};

export const openLikedDialog = (data) => {
  return {
    type: "OPEN_LIKED_DIALOG",
    payload: data,
  };
};

export const closeLikedDialog = (data) => {
  return {
    type: "CLOSE_LIKED_DIALOG",
    payload: data,
  };
};

export const openCommentDialog = (data) => {
  return {
    type: "OPEN_COMMENT_DIALOG",
    payload: data,
  };
};

export const closeCommentDialog = (data) => {
  return {
    type: "CLOSE_COMMENT_DIALOG",
    payload: data,
  };
};

export const saveListComment = (data) => {
  return {
    type: "SAVE_LIST_COMMENT",
    payload: data,
  };
};

export const clearListComment = (data) => {
  return {
    type: "CLEAR_LIST_COMMENT",
    payload: data,
  };
};


export const saveListUserRender = (data) => {
  return {
    type: "SAVE_LIST_USER_RENDER",
    payload: data,
  };
};

export const clearListUserRender = (data) => {
  return {
    type: "CLEAR_LIST_USER_RENDER",
    payload: data,
  };
};

const appReducer = (
  state = {
    isOpenCreateDialog: false,
    isOpenUserDialog: false,
    isOpenEditDialog: false,
    isOpenLoadDialog: false,
    isOpenLikedDialog: false,
    isOpenCommentDialog: false,
    listComment: [],
    titleListUser: "",
    listUserRender: [],
    idPost: "",
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case REHYDRATE: {
      return { ...state };
    }
    case "OPEN_CREATE_DIALOG": {
      return {
        ...state,
        isOpenCreateDialog: true,
      };
    }
    case "CLOSE_CREATE_DIALOG": {
      return {
        ...state,
        isOpenCreateDialog: false,
      };
    }
    case "OPEN_USER_DIALOG": {
      return {
        ...state,
        isOpenUserDialog: true,
      };
    }
    case "CLOSE_USER_DIALOG": {
      return {
        ...state,
        isOpenUserDialog: false,
      };
    }
    case "OPEN_EDIT_DIALOG": {
      return {
        ...state,
        isOpenEditDialog: true,
      };
    }
    case "CLOSE_EDIT_DIALOG": {
      return {
        ...state,
        isOpenEditDialog: false,
      };
    }
    case "OPEN_LOAD_DIALOG": {
      return {
        ...state,
        isOpenLoadDialog: true,
      };
    }
    case "CLOSE_LOAD_DIALOG": {
      return {
        ...state,
        isOpenLoadDialog: false,
      };
    }
    case "OPEN_LIKED_DIALOG": {
      return {
        ...state,
        isOpenLikedDialog: true,
      };
    }
    case "CLOSE_LIKED_DIALOG": {
      return {
        ...state,
        isOpenLikedDialog: false,
      };
    }
    case "OPEN_COMMENT_DIALOG": {
      return {
        ...state,
        isOpenCommentDialog: true,
      };
    }
    case "CLOSE_COMMENT_DIALOG": {
      return {
        ...state,
        isOpenCommentDialog: false,
      };
    }
    case "SAVE_LIST_COMMENT": {
      return {
        ...state,
        listComment: payload?.listComment,
        idPost: payload?.idPost,
      };
    }
    case "CLEAR_LIST_COMMENT": {
      return {
        ...state,
        listComment: [],
        idPost: ""
      };
    }
    case "SAVE_LIST_USER_RENDER": {
      return {
        ...state,
        listUserRender: [...payload?.listUserRender],
        titleListUser: payload?.titleListUser,
      };
    }
    case "CLEAR_LIST_USER_RENDER": {
      return {
        ...state,
        listUserRender: [],
        titleListUser: "",
      };
    }
    default:
      return state;
  }
};

export default appReducer;
