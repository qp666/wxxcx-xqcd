// pages/my/my.js
import axios from '../../utils/axios'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    versionNumber: '1.0.3', //版本号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getUserInfoData()
  },
  //查看用户是否已授权
  onShow: function (options) {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
    }
  },
  //前往登录页面
  goLogin() {
    //如果
    if (!this.data.userInfo.nickName) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }

  },
  async getUserInfoData() {
    const res = await axios({
      url: 'my/info'
    })

    if (res.data.status === 0) {
      this.setData({
        userInfo: res.data.message
      })
    }
  },
  makeCall() {
    wx.makePhoneCall({
      phoneNumber: '110' //仅为示例，并非真实的电话号码
    })
  }
})