// import {
//   Toast
// } from 'vant';

const defaultInit = {
  returnResponse: false, // 返回原数据  默认false  
  returnBoolean: false, // 返回布尔    默认false
  loadingToast: true, // 加载中toast 默认true
  errorToast: true, // 错误toast  默认true
}

let fetchCount = 0;

const startLoading = (loadingToast) => {
  if (!loadingToast) {
    return;
  }
  if (fetchCount === 0) {
    // Toast.loading({
    //   forbidClick: true
    // });
  }
  fetchCount++;
}

const endLoading = (loadingToast) => {
  if (!loadingToast) {
    return;
  }
  fetchCount--;
  if (fetchCount === 0) {
    // Toast.clear();
  }
}

export default (input, init = {}) => {
  const {
    returnResponse,
    returnBoolean,
    loadingToast,
    errorToast
  } = {
    ...defaultInit,
    ...init
  };

  startLoading(loadingToast);

  return fetch(input, {
      headers: {
        'Content-Type': 'application/json',
        'Duliday-Token': localStorage.WM_token,
      },
      ...init,
    })
    .then(res => {
      if (returnResponse) { // returnResponse
        return res;
      }
      return res.json();
    })
    .then(res => {
      endLoading(loadingToast);
      if (returnResponse) { // returnResponse
        return res;
      }
      if (res.success === true) {
        if (returnBoolean) { // returnBoolean
          return true;
        }
        return res.data;
      } else {
        if (errorToast) { // errorToast
          // Toast.fail(res.error_msg || '失败');
        }
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      endLoading(loadingToast);
      return false;
    });
};