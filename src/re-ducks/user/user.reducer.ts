/* eslint-disable object-curly-newline */
import {
  SET_USER_SIG_FILE,
  SAVE_USER_SIG_STATE,
  EDIT_USER_SIG,
  SAVE_USER_PROFILE,
  UPDATE_USER_STATE,
  UPDATE_USER_ID_STATE,
  SAVE_BANK_DETAILS,
  SAVE_DASHBOARD_DETAILS,
  SAVE_NOTARY_CALENDAR,
  SAVE_PAYMENT_HISTORY,
  FETCH_BANKS_DETAILS,
  GET_NOTARY_CALENDAR
} from './user.types';
import { IUserAction, IUserState } from './user.interface';
  
export const initialState: IUserState = {
  bankDetails : {},
  dashboardDetails : {},
  notaryCalendar: {},
  transactionDetails: {},
  prints:[]
};
  
const userReducer = (state = initialState, action: IUserAction) => {
  switch (action.type) {
    case SAVE_USER_SIG_STATE:
      return { ...state, ...action.payload };
    case EDIT_USER_SIG:
      return { ...state, ...action.payload };
    case SET_USER_SIG_FILE:
      return { ...state, ...action.payload };
    case SAVE_USER_PROFILE:
      return { ...state, ...action.payload };
    case UPDATE_USER_STATE:
      return { ...state, ...action.payload };
    case UPDATE_USER_ID_STATE:
      return { ...state, ...action.payload };
    case SAVE_BANK_DETAILS:
      return { ...state,
        bankDetails: { ...state.bankDetails, ...(action.payload as object)}};
    // case FETCH_BANKS_DETAILS:
    //   console.log(action.payload, 'action.payload');
    //   return { ...state, bankDetails: { ...state.bankDetails, ...(action.payload as object) }};
    case SAVE_DASHBOARD_DETAILS:
      return { ...state,
        dashboardDetails: { ...state.dashboardDetails, ...(action.payload as object)}};
    case SAVE_NOTARY_CALENDAR:
      return { ...state,
        notaryCalendar: { ...state.notaryCalendar, ...(action.payload as object)}};
    case GET_NOTARY_CALENDAR:
      return { ...state,
        notaryCalendar: { ...state.notaryCalendar, ...(action.payload as object)}};
    case SAVE_PAYMENT_HISTORY:
      return { ...state,
        transactionDetails: { ...state.transactionDetails, ...(action.payload as object)}};
    default:
      return {
        ...state
      };
  }
};
  
export default userReducer;
