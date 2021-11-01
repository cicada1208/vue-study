import axios from 'axios';
import baseApi from './base-api';

// axios global default
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const ndbBaseUrl = 'http://localhost:9977/';

// model for ndbApi
const ndbApiError = error => ({
  Succ: false,
  Code: 500,
  Msg: error || '處理失敗！',
  Data: null,
  RowsAffected: 0
});

const ndbApi = new baseApi(ndbBaseUrl, ndbApiError);

// response no specific json and with loading
function axiosRs(
  rst,
  {
    url,
    params, // url parameters
    data = null, // request body
    method = 'POST',
    headers,
    ...restOption
  }
) {
  rst.loading = true;
  rst.content = {};
  rst.error = '';

  axios({
    url,
    params,
    data,
    method,
    headers,
    ...restOption
  })
    .then(response => (rst.content = response.data))
    .catch(error => {
      if (error.response) rst.error = error.response.data || error.message;
      else rst.error = error.message;
      console.error('axiosRs error:', rst.error);
    })
    .finally(() => (rst.loading = false));
}

// response no specific json and return promise
function axiosPs({
  url,
  params, // url parameters
  data = null, // request body
  method = 'POST',
  headers,
  ...restOption
}) {
  return axios({
    url,
    params,
    data,
    method,
    headers,
    ...restOption
  })
    .then(response => response.data)
    .catch(error => {
      console.error('axiosPs error:', error.response.data || error.message);
      if (error.response) return error.response.data || error.message;
      else return error.message;
    });
}

// response no specific json and using callback
function axiosCb(
  cb,
  { url, params, data = null, method = 'POST', headers, ...restOption }
) {
  axios({
    url,
    params,
    data,
    method,
    headers,
    ...restOption
  })
    .then(response => {
      cb(null, response.data);
    })
    .catch(error => {
      if (error.response) cb(error.response.data, null);
      else cb(error.message, null);
    });
}

export default {
  axiosRs,
  axiosPs,
  axiosCb
};

export { ndbApi };
