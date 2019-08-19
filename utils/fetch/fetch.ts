interface MyInit extends RequestInit {
  returnResponse?: boolean; // 返回原数据 默认false
  returnBoolean?: boolean; // 返回布尔   默认false
  errorToast?: boolean; // 错误toast  默认true
}

const defaultInit = {
  returnResponse: false,
  returnBoolean: false,
  errorToast: true
};

export default (input: RequestInfo, init: MyInit = {}) => {
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
