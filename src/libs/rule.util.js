export default {
  required: (label = '') => (v) =>
    (v || '').toString().trim().length > 0 || `${label || '欄位'} 必填`,

  maxLen: (maxLen, label = '') => (v) =>
    (v || '').length <= maxLen || `${label || '欄位'} 字長超過 ${maxLen}`,

  email: (label = '') => (v) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(v) || `${label || '欄位'} 格式錯誤`;
  },

  file: (maxMb, label = '') => (v) => {
    // v-file-input when multiple: param v is an array of files
    // when not multiple: param v is a file
    // return false or error message 表示為錯誤狀態
    let result;
    if (!v) return true;
    else if (!isNaN(v.length)) {
      // multiple
      result = !v.length || !v.filter((f) => f.size > maxMb * 1000000).length;
    } else {
      // not multiple
      result = !v || !(v.size > maxMb * 1000000);
    }
    result = result || `${label} 每個檔案須小於 ${maxMb} MB`;
    return result;
  },
};
