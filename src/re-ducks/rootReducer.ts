import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth';
import { notificationsReducer } from './notifications';
import { sidebarReducer } from './sidebar';
import { userReducer } from './user';
import { requestReducer } from './request';
import { lockerReducer } from './locker';
import { documentsReducer } from './documents';
import { templatesReducer } from './template';

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  notification: notificationsReducer,
  request: requestReducer,
  sidebar: sidebarReducer,
  locker: lockerReducer,
  documents: documentsReducer,
  templates: templatesReducer
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === 'DO_SIGNOUT') {
    storage.removeItem('persist:root');

    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
