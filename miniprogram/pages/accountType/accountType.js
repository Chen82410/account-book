// miniprogram/pages/accountType/accountType.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calculateRes: 0,
    currentTab: 0
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      calculateRes: options.calculateRes
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
  // 轮播图改变 itemChange
  itemChange: function (e) {
    this.setData({
      currentTab: e.detail.current
    })
  },
  // tab切换
  switchTab: function (e) {
    let current = e.target.dataset.current
    if (this.data.currentTab === current) {
      return false
    } else {
      this.setData({
        currentTab: current
      })
    }
  }
})