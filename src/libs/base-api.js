import axios from 'axios';

function baseApi(baseUrl, apiError) {
  this.baseUrl = baseUrl;
  this.apiError = apiError;

  // axios instance default
  this.axios = axios.create({
    baseURL: this.baseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

// response specific json and with loading
baseApi.prototype.method = function(
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

  this.axios({
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
      else rst.content = this.apiError(error.message);
      console.error('baseApi.method error:', rst.content);
    })
    .finally(() => (rst.loading = false));
};

baseApi.prototype.get = function(
  rst,
  url,
  {
    params, // url parameters
    data = null, // request body
    headers,
    ...restOption
  }
) {
  this.method(rst, url, {
    params, // url parameters
    data, // request body
    method: 'GET',
    headers,
    ...restOption
  });
};

baseApi.prototype.post = function(
  rst,
  url,
  {
    params, // url parameters
    data = null, // request body
    headers,
    ...restOption
  }
) {
  this.method(rst, url, {
    params, // url parameters
    data, // request body
    method: 'POST',
    headers,
    ...restOption
  });
};

baseApi.prototype.put = function(
  rst,
  url,
  {
    params, // url parameters
    data = null, // request body
    headers,
    ...restOption
  }
) {
  this.method(rst, url, {
    params, // url parameters
    data, // request body
    method: 'PUT',
    headers,
    ...restOption
  });
};

baseApi.prototype.patch = function(
  rst,
  url,
  {
    params, // url parameters
    data = null, // request body
    headers,
    ...restOption
  }
) {
  this.method(rst, url, {
    params, // url parameters
    data, // request body
    method: 'PATCH',
    headers,
    ...restOption
  });
};

baseApi.prototype.delete = function(
  rst,
  url,
  {
    params, // url parameters
    data = null, // request body
    headers,
    ...restOption
  }
) {
  this.method(rst, url, {
    params, // url parameters
    data, // request body
    method: 'DELETE',
    headers,
    ...restOption
  });
};

// response specific json and return promise
baseApi.prototype.methodPs = function(
  url,
  {
    params, // url parameters
    data = null, // request body
    method = 'POST',
    headers,
    ...restOption
  }
) {
  return this.axios({
    url,
    params,
    data,
    method,
    headers,
    ...restOption
  })
    .then(response => response.data)
    .catch(error => {
      console.error(
        'baseApi.methodPs error:',
        error.response.data || error.message
      );
      if (error.response) return error.response.data;
      else return this.apiError(error.message);
    });
};

baseApi.prototype.getPs = function(
  url,
  {
    params, // url parameters
    data = null, // request body
    headers,
    ...restOption
  }
) {
  return this.methodPs(url, {
    params, // url parameters
    data, // request body
    method: 'GET',
    headers,
    ...restOption
  });
};

baseApi.prototype.postPs = function(
  url,
  {
    params, // url parameters
    data = null, // request body
    headers,
    ...restOption
  }
) {
  return this.methodPs(url, {
    params, // url parameters
    data, // request body
    method: 'POST',
    headers,
    ...restOption
  });
};

baseApi.prototype.putPs = function(
  url,
  {
    params, // url parameters
    data = null, // request body
    headers,
    ...restOption
  }
) {
  return this.methodPs(url, {
    params, // url parameters
    data, // request body
    method: 'PUT',
    headers,
    ...restOption
  });
};

baseApi.prototype.patchPs = function(
  url,
  {
    params, // url parameters
    data = null, // request body
    headers,
    ...restOption
  }
) {
  return this.methodPs(url, {
    params, // url parameters
    data, // request body
    method: 'PATCH',
    headers,
    ...restOption
  });
};

baseApi.prototype.deletePs = function(
  url,
  {
    params, // url parameters
    data = null, // request body
    headers,
    ...restOption
  }
) {
  return this.methodPs(url, {
    params, // url parameters
    data, // request body
    method: 'DELETE',
    headers,
    ...restOption
  });
};

export default baseApi;
