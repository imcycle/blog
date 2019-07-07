const defaultInit = {
  returnResponse: false, // 返回原数据  默认false
  returnBoolean: false, // 返回布尔    默认false
  errorToast: true // 错误toast  默认true
};

export default (input, init = {}) => {
  const { returnResponse, returnBoolean, errorToast } = {
    ...defaultInit,
    ...init
  };
  return fetch(input, {
    headers: {
      "Content-Type": "application/json",
      "Duliday-Token": localStorage.DL_WO_token
    },
    ...init
  })
    .then(res => {
      if (returnResponse) return res; // returnResponse
      return res.json();
    })
    .then(res => {
      if (returnResponse) return res; // returnResponse
      if (res.code === 0) {
        if (returnBoolean) return true; // returnBoolean
        return res.data;
      } else {
        if (errorToast) console.log("errorToast"); // errorToast
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      return false;
    });
};
