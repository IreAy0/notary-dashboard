import { GET_ALL_COMPLETE_REQUEST } from './locker.types';

export const getAllCompleteRequestAction = (payload: object, cb: (success: string) => void, cbError: (error: string) => void) => ({
  type: GET_ALL_COMPLETE_REQUEST,
  payload,
  cb,
  cbError
});


