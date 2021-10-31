import axios from 'axios';

const ndbUrl = 'http://localhost:9977/';

// global default
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

// model
const apiError = error => ({
  Succ: false,
  Code: 500,
  Msg: error || '處理失敗！',
  Data: null,
  RowsAffected: 0
});

// NdbApi: instance default
const ndbAxios = axios.create({
  baseURL: ndbUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

// NdbApi: response specific json and with loading
const ndbApi = {
  get(
    rst,
    url,
    {
      params, // url parameters
      data = null, // request body
      headers,
      ...restOption
    }
  ) {
    ndbApiBase(rst, url, {
      params, // url parameters
      data, // request body
      method: 'GET',
      headers,
      ...restOption
    });
  },
  post(
    rst,
    url,
    {
      params, // url parameters
      data = null, // request body
      headers,
      ...restOption
    }
  ) {
    ndbApiBase(rst, url, {
      params, // url parameters
      data, // request body
      method: 'POST',
      headers,
      ...restOption
    });
  },
  put(
    rst,
    url,
    {
      params, // url parameters
      data = null, // request body
      headers,
      ...restOption
    }
  ) {
    ndbApiBase(rst, url, {
      params, // url parameters
      data, // request body
      method: 'PUT',
      headers,
      ...restOption
    });
  },
  patch(
    rst,
    url,
    {
      params, // url parameters
      data = null, // request body
      headers,
      ...restOption
    }
  ) {
    ndbApiBase(rst, url, {
      params, // url parameters
      data, // request body
      method: 'PATCH',
      headers,
      ...restOption
    });
  },
  delete(
    rst,
    url,
    {
      params, // url parameters
      data = null, // request body
      headers,
      ...restOption
    }
  ) {
    ndbApiBase(rst, url, {
      params, // url parameters
      data, // request body
      method: 'DELETE',
      headers,
      ...restOption
    });
  }
};

function ndbApiBase(
  rst,
  url,
  {
    params, // url parameters
    data = null, // request body
    method = 'POST',
    headers,
    ...restOption
  }
) {
  rst.loading = true;
  rst.content = {};

  ndbAxios({
    url,
    params,
    data,
    method,
    headers,
    ...restOption
  })
    .then(response => (rst.content = response.data))
    .catch(error => {
      if (error.response) rst.content = error.response.data;
      else rst.content = apiError(error.message);
    })
    .finally(() => (rst.loading = false));
}

// NdbApi: response specific json and return promise
const ndbApiPs = {
  get(
    url,
    {
      params, // url parameters
      data = null, // request body
      headers,
      ...restOption
    }
  ) {
    return ndbApiPsBase(url, {
      params, // url parameters
      data, // request body
      method: 'GET',
      headers,
      ...restOption
    });
  },
  post(
    url,
    {
      params, // url parameters
      data = null, // request body
      headers,
      ...restOption
    }
  ) {
    return ndbApiPsBase(url, {
      params, // url parameters
      data, // request body
      method: 'POST',
      headers,
      ...restOption
    });
  },
  put(
    url,
    {
      params, // url parameters
      data = null, // request body
      headers,
      ...restOption
    }
  ) {
    return ndbApiPsBase(url, {
      params, // url parameters
      data, // request body
      method: 'PUT',
      headers,
      ...restOption
    });
  },
  patch(
    url,
    {
      params, // url parameters
      data = null, // request body
      headers,
      ...restOption
    }
  ) {
    return ndbApiPsBase(url, {
      params, // url parameters
      data, // request body
      method: 'PATCH',
      headers,
      ...restOption
    });
  },
  delete(
    url,
    {
      params, // url parameters
      data = null, // request body
      headers,
      ...restOption
    }
  ) {
    return ndbApiPsBase(url, {
      params, // url parameters
      data, // request body
      method: 'DELETE',
      headers,
      ...restOption
    });
  }
};

function ndbApiPsBase(
  url,
  {
    params, // url parameters
    data = null, // request body
    method = 'POST',
    headers,
    ...restOption
  }
) {
  return ndbAxios({
    url,
    params,
    data,
    method,
    headers,
    ...restOption
  })
    .then(response => response.data)
    .catch(error => {
      if (error.response) return error.response.data;
      else return apiError(error.message);
    });
}

// Api response no specific json and with loading
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
    })
    .finally(() => (rst.loading = false));
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
      'content-type': 'application/json'
    },
    ...restOption
  })
    .then(response => response.data)
    .catch(error => {
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
      'content-type': 'application/json'
    },
    ...restOption
  })
    .then(response => {
      cb(null, response.data);
    })
    .catch(error => {
      cb(error, null);
    });
}

export default {
  axiosRs,
  axiosPs,
  axiosCb
};

export { ndbApi, ndbApiPs };
