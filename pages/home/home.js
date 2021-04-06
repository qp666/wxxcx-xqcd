// pages/home/home.js
import axios from '../../utils/axios'
const util = require('../../utils/util');

var apps = getApp();
var globalData = apps.globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalData,
    swipers: null, // 轮播图数据
    mailLists: null, // 推荐课程
    videos: null, // 热门视频
    terms: '小丑竟是我自己', //最新热词
    terms_detail: '梗源于小丑、沙口（生活不如意之人常用来互称）和高人竟在我身边（所谓的"高情商”的表达方式的代表句子，意思是“你真牛逼",小丑本来指马戏团里的小丑角色，画着夸张的笑容，动作表情滑稽，供人取笑，自己的苦涩只能藏在厚重妆容之下。就像生活不如意却还要努力保持微笑的人，常用来比喻卑微的舔狗。用于互相取笑和自嘲| “高人竟在我身边”一开始由于说是“高情商”，实际很阴阳怪气而被调侃玩梗。|小丑+高人竟在我身边=小丑竟在我身边（开始很认真地阴阳怪气别人），自嘲就变成了“小丑竟是我自己”。', //词意
    terms_img: 'https://api.jikipedia.com/upload/eb9391efdd92e6c05da69efb666238d5_scaled.png'
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTerms()
    // // 发送请求获取轮播图数据
    // this.getSwiperData()

    // // 发送请求获取推荐课程数据
    // this.getmailListsData()

    // // 发送请求获取热门视频的数据
    // this.getHotVideosData()
  },
  //跳转到播放视频界面
  goVideo() {
    util.msgBox('暂无视频')
  },
  //根据获取到的最新热词去搜索最新热词含义
  getTermsDetail(val) {
    console.log(val)

    if (!val) {
      return
    }
    let data = {
      page: 1,
      phrase: this.data.terms
    }
    axios({
      url: '/go/search_definitions',
      method: 'POST',
      data: JSON.stringify(data)
    }).then(res => {
      console.log(res)
      this.data.terms_detail = res.data.data[0].plaintext;
      this.data.terms_img = res.data.data[0].scaled_image;
      this.setData({
        terms_detail: this.data.terms_detail,
        terms_img: this.data.terms_img,
      })
      util.msgToast(val);
    })
  },
  //获取最新热词
  getTerms() {
    axios({
      url: '/wiki/request_search_placeholder',
      method: 'POST'
    }).then(res => {
      console.log(res)
      this.data.terms = res.data.phrase;
      // window.localStorage.setItem('terms', this.data.terms);
      this.setData({
        terms: this.data.terms
      })
      this.getTermsDetail(this.data.terms)
    })
  },
  getSwiperData() {
    axios({
      url: 'home/swipers'
    }).then(res => {
      if (res.data.status === 0) {
        this.setData({
          swipers: res.data.message
        })
      }
    })

    /**
    wx.showLoading({
      title: '正在加载中...',
    })
    wx.request({
      url: 'http://192.168.0.102:3000/api/home/swipers',
      header: {
        Authorization: wx.getStorageSync('token')
      },
      success: res => {
        wx.hideLoading()
        if (res.data.status === 0) {
          this.setData({
            swipers: res.data.message
          })
        }
      }
    })
     */
  },

  async getmailListsData() {
    const res = await axios({
      url: 'home/mailList'
    })

    if (res.data.status === 0) {
      this.setData({
        mailLists: res.data.message
      })
    }
  },

  async getHotVideosData() {
    const res = await axios({
      url: 'home/video'
    })

    if (res.data.status === 0) {
      this.setData({
        videos: res.data.message
      })
    }
  },

  switchmailList() {
    wx.switchTab({
      url: '/pages/mailList/mailList',
    })
  }
})