// miniprogram/pages/accountType/accountType.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calculateRes: 0,
    currentTab: 0,
    toHidePanel: true,
    allTypes: [
      ["食物&餐饮", "零食", "交通", "通信", "网购", "聚餐", "房租", "医疗", "随礼", "学习", "食物&餐饮", "零食", "交通", "通信"],
      ["工资", "投资", "奖金", "利息", "彩礼"],
      ["微信", "支付宝", "京东金融", "银行卡"]
    ],
    currentType: [],
    // 符号显示
    accountType: ["-","+",""],
    // 选中显示
    userChoice: "",
    // 备注内容
    remarkContent: "",
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      calculateRes: options.calculateRes,
      userChoice: this.data.allTypes[this.data.currentTab][0]
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
    let current = e.detail.current
    this.setData({
      currentTab: e.detail.current,
      userChoice: this.data.allTypes[current][0]
    })
  },
  // tab切换
  switchTab: function (e) {
    let current = e.target.dataset.currentIndex
    if (this.data.currentTab === current) {
      return false
    } else {
      this.setData({
        currentTab: current,
        userChoice: this.data.allTypes[current][0]
      })
    }
  },
  onHidePanel: function (e) {
    console.log(e)
    if (e.detail.hidePanel) {
      this.setData({
        toHidePanel: !this.data.toHidePanel
      })
    }
  },
  showTypePanel: function (e) {
    // console.log(e)
    let index = e.target.dataset.index
    // console.log(index)
    this.setData({
      toHidePanel: false,
      currentType: this.data.allTypes[index]
    })
  },
  // 监听选择类型
  onChooseType: function (e) {
    this.setData({
      userChoice: e.detail.choice
    })
  },
  // 记录备注内容
  inputContent: function (e) {
    this.setData({
      remarkContent: e.detail.value
    })
  },
  // 提交记录
  submitRecord: function () {
    // console.log(this.data.remarkContent)
    // console.log(this.data.userChoice)
    let that = this
    wx.cloud.callFunction({
      name: "addAccountRecord",
      data: {
        fee: that.data.calculateRes,
        account_type: that.data.currentTab,
        account_description: that.data.userChoice,
        remark_content: that.data.remarkContent
      }
    }).then(res => {
      console.log(res)
      that.setData({
        remarkContent: "",
        userChoice: that.data.allTypes[that.data.currentTab][0]
      })
      wx.navigateBack()
    }).catch(error => {
      console.log(error)
    })
    // const db = wx.cloud.database()
    // db.collection("Account_Book").get().then(res => {
    //   console.log(res)
    // }).catch(error => {
    //   console.log(error)
    // })
  }
})