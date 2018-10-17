//index.js
const app = getApp()

Page({
  data: {
    
  },

  onLoad: function() {
    wx.login({
      success: res => {
        console.log(res)
      },
      fail: error => {
        console.log(error)
      }
    })


    // wx.getUserInfo({
    //   success: res => {
    //     console.log(res)
    //     app.globalData.userInfo = res.userInfo
    //     wx.reLaunch({
    //       url: '../home/home',
    //     })
    //   },
    //   fail: error => {
    //     console.log(error)
    //   }
    // })  
  },
})
