// miniprogram/pages/home/home.js
import { formatDate } from "../../utils/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addImage: {
      src: "../../images/add.png",
    },
    calculatorShow: false,
    // 计算结果
    calculateResult: 0,
    // 三种类型
    allTypesArr: [],
    feeType: ["支出", "收入", "转账"],
    markType: ["-", "+", ""]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkAccount()
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
  // calculator面板显示
  isCalculated: function () {
    let that = this
    wx.hideTabBar()
    that.setData({
      calculatorShow: !that.data.calculatorShow
    })
  },
  // 监听事件
  onHidePanel: function (e) {
    let that = this
    console.log(e)
    if (e.detail.hidePanel) {
      this.setData({
        calculatorShow: !e.detail.hidePanel
      })
      wx.showTabBar()      
    }
  },
  // 获取计算结果
  bindCalculate: function (e) {
    // console.log(e.detail)
    this.setData({
      calculateResult: e.detail
    })
    wx.navigateTo({
      url: `../accountType/accountType?calculateRes=${this.data.calculateResult}`
    })
  },
  checkAccount: function () {
    let that = this
    wx.cloud.callFunction({
      name: "checkAccount"      
    }).then(res => {
      console.log(res)
      for (let item of res.result) {
        for (let item1 of item.data) {
          item1.create_time = formatDate(item1.create_time)
        }
      }
      that.setData({
        allTypesArr: res.result
      })
    }).catch(error => {
      console.log(error)
    })
  },
  toFeeDetail: function (e) {
    let detail = encodeURIComponent(JSON.stringify(e.currentTarget.dataset.detail))
    wx.navigateTo({
      url: `../feeDetail/feeDetail?detail=${detail}`,
    })
  }
})