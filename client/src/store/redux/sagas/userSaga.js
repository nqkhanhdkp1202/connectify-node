import { call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";
import {
  getUserInfoFail,
  loginFail,
  loginSuccess,
  logoutSuccess,
  registerFail,
  registerSuccess,
} from "../reducers/userReducer";
import UserService from "../services/userService";

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
    const res = yield call(userService.userInfo());
    console.log(res);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      console.log(res);
    } else {
      yield put(getUserInfoFail());
      toast.error(res?.message);
    }
  } catch (error) {
    toast.error(error);
    yield put(getUserInfoFail());
  }
}

function* logoutSaga(dataRequest) {
  localStorage.removeItem("token");
  yield put(logoutSuccess());
}

function* userSaga() {
  yield takeEvery("LOGIN_READY", loginSaga);
  yield takeEvery("LOGOUT_READY", logoutSaga);
  yield takeEvery("REGISTER_READY", registerSaga);
  yield takeEvery("GET_USER_INFO_READY", getUserInfoSaga);
}

export default userSaga;
