import { takeEvery, call, put } from 'redux-saga/effects';
import queryConcatenator from 'utils/queryConcatenator';
import { API } from 'const';
import queryFormatter from 'utils/queryFormatter';
import { SET_SIGNIN_DATA } from 're-ducks/auth/auth.types';
import { SET_USER_SIG,
  SAVE_USER_SIG_STATE,
  EDIT_USER_SIG,
  FETCH_USER_SIGNATURE, 
  SAVE_USER_PROFILE,
  FETCH_USER_PROFILE, 
  EDIT_USER_PROFILE, 
  UPDATE_USER_STATE, 
  UPDATE_USER_ID_STATE,
  UPDATE_USER_ID, 
  FETCH_STAMP_AND_SEAL,
  EDIT_NOTARY_FILES, UPLOAD_NOTARY_FILES, FETCH_BANKS, UPLOAD_BANK_DETAILS, SAVE_BANK_DETAILS, FETCH_DASHBOARD_DETAILS, SAVE_DASHBOARD_DETAILS, SAVE_NOTARY_CALENDAR, CREATE_NOTARY_CALENDAR, SAVE_PAYMENT_HISTORY, FETCH_PAYMENT_HISTORY, FETCH_BANKS_DETAILS, GET_NOTARY_CALENDAR } from './user.types';
import api from '../../services/api';

function* saveUserSignature(action: any): Generator<any> {
  const { queries, file, cb, cbError } = action;
  // const url = queryConcatenator(API.USER_SIGNATURE, queries);  
  try {
    const response: any = yield call(() => api.post(API.USER_SIGNATURE, queries));
    yield put({ type: SAVE_USER_SIG_STATE, payload: response.data.data });
    cb(response.data.data);
  } catch (error: any) {
    cbError(error?.response?.data?.message);
  }
}
  
function* editUserSignature(action: any): Generator<any> {
  const { queries, file, cb } = action;
  const URL = queryConcatenator(API.USER_SIGNATURE, queries);
  
  try {
    const response: any = yield call(() => api.patch(URL, file));
    if (response.data.code === 200) {
      yield put({ type: SAVE_USER_SIG_STATE, payload: response.data.data });
    }
    cb(response.data.data);
  } catch (error: any) {
    const { cbError } = action;
    cbError(error?.response?.data?.message);
  }
}

function* fetchUserSignature(action: any): Generator<any> {
  const { cb, cbError } = action;
  // const url = queryConcatenator(API.USER_SIGNATURE, queries);
  
  try {
    const  response : any = yield call(() => api.get(API.USER_SIGNATURE));    
    if (response.status === 200) {
      console.log('response',  response);
      cb(response.data.data);
      
    }
  } catch (error: any) {
    cbError(error?.response?.data?.message);
  }
}

function* fetchNotaryProfile(action: any): Generator<any> {
  try {
    const { cb } = action;
    const res: any = yield call(() => api.get(`${API.NOTARY_PROFILE}`));
    if(res.status === 200) {
      yield put({ type: SAVE_USER_PROFILE, payload: res.data.data});
      cb(res.data.data);
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* updateUser(action: any): Generator<any> {
  const { cb, cbError, payload } = action;
  try {
    const response: any = yield call(() => api.post(API.EDIT_USER_PROFILE, payload));
    if (response.status === 200) {
      const { is_verified_profile, first_name, last_name } = response.data.data;
      yield put({ type: UPDATE_USER_STATE, payload: response.data.data });
      yield put({ type: SET_SIGNIN_DATA, payload: { is_verified_profile, first_name, last_name } });
    }
    cb();
  } catch (error: any) {
    cbError(error?.response?.data?.message);
  }
}

function* updateUserID(action: any): Generator<any> {
  const { cb, cbError, payload } = action;
  try {
    const response: any = yield call(() => api.post(API.UPDATE_USER_ID, payload));
    if (response.status === 200) {
      yield put({ type: UPDATE_USER_ID_STATE, payload: response.data.data });
      yield put({ type: SET_SIGNIN_DATA, payload: { is_verified_profile: response.data.data.is_verified_profile } });
    }
    cb();
  } catch (error: any) {
    cbError(error?.response?.data?.message);
  }
}

function* fetchUserStampsAndSeals(action: any): Generator<any> {
  const { payload, cb, cbError } = action;
  const url = `notary/files/?fileType=${payload.type}`;

  try {
    const response: any = yield call(() => api.get(url));
    if (response.status === 200) {
      cb(response.data.data);
    }
  } catch (error: any) {
    cbError(error?.response?.data?.message);
  }
}

function* uploadNotaryFiles(action: any): Generator<any> {
  const { payload, cb, cbError } = action;
  const { type, formData } = payload;
  const url = `notary/files/?fileType=${type}`;

  try {
    const response: any = yield call(() => api.post(url, formData));
    if (response.status === 200 || response.status === 201) {
      cb(response.data.data);
    }
  } catch (error: any) {
    cbError(error?.response?.data?.message);
  }
}

function* editNotaryFiles(action: any): Generator<any> {
  const { payload, cb, cbError } = action;
  const { type, file_id, formData } = payload;
  const url = `notary/files/?fileType=${type}&fileId=${file_id}`;

  try {
    const response: any = yield call(() => api.patch(url, formData));
    if (response.status === 200 || response.status === 201) {
      cb(response.data.data);
    }
  } catch (error: any) {
    cbError(error?.response?.data?.message);
  }
}

function* fetchBanks(action: any): Generator<any> {
  const { cb, cbError } = action;
  
  try {
    const { data }: any = yield call(() => api.get(API.BANK_LIST));
    cb(data.data);
    // if (data.code === 200) {
     
    // }
  } catch (error: any) {
    cbError(error?.response?.data?.message);
  }
}

function* uploadBankAccount(action: any): Generator<any> {
  const {payload, cb, cbError } = action;

  try {
    const response: any = yield call(() => api.post(API.ADD_BANK_ACCOUNT, payload));
    yield put({ type: SAVE_BANK_DETAILS, payload: response.data.data });
    cb(response.data.data);
    
  } catch (error: any) {
    cbError(error?.response?.data);
  }
}

function* fetchDashboardDetails(action: any): Generator<any> {
  const { payload, cb, cbError } = action;
  const url = queryConcatenator(API.DASHBOARD_OVERVIEW, payload);

  try {
    const response: any = yield call(() => api.get(url));
    if (response.status === 200) {
      yield put({ type: SAVE_DASHBOARD_DETAILS, payload: response.data.data });
      cb(response.data.data);
    }
  } catch (error: any) {
    cbError(error?.response?.data?.message);
  }
}

function* fetchAccountDetails(action: any): Generator<any> {
  const { payload, cb, cbError } = action;
  const url = API.GET_BANK_ACCOUNT;

  try {
    const response: any = yield call(() => api.get(url));
    cb(response.data.data);
    // yield put({ type: FETCH_BANKS_DETAILS, payload: response.data.data });
    if (response.status === 200) {
      // yield put({ type: FETCH_BANKS_DETAILS, payload: response.data.data });
      
    }
  } catch (error: any) {
    cbError(error?.response?.data?.message);
  }
}

function* createNotaryCalendar(action: any): Generator<any> {
  const { payload, cb, cbError } = action;
  const url = API.NOTARY_CALENDAR;

  try {
    const response: any = yield call(() => api.post(url, payload));
    if (response.status === 200) {
      yield put({ type: SAVE_NOTARY_CALENDAR, payload: response.data.data });
      cb(response.data);
    }
  } catch (error: any) {
    cbError(error?.response?.data?.message);
  }
}

function* getNotaryCalendar(action: any): Generator<any> {
  const { payload, cb, cbError } = action;
  const url = API.GET_NOTARY_CALENDAR;

  try {
    const response: any = yield call(() => api.get(url));
    cb(response.data);
    // if (response.status === 200) {
    //   yield put({ type: GET_NOTARY_CALENDAR, payload: response.data.data });
    //   cb(response.data);
    // }
  } catch (error: any) {
    cbError(error?.response?.data?.message);
  }
}

function* fetchTransactionHistory(action: any): Generator<any> {
  const { cb, cbError, payload: data } = action;
  try {
    const response: any = yield call(() => api.get(`${API.TRANSACTION_HISTORY}?${queryFormatter(data.params)}`));
    if (response.status === 200) {
      yield put({ type: SAVE_PAYMENT_HISTORY, payload: response.data.data });
    }
    cb();
  } catch (error: any) {
    cbError(error?.response?.data?.message);
  }
}
  
function* watchUserSagas() {
  yield takeEvery(SET_USER_SIG, saveUserSignature);
  yield takeEvery(EDIT_USER_SIG, editUserSignature);
  yield takeEvery(FETCH_USER_SIGNATURE, fetchUserSignature);
  yield takeEvery(FETCH_USER_PROFILE, fetchNotaryProfile);
  yield takeEvery(EDIT_USER_PROFILE, updateUser);
  yield takeEvery(UPDATE_USER_ID, updateUserID);
  yield takeEvery(FETCH_STAMP_AND_SEAL, fetchUserStampsAndSeals);
  yield takeEvery(EDIT_NOTARY_FILES, editNotaryFiles);
  yield takeEvery(UPLOAD_NOTARY_FILES, uploadNotaryFiles);
  yield takeEvery(FETCH_BANKS, fetchBanks);
  yield takeEvery(FETCH_BANKS_DETAILS, fetchAccountDetails);
  yield takeEvery(UPLOAD_BANK_DETAILS, uploadBankAccount);
  yield takeEvery(FETCH_DASHBOARD_DETAILS, fetchDashboardDetails);
  yield takeEvery(CREATE_NOTARY_CALENDAR, createNotaryCalendar);
  yield takeEvery(GET_NOTARY_CALENDAR, getNotaryCalendar);
  yield takeEvery(FETCH_PAYMENT_HISTORY, fetchTransactionHistory);
}
  
export default watchUserSagas;
