//index.js
const app = getApp()

Page({
  data: {
    
  },

  onLoad: function() {
    wx.getUserInfo({
      success: res => {
        console.log(res)
        app.globalData.userInfo = res.userInfo
        wx.reLaunch({
          url: '../home/home',
        })
      }
    })  
  },
})
