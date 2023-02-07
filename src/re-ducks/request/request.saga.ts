/* eslint-disable object-curly-newline */
import { API } from 'const';
import { put, takeEvery, call } from 'redux-saga/effects';
import queryFormatter from 'utils/queryFormatter';
import {
  GET_ALL_REQUEST,
  SAVE_ALL_REQUEST,
  CONFIRM_REQUEST,
  GET_REQUEST_DETAILS,
  GET_REQUEST_DOC,
  CANCEL_NOTARY_REQUEST,
  COMPLETE_NOTARY_SESSION,
  GET_SESSION_LINK,
  END_NOTARY_SESSION,
  VERIFY_LOCKER_OTP,
  GET_LOCKER_DETAILS
} from './request.types';
import api from '../../services/api';

function* getAllRequest(action: any): any {
  try {
    const { cb, payload: data } = action;

    const res: any = yield call(() => api.get(`${API.REQUEST}?${queryFormatter(data.params)}`));
    if (res.status === 200) {
      yield put({ type: SAVE_ALL_REQUEST, payload: res.data});
      cb();
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* confirmRequests(action: any): Generator {
  try {
    const { cb, payload } = action;

    const res: any = yield call(() => api.put(`${API.UPDATE_REQUEST}/${payload.id}`, payload?.body));

    if (res.status === 200) {
      cb();
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* fetchRequestDetails(action: any): Generator {
  try {
    const { cb, payload } = action;

    const res: any = yield call(() => api.get(`${API.REQUEST}/${payload.id}`));
    if (res.status === 200) {
      cb(res.data?.data);
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}


function* fetchRequestDocument(action: any): Generator {
  try {
    const { cb, payload } = action;

    const res: any = yield call(() =>
      api.get(
        payload.otp !== ''
          ? `${API.VIEW_REQUEST_DOC}/${payload.id}?otp=${payload.otp}`
          : `${API.VIEW_REQUEST_DOC}/${payload.id}`
      )
    );

    if (res.status === 200) {
      cb(res.data.data);
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* postVerifyLockerOTP(action: any): Generator {
  try {
    const { cb, payload } = action;

    const res: any = yield call(() =>
      api.post('/notary/notary-otp-locker', payload)
    );
    if (res.status === 200) {
      cb(res.data.data);
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.data?.error || '';
    cbError(alert);
  }
}

function* cancelNotaryRequests(action: any): Generator {
  try {
    const { cb, payload } = action;

    const res: any = yield call(() => api.patch(`${API.REQUEST}/cancel/${payload.id}`));

    if (res.status === 200) {
      cb();
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* endNotarySession(action: any): Generator {
  try {
    const { cb, payload } = action;

    const { id, ...data } = payload;

    const res: any = yield call(() => api.put(`${API.END_SESSION}/${id}`, data));

    if (res.status === 200) {
      cb();
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* completeNotarySession(action: any): Generator {
  try {
    const { cb, payload } = action;

    const res: any = yield call(() => api.post(`${API.COMPLETE_SESSION}`, payload));

    if (res.status === 200) {
      cb();
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* fetchSessionLink(action: any): Generator {
  try {
    const { cb, payload: data } = action;
    const res: any = yield call(() => api.get(`${API.GET_SESSION_LINK}${queryFormatter(data)}`));
    if (res.status === 200) {
      cb(res.data.data);
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* watchRequestSaga() {
  yield takeEvery(GET_ALL_REQUEST, getAllRequest);
  yield takeEvery(CONFIRM_REQUEST, confirmRequests);
  yield takeEvery(GET_REQUEST_DETAILS, fetchRequestDetails);
  yield takeEvery(GET_REQUEST_DOC, fetchRequestDocument);
  yield takeEvery(VERIFY_LOCKER_OTP, postVerifyLockerOTP)
  yield takeEvery(CANCEL_NOTARY_REQUEST, cancelNotaryRequests);
  yield takeEvery(END_NOTARY_SESSION, endNotarySession);
  yield takeEvery(COMPLETE_NOTARY_SESSION, completeNotarySession);
  yield takeEvery(GET_SESSION_LINK, fetchSessionLink);
}
export default watchRequestSaga;

