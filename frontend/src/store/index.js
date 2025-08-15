import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import busReducer from "./busSlice";
import busSaga from "./busSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { bus: busReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(busSaga);

export { Provider };
