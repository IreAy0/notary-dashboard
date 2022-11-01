/* eslint-disable object-curly-newline */
import { put, takeEvery, call } from 'redux-saga/effects';
import API from 'const/api';
import {
  SET_GENERAL_NOTIFICATIONS,
  FETCH_GENERAL_NOTIFICATIONS
} from './notifications.types';
import api from '../../services/api';

function* fetchGeneralNotifications(action: any): any {
  let url = `${API.NOTIFICATIONS}?`;

  if (action.payload && Object.keys(action.payload).length) {
    const { page, perPage } = action?.payload;
    url = page ? (url += `page=${page}&`) : url;
    url = perPage ? (url += `per_page=${perPage}&`) : url;
  }

  try {
    const { cb } = action;
    const res: any = yield call(() => api.get(url));

    if (res.status === 200) {
      yield put({ type: SET_GENERAL_NOTIFICATIONS, payload: res.data.data });
      cb();
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}



function* watchNotificationsSaga() {
  yield takeEvery(FETCH_GENERAL_NOTIFICATIONS, fetchGeneralNotifications);
}

export default watchNotificationsSaga;
