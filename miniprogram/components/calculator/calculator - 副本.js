// components/calculator/calculator.js
import { calCommonExp } from "../../utils/rpn.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    panelMsg: [
      7,8,9,"C",
      4,5,6,"+",
      1,2,3,"-",
      ".",0,"Del","OK"
    ],
    // 显示数字
    totalCount: "0"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 隐藏面板
    hidePanel: function () {
      let eventDetail = {
        hidePanel: true
      }
      this.triggerEvent('hidePanel', eventDetail)
    },
    calculate: function (e) {
      let that = this
      let calculateMsg = e.currentTarget.dataset.calculateMsg
      let lastNumber = ("" + this.data.totalCount).substring(("" + this.data.totalCount).length - 1)
      if (typeof calculateMsg === "number" && lastNumber !== ".") { //数字
        if (lastNumber == 0) {
          this.setData({
            totalCount: calculateMsg
          })
        } else {
          this.setData({
            totalCount: "" + this.data.totalCount + calculateMsg
          })
        }
      } else if (calculateMsg !== "Del" && lastNumber === "." && calculateMsg !== "OK") {
        this.setData({
          totalCount: this.data.totalCount + calculateMsg
        })
      } else { //非数字
        switch (calculateMsg) {
          case "C":
            this.setData({
              totalCount: "0",
              panelMsg: [
                7, 8, 9, "C",
                4, 5, 6, "+",
                1, 2, 3, "-",
                ".", 0, "Del", "OK"
              ]
            })
            break;
          case "+":            
            if (lastNumber != "+" && lastNumber != "-" && lastNumber != ".") { //是数字才添加
              this.setData({
                panelMsg: [
                  7, 8, 9, "C",
                  4, 5, 6, "+",
                  1, 2, 3, "-",
                  ".", 0, "Del", "="
                ],
                totalCount: this.data.totalCount + "+"
              })
            }            
            break;
          case "-":
            if (lastNumber != "+" && lastNumber != "-" && lastNumber != ".") { //是数字才添加
              this.setData({
                panelMsg: [
                  7, 8, 9, "C",
                  4, 5, 6, "+",
                  1, 2, 3, "-",
                  ".", 0, "Del", "="
                ],
                totalCount: this.data.totalCount + "-"
              })
            }   
            break;
            case ".":       
            if (lastNumber === "+" || lastNumber === "-") { //最后一位是 + 或 -
              this.setData({
                totalCount: this.data.totalCount + "0" + "."
              })
            } else if (!isNaN(lastNumber)) { //最后一位是数字
              console.log(lastNumber)
              this.setData({
                totalCount: this.data.totalCount + "."
              })
            }
              break;
            case "Del":            
              if (lastNumber == 0 || ("" + this.data.totalCount).length == 1) {
                this.setData({
                  totalCount: "0"
                })
              } else {                
                this.setData({
                  totalCount: ("" + this.data.totalCount).substring(0, ("" + this.data.totalCount).length - 1)
                })
                if (("" + this.data.totalCount).indexOf("+") == -1 && ("" + this.data.totalCount).indexOf("-") == -1) {
                  this.setData({
                    panelMsg: [
                      7, 8, 9, "C",
                      4, 5, 6, "+",
                      1, 2, 3, "-",
                      ".", 0, "Del", "OK"
                    ]
                  })
                }        
              }
              break;
            case "=":
              let tempObj = ""
              if (lastNumber === "." || lastNumber == "+" || lastNumber == "-") {
                this.setData({
                  totalCount: this.data.totalCount + "0"
                })
                tempObj += calCommonExp(this.data.totalCount)
                this.setData({
                  totalCount: tempObj,
                  panelMsg: [
                    7, 8, 9, "C",
                    4, 5, 6, "+",
                    1, 2, 3, "-",
                    ".", 0, "Del", "OK"
                  ]
                })
              } else {
                let tempObj = ""
                tempObj += calCommonExp(this.data.totalCount)
                this.setData({
                  totalCount: tempObj,
                  panelMsg: [
                    7, 8, 9, "C",
                    4, 5, 6, "+",
                    1, 2, 3, "-",
                    ".", 0, "Del", "OK"
                  ]
                })
              }
              break;
            case "OK":
              this.hidePanel()
              this.triggerEvent('calculate', this.data.totalCount)
              wx.showTabBar()
              break;
        }
      }
    }
  }
})
