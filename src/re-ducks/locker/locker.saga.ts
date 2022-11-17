import { API } from 'const';
import { put, takeEvery, call } from 'redux-saga/effects';
import queryFormatter from 'utils/queryFormatter';
import { GET_ALL_COMPLETE_REQUEST, GET_LOCKER_DETAILS, SAVE_ALL_COMPLETE_REQUEST } from './locker.types';
import api from '../../services/api';

function* getAllCompleteRequest(action: any): any {
  try {
    const { cb, payload: data } = action;
    const res: any = yield call(() => api.get(`${API.GET_ALL_COMPLETE_REQUEST}?${queryFormatter(data.params)}`));
    if (res.status === 200) {
      yield put({ type: SAVE_ALL_COMPLETE_REQUEST, payload: res.data.data });
      cb(res.data.data);
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* fetchLockerDetails(action: any): Generator {
  try {
    const { cb, payload } = action;

    const res: any = yield call(() => api.get(`${API.NOTARY_LOCKER}/${payload.id}`));
    if (res.status === 200) {
      cb(res.data?.data);
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* watchLockerSaga() {
  yield takeEvery(GET_ALL_COMPLETE_REQUEST, getAllCompleteRequest);
  yield takeEvery(GET_LOCKER_DETAILS, fetchLockerDetails);

}
export default watchLockerSaga;

