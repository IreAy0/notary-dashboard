/* eslint-disable object-curly-newline */
import { put, takeEvery, call } from 'redux-saga/effects';
import API from 'const/api';
import {
  UPLOAD_DOCUMENT,
  FETCH_SIGNERS,
  FETCH_DOC_SIGNERS,
  ADD_SIGNERS,
  SET_SIGNERS,
  SEND_DOC,
  DOC_TRAIL,
  SIGN_DOC,
  SEND_DOCUMENT,
  DELETE_SIGNERS,
  UPLOAD_FILE,
  CAN_UPLOAD_SEAL_AND_STAMP,
  UPLOAD_CUSTOM_DOCUMENT
} from './documents.types';
import api from '../../services/api';

function* fetchDocSigners(action: any): any {
  const { cb, cbError, payload } = action;
  try {
    const res: any = yield call(() => api.get(`${API.DOCS}/${payload.id}/shared-with`));

    if (res.status === 200) {
      yield put({ type: SET_SIGNERS, payload: res.data.data });
      cb(res.data.data);
    }
  } catch (err: any) {
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* fetchSigners(action: any): any {
  const { cb, cbError } = action;
  try {
    const res: any = yield call(() => api.get(API.FETCH_SIGNERS));

    if (res.status === 200) {
      yield put({ type: SET_SIGNERS, payload: res.data.data });
      cb();
    }
  } catch (err: any) {
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* uploadDocs(action: any): any {
  try {
    const { cb } = action;

    const res: any = yield call(() => api.post(API.UPLOAD_DOC, action.payload));

    if (res.status === 201) {
      cb(res.data.data);
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* uploadCustomDocs(action: any): any {
  try {
    const { cb } = action;

    const res: any = yield call(() => api.post(API.UPLOAD_CUSTOM_DOC, action.payload));

    if (res.status === 201) {
      cb(res.data.data);
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}


function* sendDocument(action: any): any {
  try {
    const { cb, payload } = action;
    const { id, payload: data } = payload;

    const res: any = yield call(() => api.post(`${API.DOC_SIGNER_FIELDS}/${id}/position`, data));

    if (res.status === 200) {
      cb();
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* addSigners(action: any): any {
  try {
    const { cb, payload } = action;

    const res: any = yield call(() => api.post(`${API.ADD_SIGNERS}/${payload.id}/signers`, payload.signers));

    if (res.status === 200) {
      cb();
    }
  } catch (e: any) {
    const { cbError } = action;
    const alert = e?.response?.data?.message || '';
    cbError(alert);
  }
}

function* fetchDocAuditTrail(action: any): any {
  try {
    const { cb, payload } = action;

    const res: any = yield call(() => api.get(`${API.DOC_TRAIL}/${payload.id}/trail`));

    if (res.status === 200) {
      cb(res.data.data);
    }
  } catch (e: any) {
    const { cbError } = action;
    const alert = e?.response?.data?.message || '';
    cbError(alert);
  }
}

function* getSignerFields(action: any): any {
  try {
    const { cb, payload } = action;

    const res: any = yield call(() => api.get(`${API.DOC_SIGNER_FIELDS}/${payload.id}/position`));

    if (res.status === 200) {
      cb(res.data.data);
    }
  } catch (e: any) {
    const { cbError } = action;
    const alert = e?.response?.data?.message || '';
    cbError(alert);
  }
}

function* signDocument({ cb, payload, cbError }: any): any {
  try {
    const { id, signedFields: data } = payload;

    const res: any = yield call(() => api.put(`${API.SIGN_DOC}/${id}`, data));

    if (res.status === 200) {
      cb(res.data.data);
    }
  } catch (e: any) {
    const alert = e?.response?.data?.message || '';
    cbError(alert);
  }
}

function* deleteSigner({ cb, payload, cbError }: any): any {
  try {
    const res: any = yield call(() => api.delete(`${API.DELETE_SIGNER}/${payload.id}/signer`));

    if (res.status === 200) {
      cb(res.data.data);
    }
  } catch (e: any) {
    const alert = e?.response?.data?.message || '';
    cbError(alert);
  }
}

function* uploadFile(action: any): any {
  try {
    const { cb, payload, queries } = action;

    const res: any = yield call(() =>
      api.post(
        queries?.typeOfFile === 'video'
          ? `${API.UPLOAD_VIDEO_FILE}documentId=${queries.docId}`
          : `${API.UPLOAD_DOC_FILE_ON_SIGN}documentId=${queries.docId}&signatureType=${queries.sigType}`,
        payload
      )
    );

    if (res.status === 200) {
      cb(res.data.data);
    }
  } catch (e: any) {
    const { cbError } = action;
    const alert = e?.response?.data?.message || '';
    cbError(alert);
  }
}

function* sealAndStampEligibility(action: any): any {
  try {
    const { payload, cb } = action;
    const res: any = yield call(() => api.get(`${API.UPLOAD_SEAL_AND_STAMP}${payload}`));
    if (res.status === 200) {
      cb(res.data.data && res.data.data.canDigitizeSealStamp);
    }
  } catch (err: any) {
    const { cbError } = action;
    const alert = err?.response?.data?.message || '';
    cbError(alert);
  }
}

function* watchDocsSaga() {
  yield takeEvery(UPLOAD_DOCUMENT, uploadDocs);
  yield takeEvery(UPLOAD_CUSTOM_DOCUMENT, uploadCustomDocs);
  yield takeEvery(ADD_SIGNERS, addSigners);
  yield takeEvery(FETCH_SIGNERS, fetchSigners);
  yield takeEvery(FETCH_DOC_SIGNERS, fetchDocSigners);
  yield takeEvery(SEND_DOC, sendDocument);
  yield takeEvery(DOC_TRAIL, fetchDocAuditTrail);
  yield takeEvery(SIGN_DOC, getSignerFields);
  yield takeEvery(SEND_DOCUMENT, signDocument);
  yield takeEvery(DELETE_SIGNERS, deleteSigner);
  yield takeEvery(UPLOAD_FILE, uploadFile);
  yield takeEvery(CAN_UPLOAD_SEAL_AND_STAMP, sealAndStampEligibility);
}

export default watchDocsSaga;

