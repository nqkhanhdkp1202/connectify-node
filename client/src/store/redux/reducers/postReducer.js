
export const getListPostReady = (data) => {
  return {
    type: "GET_LIST_POST_READY",
    payload: data,
  };
};

export const getListPostSuccess = (data) => {
  return {
    type: "GET_LIST_POST_SUCCESS",
    payload: data,
  };
};

export const getListPostFail = (data) => {
  return {
    type: "GET_LIST_POST_FAIL",
    payload: data,
  };
};

export const createPostSuccess = (data) => {
  return {
    type: "CREATE_POST_SUCCESS",
    payload: data,
  };
};

export const createPostReady = (data) => {
  return {
    type: "CREATE_POST_READY",
    payload: data,
  };
};

export const createPostFail = (data) => {
  return {
    type: "CREATE_POST_FAIL",
    payload: data,
  };
};

export const likePostSuccess = (data) => {
  return {
    type: "LIKE_POST_SUCCESS",
    payload: data,
  };
};

export const likePostReady = (data) => {
  return {
    type: "LIKE_POST_READY",
    payload: data,
  };
};

export const likePostFail = (data) => {
  return {
    type: "LIKE_POST_FAIL",
    payload: data,
  };
};

export const commentPostSuccess = (data) => {
  return {
    type: "COMMENT_POST_SUCCESS",
    payload: data,
  };
};

export const commentPostReady = (data) => {
  return {
    type: "COMMENT_POST_READY",
    payload: data,
  };
};

export const commentPostFail = (data) => {
  return {
    type: "COMMENT_POST_FAIL",
    payload: data,
  };
};

const postReducer = (
  state = {
    isFetchingPost:false,
    listPost:[],
    isCreatePost: false,
    isLikePost: false,
    isCommentPost: false
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_LIST_POST_READY":{
      return {
        ...state,
        isFetchingPost:true,
      }
    }
    case "GET_LIST_POST_SUCCESS":{
      return {
        ...state,
        isFetchingPost:false,
        listPost:payload
      }
    }
    case "GET_LIST_POST_FAIL":{
      return {
        ...state,
        isFetchingPost:false,
      }
    }
    case "CREATE_POST_READY":{
      return {
        ...state,
        isCreatePost:true,
      }
    }
    case "CREATE_POST_SUCCESS":{
      return {
        ...state,
        isCreatePost:false,
      }
    }
    case "CREATE_POST_FAIL":{
      return {
        ...state,
        isCreatePost:false,
      }
    }
    case "LIKE_POST_READY":{
      return {
        ...state,
        isLikePost:true,
      }
    }
    case "LIKE_POST_SUCCESS":{
      return {
        ...state,
        isLikePost:false,
      }
    }
    case "LIKE_POST_FAIL":{
      return {
        ...state,
        isLikePost:false,
      }
    }
    case "COMMENT_POST_READY":{
      return {
        ...state,
        isCommentPost:true,
      }
    }
    case "COMMENT_POST_SUCCESS":{
      return {
        ...state,
        isCommentPost:false,
      }
    }
    case "COMMENT_POST_FAIL":{
      return {
        ...state,
        isCommentPost:false,
      }
    }
    default:
      return { ...state };
  }
};
export default postReducer;
