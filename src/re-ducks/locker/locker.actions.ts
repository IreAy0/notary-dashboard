import { GET_REQUEST_DETAILS, GET_REQUEST_DOC } from 're-ducks/request/request.types';
import { GET_ALL_COMPLETE_REQUEST, GET_LOCKER_DETAILS, GET_LOCKER_DOC } from './locker.types';

export const getAllCompleteRequestAction = (payload: object, cb: (success: string) => void, cbError: (error: string) => void) => ({
  type: GET_ALL_COMPLETE_REQUEST,
  payload,
  cb,
  cbError
});


export const getLockerDetails = (payload: object, cb: (success: object) => void, cbError: (error: string) => void) => ({
  type: GET_LOCKER_DETAILS,
  payload,
  cb,
  cbError
});

export const getLockerDocument = (payload: object, cb: (success: object) => void, cbError: (error: string) => void) => ({
  type: GET_LOCKER_DOC,
  payload,
  cb,
  cbError
})
