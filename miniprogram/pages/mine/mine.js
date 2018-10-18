// miniprogram/pages/mine/mine.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    nickName: "",
    avatarID: "",
    fileID: "",
    openID: "",
    userInfo: {},
    getOauth: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this

    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          userInfo: JSON.parse(res.data),
          avatarUrl: JSON.parse(res.data).avatarUrl,
          nickName: JSON.parse(res.data).nickName
        })
      },
    })
    wx.getStorage({
      key: 'getOauth',
      success: function(res) {
        that.setData({
          getOauth: res.data
        })
      },
    })
    wx.getStorage({
      key: 'fileID',
      success: function(res) {
        console.log(res)
        wx.cloud.getTempFileURL({
          fileList: [res.data],
          success: function (response) {
            console.log(response)
            that.setData({
              avatarUrl: response.fileList[0].fileID          
            })            
          }
        })
      },
      fail: () => {
        wx.getStorage({
          key: 'userInfo',
          success: function(res) {
            let tempUserInfo = JSON.parse(res.data)
            that.setData({
              userInfo: tempUserInfo,
              avatarUrl: tempUserInfo.avatarUrl,
              nickName: tempUserInfo.nickName
            })
          },
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getAvatarUrl: function () {
    let that = this
    let tempFilePath = ""
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          openID: res.data
        })
      },
    })
    wx.getStorage({
      key: 'getOauth',
      success: function(res) {
        that.setData({
          getOauth: res.data
        })
      },
    })
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        tempFilePath = res.tempFiles[0].path
        wx.showLoading({
          title: '上传中',
        })
        wx.cloud.uploadFile({
          cloudPath: `./avatar/${that.data.openID}`,
          filePath: tempFilePath,
          success: res => {
            console.log(res)
            wx.hideLoading()
            that.setData({
              avatarUrl: tempFilePath,
              fileID: res.fileID              
            })
            wx.setStorage({
              key: 'fileID',
              data: res.fileID,
            })             
          },
          fail: error => {
            console.log(error)
          }      
        })
      },
    })
  },
  getUserInfo: function () {
    let that = this
    wx.getUserInfo({
      success: res => {
        console.log(res)
        app.globalData.userInfo = res.userInfo
        that.setData({
          avatarUrl: app.globalData.userInfo.avatarUrl,
          nickName: app.globalData.userInfo.nickName,
          getOauth: true          
        })
        wx.setStorage({
          key: 'userInfo',
          data: JSON.stringify(app.globalData.userInfo),
        })
        wx.setStorage({
          key: 'getOauth',
          data: true,
        })
      }
    })
  }
})