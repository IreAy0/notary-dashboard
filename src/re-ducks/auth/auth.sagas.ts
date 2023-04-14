/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
import { API } from 'const';
import { put, takeEvery, call } from 'redux-saga/effects';
import { saveToken } from 'utils/getToken';
import queryFormatter from 'utils/queryFormatter';
import {
  DO_SIGNIN,
  DO_SIGNUP,
  SET_SIGNIN_DATA,
  DO_RESET_PASSWORD,
  DO_SET_PASSWORD,
  DO_FORGET_PASSWORD,
  DO_SIGNOUT,
  RESET_AUTH_STATE,
  DO_COMPLETE_PROFILE,
  DO_RE_SEND_EMAIL,
  DO_VERIFY_NOTIFY_ID,
  DO_CHANGE_PASSWORD,
  DO_REFRESH_TOKEN,
  SET_REFRESH_TOKEN
} from './auth.types';
import api from '../../services/api';
import axios from '../../services/axios';

function* doSignIn(action: any): any {
  try {
    const { payload: data, cb } = action;
    const res: any = yield call(() => api.post(API.SIGNIN, data));
    
    if (res.status === 200) {
     
      localStorage.setItem('accessToken', res.data.token);
      saveToken(res.data.token);
      window.location.reload();
      axios.defaults.headers.Authorization = res.data.token;
      localStorage.setItem('accessToken', res.data.token);
      yield put({ type: SET_SIGNIN_DATA, payload: res.data });
      cb(res.data);
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data.errors.root || 'Incorrect email or password';
    cbError(alert);
  }
}

function* doRefreshToken(action: any): any {
  const { payload: data, cb } = action;
  try {
    const res: any = yield call(() => api.get(`${API.REFRESH_TOKEN}?${queryFormatter(data?.params)}`));

    if (res.status === 200) {
      localStorage.setItem('accessToken', res.data.data.refresh_token);
      window.location.reload();
      axios.defaults.headers.common.Authorization = res.data.data.refresh_token;
      yield put({ type: SET_REFRESH_TOKEN, payload: res.data.data });
      cb(res.data.data);
    }
  } catch (err: any) {    
    const { cbError } = action;
    // const alert = err?.response?.data || '';
    cbError(err);
  }
}

function* doSignUp(action: any): any {
  const { payload: data, cb, cbError } = action;
  const url = API.SIGNUP;
  try {
    const res = yield call(() => api.post(url, data));
    if (res.status === 200) {
      // remove eventually
      // saveToken(res.data.token);
      cb();
    }
  } catch (err: any) {
    cbError(err?.response?.data?.message);
  }
}

function* doReSetPassword(action: any): any {
  try {
    const { payload, cb } = action;
    const { password, password_confirmation, token, email  } = payload;
    const res = yield call(() => api.post(API.RESET_PASSWORD, { password, password_confirmation, token, email }));
    if (res.status === 200) {
      cb(res);
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* doSetPassword(action: any): any {
  try {
    const { payload, cb } = action;
    const { password, token } = payload;
    const res = yield call(() => api.put(`${API.SET_PASSWORD}?token=${token}`, { password }));
    if (res.status === 201) {
      cb(res);
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* doForgetPass(action: any): any {
  try {
    const { payload: data, cb } = action;
    const res: any = yield call(() => api.post(API.FORGOT_PASS_SEND_EMAIL, data));
    if (res.status === 200) {
      yield put({ type: DO_FORGET_PASSWORD, payload: res.data.data });
      const alert = res.data.data.message
      cb(alert);
    }
  } catch (err: any) {
    if(err.response.status === 422){
      const { cbError } = action;
      const alert = 'Email doesn`t exist, Please check and try again'  || '';
      cbError(alert);
    }
  }
}
function* doVerifyNotaryId(action: any): any {
  try {
    const { payload: data, cb } = action;
    const res: any = yield call(() => api.post(API.VERIFY_NOTARY_ID, data));
    if (res.status === 200) {
      yield put({ type: DO_VERIFY_NOTIFY_ID, payload: res.data.data });
      cb();
    }
  } catch (err: any) {
    const { cbError } = action;
    cbError(err);
  }
}

function* doReSendEmail(action: any): any {
  try {
    const { payload: data, cb } = action;
    const res = yield call(() => api.post(API.RE_SEND_EMAIL, data));
    if (res.status === 200) {
      cb();
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* doCompleteProfile(action: any): any {
  const { payload: data, cb, cbError } = action;
  const url = API.COMPLETE_PROFILE;
  try {
    const res = yield call(() => api.put(url, data));

    if (res.status === 200) {
      cb();
    }
  } catch (err) {
    cbError(err);
  }
}

function* doSignOut(action: any): any {
  try {
    const { isWithRequest } = action;
    if (!isWithRequest) {
      yield call(() => api.post(API.SIGNOUT));
    }
  } catch (err: any) {
    // TODO: Handle Error here
  } finally {
    const { cb } = action;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('populated');
    localStorage.removeItem('previouslyPopulated');
    delete axios.defaults.headers.common.Authorization;
    yield put({ type: RESET_AUTH_STATE });
    cb();
  }
}

function* doChangePasswordAction(action: any): any {
  const { payload, cb, cbError } = action;

  try {
    const res = yield call(() => api.post(API.CHANGE_PASSWORD, payload));

    if (res.status === 200) {
      cb();
    }
  } catch (err: any) {
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* watchAuthSaga() {
  yield takeEvery(DO_SIGNIN, doSignIn);
  yield takeEvery(DO_SIGNOUT, doSignOut);
  yield takeEvery(DO_SIGNUP, doSignUp);
  yield takeEvery(DO_RESET_PASSWORD, doReSetPassword);
  yield takeEvery(DO_SET_PASSWORD, doSetPassword);
  yield takeEvery(DO_RE_SEND_EMAIL, doReSendEmail);
  yield takeEvery(DO_FORGET_PASSWORD, doForgetPass);
  yield takeEvery(DO_COMPLETE_PROFILE, doCompleteProfile);
  yield takeEvery(DO_VERIFY_NOTIFY_ID, doVerifyNotaryId);
  yield takeEvery(DO_CHANGE_PASSWORD, doChangePasswordAction);
  yield takeEvery(DO_REFRESH_TOKEN, doRefreshToken);
}

export default watchAuthSaga;

