// pages/login/login.js
Page({
  getUserInfo(e) {
    if (e.detail.errMsg === 'getUserInfo:fail auth deny') return

    // 获取头像和用户名
    const {avatarUrl : avatar ,nickName: nickname} = e.detail.userInfo

    // 获取登录的临时code
    wx.login({
      success: ({code}) => {
         // 跳转到首页
         wx.switchTab({
          url: '/pages/home/home',
        })
        // 发送请求了
        // wx.request({
        //   url: 'http://localhost:3000/api/user/wxlogin', //仅为示例，并非真实的接口地址
        //   method: 'POST',
        //   data: {
        //     code,
        //     // avatar: avatarUrl,
        //     // nickname: nickName
        //     avatar,
        //     nickname
        //   },
        //   success: res => {
        //     console.log(res.data)
        //     // const {status,token,message} = res.data
        //     // 弹出消息
        //     wx.showToast({
        //       title: res.data.message,
        //       icon: 'none'
        //     })

        //     if (res.data.status === 0) {
        //       // 保存到本地
        //       wx.setStorageSync('token', res.data.token)

        //       // 跳转到首页
        //       wx.reLaunch({
        //         url: '/pages/home/home',
        //       })
        //     }
        //   }
        // })
      },
      fail: err => {
        console.log('...获取code失败了...')
      }
    })
  },
  // 跳转到手机号登录页面
  goToPhoneLogin() {
    wx.navigateTo({
      url: '/pages/phone-login/phone-login',
    })
  }
})