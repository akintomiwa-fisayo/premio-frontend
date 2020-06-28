import { all } from 'redux-saga/effects';
// import SettingSaga from './setting/saga';

export default function* rootSaga() {
  yield all([
    // SettingSaga(),
  ]);
}
