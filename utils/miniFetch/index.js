let fetchNumber = 0;

const loadingStart = () => {
  fetchNumber++;
  if (fetchNumber <= 0) {
    wx.showLoading({ title: '加载中' });
  }
}

const loadingEnd = () => {
  fetchNumber--;
  if (fetchNumber <= 0) {
    wx.hideLoading()
  }
}

const fetch = (url, {
  method,
  body,
  returnResponse,
  returnBoolean,
  hideErrorToast,
  hideLoading,
} = {}) => {
  let promise = new Promise((resolve, reject) => {
    if (hideLoading !== true) loadingStart();
    wx.request({
      method: method || 'GET',
      url,
      data: body || null,
      success: resolve,
      fail: reject,
    });
  })
    .finally(() => {
      if (hideLoading !== true) loadingEnd();
    })
    .then(res => {
      if (returnResponse === true) {
        return res;
      }

      if (res.statusCode !== 200) {
        if (hideErrorToast !== true) wx.showToast({ title: '出错了', icon: 'none' });
        return Promise.reject(res.data);
      }

      // 数据业务处理开始 格式{code, data, message}
      // if (typeof res.data !== 'object') {
      //   if (hideErrorToast !== true) wx.showToast({ title: '返回格式错误', icon: 'none' });
      //   return Promise.reject(res.data);
      // }

      // if (res.data.code !== 0) {
      //   if (hideErrorToast !== true) wx.showToast({ title: res.data.message, icon: 'none' });
      //   return false;
      // }

      // if (returnBoolean === true) {
      //   return true;
      // }

      // return res.data.data;
      // 数据业务处理结束
      return res.data;
    })
    .catch(err => {
      return false;
    })

  return promise;
}

export default fetch;