import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";
import {
  fetchBusesRequest, fetchBusesSuccess, fetchBusesFailure,
  fetchBookingsRequest, fetchBookingsSuccess, fetchBookingsFailure,
  bookTicketRequest, bookTicketSuccess, bookTicketFailure,
  cancelTicketRequest, cancelTicketSuccess, cancelTicketFailure
} from "./busSlice";

const API_URL = "http://localhost:5000";

function* fetchBusesSaga() {
  try {
    const res = yield call(axios.get, `${API_URL}/buses`);
    yield put(fetchBusesSuccess(res.data));
  } catch (err) {
    yield put(fetchBusesFailure(err.message));
  }
}

function* fetchBookingsSaga() {
  try {
    const res = yield call(axios.get, `${API_URL}/bookings`);
    yield put(fetchBookingsSuccess(res.data));
  } catch (err) {
    yield put(fetchBookingsFailure(err.message));
  }
}

function* bookTicketSaga(action) {
  try {
    yield call(axios.post, `${API_URL}/book`, action.payload);
    yield put(bookTicketSuccess());
    yield put(fetchBusesRequest());
    yield put(fetchBookingsRequest());
  } catch (err) {
    yield put(bookTicketFailure(err.response?.data?.error || err.message));
  }
}

function* cancelTicketSaga(action) {
  try {
    yield call(axios.post, `${API_URL}/cancel`, action.payload);
    yield put(cancelTicketSuccess());
    yield put(fetchBusesRequest());
    yield put(fetchBookingsRequest());
  } catch (err) {
    yield put(cancelTicketFailure(err.response?.data?.error || err.message));
  }
}

export default function* busSaga() {
  yield all([
    takeLatest(fetchBusesRequest.type, fetchBusesSaga),
    takeLatest(fetchBookingsRequest.type, fetchBookingsSaga),
    takeLatest(bookTicketRequest.type, bookTicketSaga),
    takeLatest(cancelTicketRequest.type, cancelTicketSaga)
  ]);
}
