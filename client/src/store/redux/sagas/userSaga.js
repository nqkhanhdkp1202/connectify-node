import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";
import {
  addFriendFail,
  addFriendSuccess,
  editProfileFail,
  editProfileSuccess,
  getListUserFail,
  getListUserSuccess,
  getUserInfoFail,
  getUserInfoReady,
  getUserInfoSuccess,
  loginFail,
  loginSuccess,
  logoutSuccess,
  registerFail,
  registerSuccess,
} from "../reducers/userReducer";
import UserService from "../services/userService";
import { closeEditDialog } from "../reducers/appReducer";
import { push } from "connected-react-router";

const userService = new UserService();

function* loginSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.login, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(loginSuccess(data?.token));
      localStorage.setItem("token", data?.token);
      toast.success("Đăng nhập thành công!");
      yield put(getUserInfoReady());
      yield put(push("/"))
    } else {
      toast.error("Something went wrong!");
      yield put(loginFail());
    }
  } catch (error) {
    toast.error(error);
    yield put(loginFail());
  }
}

function* registerSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.register, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(registerSuccess(data?.data));
      localStorage.setItem("token", data?.token);
      toast.success("Đăng kí thành công, vui lòng đăng nhập!");
      yield put(getUserInfoReady());
      yield put(push("/login"));
    } else {
      toast.error(res?.message);
      yield put(registerFail());
    }
  } catch (error) {
    toast.error(error);
    yield put(registerFail());
  }
}

function* getUserInfoSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.userInfo);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(getUserInfoSuccess(res?.data));
    } else {
      yield put(getUserInfoFail());
      toast.error(res?.message);
    }
  } catch (error) {
    toast.error(error);
    yield put(getUserInfoFail());
  }
}

function* getListUserSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.getListUser);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(getListUserSuccess(res?.data));
    } else {
      yield put(getListUserSuccess());
      toast.error(res?.message);
    }
  } catch (error) {
    toast.error(error);
    yield put(getListUserFail());
  }
}

function* editProfileSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.editProfile, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(editProfileSuccess(res?.data));
      toast.success("Cập nhật thông tin thành công");
      yield put(getUserInfoReady());
      yield put(closeEditDialog());
      window.location.reload();
    } else {
      yield put(editProfileFail());
      toast.error(res?.message);
    }
  } catch (error) {
    toast.error(error);
    yield put(editProfileFail());
  }
}

function* addFriendSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.addFriend, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(addFriendSuccess(res?.data));
      toast.success("Kết bạn thành công");
      yield put(getListUserReady());
    } else {
      yield put(addFriendFail());
      toast.error(res?.message);
    }
  } catch (error) {
    toast.error(error);
    yield put(addFriendFail());
  }
}

function* logoutSaga(dataRequest) {
  localStorage.removeItem("token");
  toast.success("Đăng xuất thành công!");
  yield put(logoutSuccess());
}

function* userSaga() {
  yield takeEvery("LOGIN_READY", loginSaga);
  yield takeEvery("LOGOUT_READY", logoutSaga);
  yield takeEvery("REGISTER_READY", registerSaga);
  yield takeEvery("GET_USER_INFO_READY", getUserInfoSaga);
  yield takeEvery("GET_LIST_USER_READY", getListUserSaga);
  yield takeEvery("EDIT_PROFILE_READY", editProfileSaga);
  yield takeEvery("ADD_FRIEND_READY", addFriendSaga);
}

export default userSaga;
