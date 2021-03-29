// pages/mailList/mailList.js
import axios from '../../utils/axios'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mailLists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取课程列表数据
    // this.getmailListsData()
  },

  async getmailListsData() {
    const res = await axios({url: 'mailList/list'})

    if (res.data.status === 0) {
      this.setData({
        mailLists: res.data.message
      })
    }
  }
})