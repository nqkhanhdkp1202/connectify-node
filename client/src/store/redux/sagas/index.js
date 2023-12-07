import { all } from "redux-saga/effects";
import appSaga from "./appSaga";

function* watchAll() {
  yield all([
    appSaga()
  ]);
}

export default watchAll;
