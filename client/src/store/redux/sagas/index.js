import { all } from "redux-saga/effects";
import appSaga from "./appSaga";
import userSaga from "./userSaga";
import postSaga from "./postSaga"

function* watchAll() {
  yield all([
    appSaga(),
    userSaga(),
    postSaga()
  ]);
}

export default watchAll;
