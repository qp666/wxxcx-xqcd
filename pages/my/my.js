// pages/my/my.js
import axios from '../../utils/axios'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    versionNumber:'1.0.1',//版本号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getUserInfoData()
  },

  async getUserInfoData(){
    const res = await axios({url: 'my/info'})

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