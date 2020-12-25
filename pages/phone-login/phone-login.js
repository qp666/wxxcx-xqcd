// pages/phone-login/phone-login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    vcode: '',
    tipName: '获取验证码',
    count: 10, // 倒计时总秒数
    isCownDown: false, // 是否正在倒计时
    timer: null, // 定时器
  },

  // changeValue(e){
  //   console.log(e)

  //   this.data.phone = xxx
  //   this.setData({
  //     phone: e.detail.value
  //   })
  // },

  changeValue({detail:{value},target:{dataset:{name}}}){
    console.log(name,value)
    this.setData({
      [name]: value // 属性名表达式 https://es6.ruanyifeng.com/#docs/object#%E5%B1%9E%E6%80%A7%E5%90%8D%E8%A1%A8%E8%BE%BE%E5%BC%8F
    })
  },

  // changeValue1({detail:{value}}) {
  //   this.setData({
  //     vcode: value
  //   })
  // },

  // 获取验证码
  getVcode() {
    const phone = this.data.phone
    // 1、先校验手机号是否合法
    var reg = /^1[3456789][0-9]{9}$/
    if (!reg.test(phone)){
      wx.showToast({
        icon: 'none',
        title: '手机号不合法',
      })
      return
    }



    // 倒计时
    if (this.data.isCownDown) return

    console.log('倒计时')
    this.setData({
      tipName: this.data.count,
      isCownDown: true // 开始倒计时
    })
    

    // 开启定时器，倒计时
    this.data.timer = setInterval(() => {
      if (this.data.count <= 1) {
        // 清除定时器
        clearInterval(this.data.timer)

        // 重置模型数据
        this.data.count = 10
        this.setData({
          tipName: '获取验证码',
          isCownDown: false
        })

        return
      }

      this.data.count--

      this.setData({
        tipName: this.data.count
      })
    }, 1000);

    // 发请求，获取验证码
    wx.request({
      url: 'http://192.168.0.102:3000/api/user/vcode',
      data: {
        phone: this.data.phone
      },
      success: res => {
        if (res.data.status === 0) {
          wx.showToast({
            icon: 'none',
            title: ""+res.data.vcode,
          })
        }
      }
    })
  },
  // 手机号登录
  phoneLogin() {
     // 跳转到首页
     wx.switchTab({
      url: '/pages/home/home',
    })
    // wx.request({
    //   url: 'http://192.168.0.102:3000/api/user/login',
    //   method: 'POST',
    //   data: {
    //     phone: this.data.phone,
    //     vcode: this.data.vcode
    //   },
    //   success: res => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: res.data.message,
    //       duration: 1000
    //     })

    //     if (res.data.status === 0) {
    //       // 保存token到本地
    //       wx.setStorageSync('token', res.data.token)

    //       // 跳转到首页
    //       wx.switchTab({
    //         url: '/pages/home/home',
    //       })
    //     }
    //   }
    // })
  }
})