import axios from 'axios';

axios.defaults.baseURL = 'http://music.it666.com:3666';
axios.defaults.timeout = 5000;

class Ajax { }

Ajax.prototype.request = function (config) {
  const { url, method, params } = config;

  return new Promise((resolve, reject) => {
    let promise;

    method === 'get' ?
      promise = axios.get(url, { params })
      :
      promise = axios.post(url, params);

    promise
      .then(result => resolve(result.data))
      .catch(err => reject(err));
  });
}

const requestMethod = ['get', 'post'];
requestMethod.forEach(method => {
  Ajax.prototype[method] = function (url = '', params = {}) {
    return this.request({ method, url, params });
  };
});

export default new Ajax();