// miniprogram/pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    nickName: "",
    avatarID: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this    
    wx.getStorage({
      key: 'localavatarUrl',
      success: function(res) {
        that.setData({
          avatarID: res.data
        })
        wx.cloud.downloadFile({
          fileID: that.data.avatarID,
          success: res => {
            console.log(res)
          }
        })
      },
    })
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName
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
          cloudPath: `./avatar/${app.globalData.userInfo.nickName}`,
          filePath: tempFilePath,
          success: res => {
            wx.hideLoading()
            that.setData({
              avatarUrl: tempFilePath
            })
            wx.setStorage({
              key: 'localavatarUrl',
              data: res.fileID,
            })
            console.log(res)
          },
          fail: error => {
            console.log(error)
          }      
        })
      },
    })
  }
})