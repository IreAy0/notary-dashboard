import { API } from 'const';
import { put, takeEvery, call } from 'redux-saga/effects';
import queryFormatter from 'utils/queryFormatter';
import { GET_ALL_TEMPLATES, SAVE_ALL_TEMPLATES } from './template.types';
import api from '../../services/api';

function* getAllUploadedTemplate(action: any): any {
  console.log(1)
  try {
    console.log(2)
    const { cb, payload } = action;
    const res: any = yield call(() => api.get(`${API.GET_ALL_UPLOADED_TEMPLATE}`));
    console.log(res, 'action template')
    if (res.status === 200) {
      yield put({ type: SAVE_ALL_TEMPLATES, payload: res.data.data });
      cb(res.data.data);
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* watchTemplateSaga() {
  yield takeEvery(GET_ALL_TEMPLATES, getAllUploadedTemplate);
}
export default watchTemplateSaga;

