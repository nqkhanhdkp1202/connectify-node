import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appReducer from "../reducers/appReducer";
import userReducer from "../reducers/userReducer";
import postReducer from "../reducers/postReducer";

import rootSaga from "../sagas";
import sagaMiddleware from "./configSaga";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { history } from "../../../utils/history";
let rootReducer = combineReducers({
  router: connectRouter(history),
  appReducer,
  userReducer,
  postReducer
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware,routerMiddleware(history)));
let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

const action = (type) => store.dispatch({ type });

export { action, persistor, store };

