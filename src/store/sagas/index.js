import {all} from 'redux-saga/effects';
import {signInWatcherSaga, signUpWatcherSaga} from './authSaga';
import {fetchDataWatcherSaga} from './dataSaga';
import {
  fetchColumnWatcherSaga,
  createColumnWatcherSaga,
  removeColumnWatcherSaga,
  changeColumnWatcherSaga,
} from './columnSaga';
import {
  fetchCardWatcherSaga,
  createCardWatcherSaga,
  removeCardWatcherSaga,
  changeCardWatcherSaga,
} from './cardSaga';
import {
  fetchCommentWatcherSaga,
  createCommentWatcherSaga,
  removeCommentWatcherSaga,
} from './commentSaga';

export default function* rootSaga() {
  yield all([
    signInWatcherSaga(),
    signUpWatcherSaga(),
    fetchDataWatcherSaga(),
    fetchColumnWatcherSaga(),
    fetchCardWatcherSaga(),
    fetchCommentWatcherSaga(),
    createColumnWatcherSaga(),
    createCardWatcherSaga(),
    createCommentWatcherSaga(),
    removeColumnWatcherSaga(),
    removeCardWatcherSaga(),
    removeCommentWatcherSaga(),
    changeCardWatcherSaga(),
    changeColumnWatcherSaga(),
  ]);
}
