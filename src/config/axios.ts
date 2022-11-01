import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const setAuthHeader = (token: string | null): void => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export const removeAuthHeader = (): void => {
  axios.defaults.headers.common.Authorization = '';
};
