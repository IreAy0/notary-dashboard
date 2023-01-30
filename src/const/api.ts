export default {
  SIGNIN: 'user/login',
  SIGNUP: 'user/register',
  // /api/v1/user/change/password
  CHANGE_PASSWORD: 'user/change/password',
  SIGNOUT: 'auth/logout',
  RESET_PASSWORD: 'notary/auth/reset-password',
  SET_PASSWORD: 'notary/auth/set-password',
  RE_SEND_EMAIL: 'notary/auth/resend-verify-email',
  FORGOT_PASS_SEND_EMAIL: 'notary/auth/forgot-password',
  FORGOT_PASS_SET_NEW_PASS: 'auth/reset-password',
  REFRESH_TOKEN: 'notary/auth/refresh-token',

  BANK_LIST: 'banks',
  VERIFY_BANK: '/notary/profile/bank/',
  ADD_BANK_ACCOUNT: '/bank-details',
  GET_BANK_ACCOUNT: '/bank-details',

  NOTARY_PROFILE: 'user/profile',
  EDIT_USER_PROFILE: 'user/update',
  UPDATE_USER_ID: 'verify/user',

  USER_SIGNATURE: 'prints',
  COMPLETE_PROFILE: 'notary/profile/update',
  VERIFY_NOTARY_ID: 'notary/profile/verify-id',
  NOTARY_CALENDAR: 'notary/calendar',
  GET_NOTARY_CALENDAR: 'notary/calendar',

  NOTIFICATIONS: '/notary/requests/notifications',
  NOTARY_LOCKER:'/documents',
  DASHBOARD_OVERVIEW: '/notary/dashboard',
  REQUEST: '/notary/notary-requests',
  UPDATE_REQUEST: '/notary/update-request-status',
  VIEW_REQUEST_DOC: 'notary/requests/view-document',

  TRANSACTION_HISTORY: '/notary/requests/session/transactions',

  GET_ALL_COMPLETE_REQUEST: 'notary/notary-locker',
  END_SESSION: 'notary/requests/session',
  COMPLETE_SESSION: '/request/complete-session',

  GET_ALL_UPLOADED_TEMPLATE: '/notary/document-templates',

  GET_SESSION_LINK: 'request/join-call?',
  UPLOAD_DOC: 'document/upload',
  UPLOAD_TEMP: 'document/upload-template',

  RETRACT_DOC: 'document/retract',
  DOCS: 'document',
  SAVE_TEMPLATE: 'document/template',
  ADD_SIGNERS: 'document/draft',
  DOC_SIGNERS: 'document/view/',
  FETCH_SIGNERS: '/document/signers',
  DOC_SIGNER_FIELDS: 'document/fields',
  SEND_DOC: 'document/fields',
  DOC_TRAIL: '/document/audit',
  SIGN_DOC: 'document/sign',
  DELETE_SIGNER: 'document/draft',
  REQUEST_SESSION: 'request/upload-new',
  REQUEST_TEMPLATE_SESSION: 'request/upload-template',
  UPLOAD_DOC_FILE_ON_SIGN: 'settings/upload?fileType=signature&documentType=requests&',
  UPLOAD_VIDEO_FILE: 'settings/upload?fileType=video&documentType=requests&',
  UPLOAD_SEAL_AND_STAMP: 'user/digitize-seal-stamp?email='
};
