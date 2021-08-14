import axios from 'axios';

function axiosRs(
  rs,
  {
    url,
    params, // url parameters
    data, // request body
    method = 'POST',
    headers,
    ...restOption
  }
) {
  rs.loading = true;
  rs.content = {};
  rs.error = '';

  axios({
    url,
    params,
    data,
    method,
    headers: headers || {
      'content-type': 'application/json',
    },
    ...restOption,
  })
    .then((response) => (rs.content = response.data))
    .catch((error) => {
      if (error.response) rs.content = error.response.data;
      else rs.error = error.message;
    })
    .finally(() => (rs.loading = false));
}

function axiosPs({
  url,
  params, // url parameters
  data, // request body
  method = 'POST',
  headers,
  ...restOption
}) {
  return axios({
    url,
    params,
    data,
    method,
    headers: headers || {
      'content-type': 'application/json',
    },
    ...restOption,
  })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) return error.response.data;
      else return error.message;
    });
}

function axiosCb({
  cb,
  url,
  params,
  data,
  method = 'POST',
  headers,
  ...restOption
}) {
  axios({
    url,
    params,
    data,
    method,
    headers: headers || {
      'content-type': 'application/json',
    },
    ...restOption,
  })
    .then((response) => {
      cb(null, response.data);
    })
    .catch((error) => {
      cb(error, null);
    });
}

export default {
  axiosRs,
  axiosPs,
  axiosCb,
};
