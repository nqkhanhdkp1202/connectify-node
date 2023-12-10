import { call, put, takeEvery } from "redux-saga/effects";
import PostService from "../services/postService";
import { createPostFail, createPostSuccess, getListPostFail, getListPostSuccess } from "../reducers/postReducer";
import { toast } from 'react-toastify';
const postService = new PostService();

function* getListPost(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(postService.getAllPost, payload);
    if (res.status === 200) {
      yield put(getListPostSuccess(res?.data));
    } else {
      yield put(getListPostFail());
    }
  } catch (error) {
    toast.error(error);
    yield put(getListPostFail());
  }
}

function* createPostSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(postService.createPost, payload);
    if (res.status === 200) {
      yield put(createPostSuccess(res?.data));
      toast.success("Thêm bài viết thành công");
      window.location.reload();
    } else {
      yield put(createPostFail());
    }
  } catch (error) {
    toast.error(error);
    yield put(createPostFail());
  }
}

function* postSaga() {
  yield takeEvery("GET_LIST_POST_READY", getListPost);
  yield takeEvery("CREATE_POST_READY", createPostSaga);
}
export default postSaga;
