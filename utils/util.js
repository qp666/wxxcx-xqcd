const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}


let tools = {
  msgBox: function (a) { //充当alert
    wx.showModal({
      title: '提示',
      content: a || '获取用户信息失败',
      showCancel: false
    })
  },
  msgToast: function (a) { //充当alert
    wx.showToast({
      title: a||'成功',
      icon: 'success',
      duration: 2000
    })
    
  },

}

const util = {
  ...tools,
}

module.exports = util;