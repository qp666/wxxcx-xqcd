// 定义基准路径
const BASE_URL = 'https://api.jikipedia.com'
/**
 * 定义的一个函数
 * 
 * obj = {url:'user/vcode',method:'POST',data:{},tipName:'正在加载中...'}
 */
const axios = ({url,method = 'GET',data = {},tipName = '正在加载中...'}) => {
  // 处理请求头
  const header = {}
  if (wx.getStorageSync('token')){
    header.Authorization = wx.getStorageSync('token')
  }

  return new Promise((resolve,reject) => {
    wx.showLoading({
      title: tipName,
    })

    // 异步请求
    wx.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  })
}

// 导出了一个函数
export default axios