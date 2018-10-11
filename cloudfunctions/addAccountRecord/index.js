// import { formatTime } from "../utils/index.js"

const cloud = require('wx-server-sdk')
// 默认配置
cloud.init()
// 或者传入自定义配置
cloud.init({
  env: 'main-130627'
})

const db = cloud.database()

const allBooks = ["expenditure_book", "income_book", "transfer_book"]

// 云函数入口函数
exports.main = async (event, context) => { 
  let res = await cloud.callFunction({
    name: "utils",
    data: {
      date: (Date.now() + 8 * 60 * 60 * 1000)
    }
  })
  try {
    return await db.collection(allBooks[event.account_type]).add({      
      data: {
        fee: event.fee,
        account_type: event.account_type,
        account_description: event.account_description,
        remark_content: event.remark_content,        
        create_time: res.result,
        open_id: event.userInfo.openId
      }
    })
  } catch (e) {
    console.error(e)
  }
}