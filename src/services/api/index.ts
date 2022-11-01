import instance from '../axios';

export default {
  get(url: string) {
    return instance.get(url);
  },
  post(url: string, data: object = {}) {
    return instance.post(url, data);
  },
  put(url: string, data: object) {
    return instance.put(url, data);
  },
  patch(url: string, data?: object) {
    return instance.patch(url, data);
  },
  delete(url: string) {
    return instance.delete(url);
  }
};
