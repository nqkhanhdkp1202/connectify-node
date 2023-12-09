import { all } from "redux-saga/effects";
import appSaga from "./appSaga";
import userSaga from "./userSaga";

function* watchAll() {
  yield all([
    appSaga(),
    userSaga()
  ]);
}

export default watchAll;
