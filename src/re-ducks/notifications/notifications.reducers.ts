import { SET_GENERAL_NOTIFICATIONS } from './notifications.types';

export const initialState: any = {
  notifications: []
};

const notificationsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_GENERAL_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      };
    default:
      return state;
  }
};

export default notificationsReducer;
