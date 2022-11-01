/* eslint-disable object-curly-newline */
import {
  GET_ALL_REQUEST,
  GET_REQUEST_COUNT,
  CONFIRM_REQUEST,
  GET_REQUEST_DETAILS,
  GET_REQUEST_DOC,
  CANCEL_NOTARY_REQUEST,
  COMPLETE_NOTARY_SESSION,
  GET_SESSION_LINK,
  END_NOTARY_SESSION
} from './request.types';

export const getAllRequestAction = (payload: object, cb: (success: string) => void, cbError: (error: string) => void) => ({
  type: GET_ALL_REQUEST,
  payload,
  cb,
  cbError
});

export const getRequestCountAction = (cb: (success: any) => void, cbError: (error: string) => void) => ({
  type: GET_REQUEST_COUNT,
  cb,
  cbError
});

export const confirmRequest = (payload: object, cb: (success: object) => void, cbError: (error: string) => void) => ({
  type: CONFIRM_REQUEST,
  payload,
  cb,
  cbError
});

export const getRequestDetails = (payload: object, cb: (success: object) => void, cbError: (error: string) => void) => ({
  type: GET_REQUEST_DETAILS,
  payload,
  cb,
  cbError
});

export const getRequestDocument = (payload: object, cb: (success: object) => void, cbError: (error: string) => void) => ({
  type: GET_REQUEST_DOC,
  payload,
  cb,
  cbError
});

export const cancelNotaryRequest = (payload: object, cb: (success: object) => void, cbError: (error: string) => void) => ({
  type: CANCEL_NOTARY_REQUEST,
  payload,
  cb,
  cbError
});

export const getSessionLink = (payload: object, cb: (success: object) => void, cbError: (error: string) => void) => ({
  type: GET_SESSION_LINK,
  payload,
  cb,
  cbError
});

export const endNotarySession = (payload: object, cb: (response: object) => void, cbError: (error: string) => void) => ({
  type: END_NOTARY_SESSION,
  payload,
  cb,
  cbError
});

export const completeNotarySession = (payload: object, cb: (response: object) => void, cbError: (error: string) => void) => ({
  type: COMPLETE_NOTARY_SESSION,
  payload,
  cb,
  cbError
});
