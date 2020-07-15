import {call, put, takeEvery} from 'redux-saga/effects';
import {signIn, signUp} from '../routines/authRoutines';
import {signInRequest, signUpRequest} from '../../utils/auth';

export function* signInWatcherSaga() {
  yield takeEvery(signIn.TRIGGER, signInFlow);
}

export function* signUpWatcherSaga() {
  yield takeEvery(signUp.TRIGGER, signUpFlow);
}

function* signInFlow({payload}) {
  try {
    yield put(signIn.request());
    const response = yield call(signInRequest, payload);
    yield put(signIn.success(response));
  } catch (error) {
    yield put(signIn.failure(error.message));
  } finally {
    yield put(signIn.fulfill());
  }
}

function* signUpFlow({payload}) {
  try {
    yield put(signUp.request());
    const response = yield call(signUpRequest, payload);
    yield put(signUp.success(response));
  } catch (error) {
    yield put(signUp.failure(error.message));
  } finally {
    yield put(signUp.fulfill());
  }
}
