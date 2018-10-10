// components/sortType/sortType.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: Array,
      value: []
    },
    isShow: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    types: ["食物&餐饮", "零食", "交通", "通信", "网购", "聚餐", "房租", "医疗", "随礼", "学习", "食物&餐饮", "零食", "交通", "通信"]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 影藏面板
    toHide: function () {
      let startHide = {
        hidePanel: true
      }
      this.triggerEvent("toHide", startHide)
    },
    // 选择种类
    chooseType: function (e) {      
      let chooseItem = {
        choice: e.target.dataset.item
      }
      this.triggerEvent("chooseType", chooseItem)
      this.toHide()
    }
  }
})
