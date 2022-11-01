import { FETCH_GENERAL_NOTIFICATIONS } from './notifications.types';

export const fetchGeneralNotifications = (cb: () => void, cbError: (error: string) => void, payload?: object) => ({
  type: FETCH_GENERAL_NOTIFICATIONS,
  payload,
  cb,
  cbError
});
