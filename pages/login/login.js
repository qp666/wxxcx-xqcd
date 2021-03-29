// pages/login/login.js
const util = require('../../utils/util');
Page({
  getUserInfo(e) {
    if (e.detail.errMsg === 'getUserInfo:fail auth deny') return

    // 获取头像和用户名
    // const {avatarUrl : avatar ,nickName: nickname} = e.detail.userInfo
    wx.setStorageSync('userInfo', e.detail.userInfo)
    // 获取登录的临时code
    wx.login({
      success: ({code}) => {
         // 跳转到我的页面
         wx.switchTab({
          url: '/pages/my/my',
        })
       
      },
      fail: err => {
        console.log('...获取code失败了...')
      }
    })
  },
  // 跳转到手机号登录页面
  goToPhoneLogin() {
    util.msgBox('暂时未开通手机号登录');
    // wx.navigateTo({
    //   url: '/pages/phone-login/phone-login',
    // })
  }
})