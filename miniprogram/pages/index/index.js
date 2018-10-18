//index.js
const app = getApp()

Page({
  data: {
    openid: ""
  },

  onLoad: function() {
    let that = this
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        wx.reLaunch({
          url: '../home/home',
        })
      },
      fail: function (error) {
        wx.login({
          success: res => {
            console.log(res)
            wx.cloud.callFunction({
              name: "login",
              data: {
                code: res.code
              }
            }).then(res => {
              console.log(res)
              wx.setStorage({
                key: 'openid',
                data: res.result.openid
              })
              that.onLoad()
            }).catch(error => {
              console.log(error)
            })
          }
        })
      }
    })    
  },
})
