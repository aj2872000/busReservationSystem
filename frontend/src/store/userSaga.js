import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  checkOrCreateUserRequest,
  checkOrCreateUserSuccess,
  checkOrCreateUserFailure
} from './userSlice';

function* checkOrCreateUserSaga(action) {
  try {
    const response = yield call(axios.post, 'http://localhost:5000/user', action.payload);
    yield put(checkOrCreateUserSuccess(response.data));
  } catch (error) {
    yield put(checkOrCreateUserFailure(error.message));
  }
}

export default function* userRootSaga() {
  yield takeLatest(checkOrCreateUserRequest.type, checkOrCreateUserSaga);
}
