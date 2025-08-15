import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import busReducer from "./busSlice";
import busSaga from "./busSaga";
import userRootSaga from "./userSaga"
import userReducer from "./userSlice"
import { all } from 'redux-saga/effects';


const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    busSaga(),
    userRootSaga()
  ]);
}

export const store = configureStore({
  reducer: { bus: busReducer, user: userReducer  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export { Provider };
