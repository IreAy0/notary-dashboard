import { SET_USER_SIG, EDIT_USER_SIG,FETCH_BANKS_DETAILS, FETCH_USER_SIGNATURE, FETCH_USER_PROFILE, EDIT_USER_PROFILE, UPDATE_USER_ID, EDIT_NOTARY_FILES, UPLOAD_NOTARY_FILES, FETCH_STAMP_AND_SEAL, FETCH_BANKS, UPLOAD_BANK_DETAILS, FETCH_DASHBOARD_DETAILS, CREATE_NOTARY_CALENDAR, FETCH_PAYMENT_HISTORY, GET_NOTARY_CALENDAR } from './user.types';

export const saveUserSignature = (queries: object, file: FormData, cb: (data: any) => void, cbError: (error: string) => void) => ({
  type: SET_USER_SIG,
  queries,
  file,
  cb,
  cbError
});
  
export const editUserSignature = (queries: object, file: FormData, cb: (data: any) => void, cbError: (error: string) => void) => ({
  type: EDIT_USER_SIG,
  queries,
  file,
  cb,
  cbError
});

export const fetchUserSignature = ( cb: (res: any) => void, cbError: (error: string) => void) => ({
  type: FETCH_USER_SIGNATURE,
  
  cb,
  cbError
});

export const fetchUserProfile = (payload: object, cb: (success: any) => void, cbError: (error: string) => void) => ({
  type: FETCH_USER_PROFILE,
  cb,
  cbError
});

export const editUserProfile = (payload: object, cb: (success: any) => void, cbError: (error: string) => void) => ({
  payload,
  type: EDIT_USER_PROFILE,
  cb,
  cbError
});

export const updateUserIDAction = (payload: object, cb: () => void, cbError: (error: string) => void) => ({
  type: UPDATE_USER_ID,
  payload,
  cb,
  cbError
});

export const editNotaryFiles = (payload: object, cb: (response: any) => void, cbError: (error: string) => void) => ({
  type: EDIT_NOTARY_FILES,
  payload,
  cb,
  cbError
});

export const uploadNotaryFiles = (fileType: string, payload: object, cb: (response: any) => void, cbError: (error: string) => void) => ({
  type: UPLOAD_NOTARY_FILES,
  fileType,
  payload,
  cb,
  cbError
});

export const fetchStampsAndSeals = (payload: object, cb: (response: any) => void, cbError: (error: string) => void) => ({
  type: FETCH_STAMP_AND_SEAL,
  payload,
  cb,
  cbError
});

export const fetchBankList = (cb: (res: any) => void, cbError: (error: string) => void) => ({
  type: FETCH_BANKS,
  cb,
  cbError
});

export const fetchBankDetails = (cb: (res: any) => void, cbError: (error: string) => void) => ({
  type: FETCH_BANKS_DETAILS,
  cb,
  cbError
});

export const uploadBankDetails = (payload: object, cb: (response: any) => void, cbError: (error: string) => void) => ({
  type: UPLOAD_BANK_DETAILS,
  payload,
  cb,
  cbError
});

export const userRequestOverview = (payload: object, cb: (response: any) => void, cbError: (error: string) => void) => ({
  type: FETCH_DASHBOARD_DETAILS,
  payload,
  cb,
  cbError
})

export const createNotaryCalendar = (payload: object, cb: (response: any) => void, cbError: (error: string) => void) => ({
  type: CREATE_NOTARY_CALENDAR,
  payload,
  cb,
  cbError
});

export const fetchNotaryCalendar = (payload: object, cb: (response: any) => void, cbError: (error: string) => void) => ({
  type: GET_NOTARY_CALENDAR,
  payload,
  cb,
  cbError
});
export const fetchPaymentHistory = (payload: object, cb: (response: any) => void, cbError: (error: string) => void) => ({
  type: FETCH_PAYMENT_HISTORY,
  payload,
  cb,
  cbError
});



