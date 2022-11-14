/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import NProgress from 'nprogress';
import { doSignOut } from 're-ducks/auth';
// import { isAuthenticated } from 'utils';
import { getToken } from 'utils/getToken';
import history from 'utils/history';
import { store } from '../index';

// const token = localStorage.getItem('accessToken');



const instance = axios.create({
  // config.baseURL = process.env.VUE_APP_API_BASE_URL;
  // config.headers['Authorization'] = getToken() && `Bearer ${getToken()}`;
  // config.headers['Content-Type'] = 'application/json';
  // config.headers['Accept'] = 'application/json';
  baseURL: `${process.env.REACT_APP_NOTARY_BACKEND_API_URL}/v1/`,
  timeout: 0,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': getToken() && `Bearer ${getToken()}`
  }
});

// instance.interceptors.request.use((config) => {
//   // check if user is authenticated or making auth requests
//   if (isAuthenticated() || config.url?.includes('auth') || config.url?.includes('document')) {
//     NProgress.start();
//   } else {
//     store.dispatch(doSignOut(() => history.push('../auth/sign-in')));
//   }

//   return config;
// });

instance.interceptors.response.use(
  (response) => {
    NProgress.done();

    return response;
  },

  (error) => {
    NProgress.done();

    if (error.code === 'ECONNABORTED') {
      // TODO: Add toast message
      return error;
    }

    const originalConfig = error.config;
    if (error.response) {
      if (error.response.status === 401 && error.config && !originalConfig._retry) {
        originalConfig._retry = true;
        store.dispatch(
          doSignOut(() => {
            history.push('../../auth/sign-in');
          }, /* isWithRequest */ false)
        );
        if (error.response.status === 500) {
          // TODO: handle server error
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;

