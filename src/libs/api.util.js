import axios from 'axios';

function axiosEx(resp, url, data, method = 'post') {
  axios({
    url,
    method,
    data,
  })
    .then((response) => {
      // `data` is the response that was provided by the server
      resp(null, response.data);
      // // `status` is the HTTP status code from the server response
      // console.log(response.status);
      // // `statusText` is the HTTP status message from the server response
      // console.log(response.statusText);
      // // `headers` the HTTP headers that the server responded with
      // // All header names are lower cased and can be accessed using the bracket notation.
      // // Example: `response.headers['content-type']`
      // console.log(response.headers);
      // // `config` is the config that was provided to `axios` for the request
      // console.log(response.config);
      // // `request` is the request that generated this response
      // // It is the last ClientRequest instance in node.js (in redirects)
      // // and an XMLHttpRequest instance in the browser
      // console.log(response.request);
    })
    .catch((error) => {
      resp(error, null);
      // // 與 fetch 不同，axios 所有的 error 都由 catch 接收
      // if (error.response) {
      //   // The request was made and the server responded with a status code
      //   // that falls out of the range of 2xx
      //   console.error(error.response.status);
      //   console.error(error.response.statusText);
      //   console.error(error.response.data);
      //   console.error(error.response.headers);
      // } else if (error.request) {
      //   // The request was made but no response was received
      //   // `error.request` is an instance of XMLHttpRequest in the browser
      //   // and an instance of http.ClientRequest in node.js
      //   console.error(error.request);
      // }
      // console.error('Error:', error.message);
      // console.error(error.config);
    });
}

export default {
  axiosEx,
};
