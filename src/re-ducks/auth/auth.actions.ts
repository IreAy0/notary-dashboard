/* eslint-disable object-curly-newline */
import {
  DO_SIGNIN,
  DO_SIGNUP,
  DO_SIGNOUT,
  DO_RESET_PASSWORD,
  DO_SET_PASSWORD,
  DO_FORGET_PASSWORD,
  DO_COMPLETE_PROFILE,
  DO_RE_SEND_EMAIL,
  FORGOT_PASS_RESET_STATE,
  DO_VERIFY_NOTIFY_ID,
  DO_CHANGE_PASSWORD,
  DO_REFRESH_TOKEN
} from './auth.types';

export const doSignIn = (payload: object, cb: (success: string) => void, cbError: (error: string) => void) => ({
  type: DO_SIGNIN,
  payload,
  cb,
  cbError
});

export const doSignUp = (payload: object, cb: (success: any) => void, cbError: (error: string) => void) => ({
  type: DO_SIGNUP,
  payload,
  cb,
  cbError
});

export const doResetPassword = (payload: object, cb: () => void, cbError: (error: string) => void) => ({
  type: DO_RESET_PASSWORD,
  payload,
  cb,
  cbError
});

export const doSetPassword = (payload: object, cb: () => void, cbError: (error: string) => void) => ({
  type: DO_SET_PASSWORD,
  payload,
  cb,
  cbError
});

export const doForgetPassword = (payload: object, cb: (success: any) => void, cbError: (error: string) => void) => ({
  type: DO_FORGET_PASSWORD,
  payload,
  cb, 
  cbError
});

export const doVerifyId = (payload: object, cb: (success: any) => void, cbError: (error: string) => void) => ({
  type: DO_VERIFY_NOTIFY_ID,
  payload,
  cb, 
  cbError
});

export const doCompleteProfile = (payload: object, cb: (success: any) => void, cbError: (error: string) => void) => ({
  type: DO_COMPLETE_PROFILE,
  payload,
  cb,
  cbError
});

export const doReSendEmail = (payload: object, cb: () => void, cbError: (error: string) => void) => ({
  type: DO_RE_SEND_EMAIL,
  payload,
  cb,
  cbError
});
export const forgotPassResetState = () => ({
  type: FORGOT_PASS_RESET_STATE
});

export const doSignOut = (cb: () => void, isWithRequest?: boolean) => ({
  type: DO_SIGNOUT,
  cb,
  isWithRequest
});

export const doChangePasswordAction = (payload: object, cb: () => void, cbError: (error: string) => void) => ({
  type: DO_CHANGE_PASSWORD,
  payload,
  cb,
  cbError
});

export const doRefreshTokenAction = (payload: object, cb: (success: string) => void, cbError: (error: string) => void) => ({
  type: DO_REFRESH_TOKEN,
  payload,
  cb,
  cbError
});
