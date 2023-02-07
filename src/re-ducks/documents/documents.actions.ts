/* eslint-disable object-curly-newline */
import {
  SET_SIGNATURES,
  RESET_SIGNATURES,
  UPLOAD_DOCUMENT,
  FETCH_SIGNERS,
  FETCH_DOC_SIGNERS,
  ADD_SIGNERS,
  SEND_DOC,
  DOC_TRAIL,
  SIGN_DOC,
  SEND_DOCUMENT,
  DELETE_SIGNERS,
  UPLOAD_FILE,
  CAN_UPLOAD_SEAL_AND_STAMP,
  UPLOAD_CUSTOM_DOCUMENT
} from './documents.types';

import { SignatureObj } from './documents.interface';
import User from '../../types/user';

export const doFetchSignersAction = (cb: () => void, cbError: (error: string) => void) => ({
  type: FETCH_SIGNERS,
  cb,
  cbError
});

export const fetchDocSigners = (payload: object, cb: (signers: User[]) => void, cbError: (error: string) => void) => ({
  type: FETCH_DOC_SIGNERS,
  payload,
  cb,
  cbError
});

export const uploadDocument = (payload: object, cb: (r: any) => void, cbError: (error: string) => void) => ({
  type: UPLOAD_DOCUMENT,
  payload,
  cb,
  cbError
});

export const uploadCustomDocument = (payload: object, cb: (r: any) => void, cbError: (error: string) => void) => ({
  type: UPLOAD_CUSTOM_DOCUMENT,
  payload,
  cb,
  cbError
});

export const addSignerToDoc = (payload: object, cb: (r: any) => void, cbError: (error: string) => void) => ({
  type: ADD_SIGNERS,
  payload,
  cb,
  cbError
});

export const sendDocument = (payload: object, cb: (r: any) => void, cbError: (error: string) => void) => ({
  type: SEND_DOC,
  payload,
  cb,
  cbError
});

export const fetchSignerFields = (payload: object, cb: (r: any) => void, cbError: (error: string) => void) => ({
  type: SIGN_DOC,
  payload,
  cb,
  cbError
});

export const fetchDocAuditTrail = (payload: object, cb: (r: any) => void, cbError: (error: string) => void) => ({
  type: DOC_TRAIL,
  payload,
  cb,
  cbError
});

export const signDocument = (payload: object, cb: (r: any) => void, cbError: (error: string) => void) => ({
  type: SEND_DOCUMENT,
  payload,
  cb,
  cbError
});

export const setSignatures = (payload: SignatureObj) => ({
  type: SET_SIGNATURES,
  payload
});

export const resetSignatures = (payload: SignatureObj) => ({
  type: RESET_SIGNATURES,
  payload
});

export const deleteSigners = (payload: { id: string }, cb: (r: any) => void, cbError: (error: string) => void) => ({
  type: DELETE_SIGNERS,
  payload,
  cb,
  cbError
});

export const uploadFiles = (queries: object, payload: any, cb: (res: any) => void, cbError: (error: string) => void) => ({
  type: UPLOAD_FILE,
  queries,
  payload,
  cb,
  cbError
});

export const sealAndStampEligibility = (payload: string, cb: (r: any) => void, cbError: (error: string) => void) => ({
  type: CAN_UPLOAD_SEAL_AND_STAMP,
  payload,
  cb,
  cbError
});
