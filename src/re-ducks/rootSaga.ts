import { all } from 'redux-saga/effects';
import { watchAuthSaga } from './auth';
import { watchNotificationsSaga } from './notifications';
import { watchUserSaga } from './user';
import { watchRequestSaga } from './request';
import { watchLockerSaga } from './locker';
import { watchDocsSaga } from './documents';
import { watchTemplateSaga } from './template';

function* rootSaga() {
  yield all([
    watchAuthSaga(),
    watchUserSaga(),
    watchNotificationsSaga(),
    watchRequestSaga(),
    watchLockerSaga(),
    watchDocsSaga(),
    watchTemplateSaga()
  ]);
}

export default rootSaga;
