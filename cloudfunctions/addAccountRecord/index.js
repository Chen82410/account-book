// import { formatTime } from "../utils/index.js"

const cloud = require('wx-server-sdk')
// 默认配置
cloud.init()
// 或者传入自定义配置
cloud.init({
  env: 'main-130627'
})

const db = cloud.database()
let create_time = ""
// 云函数入口函数
exports.main = async (event, context) => { 
  try {
    return await db.collection('Account_Book').add({      
      data: {
        fee: event.fee,
        account_type: event.account_type,
        account_description: event.account_description,
        remark_content: event.remark_content,
        // create_time: formatTime((new Date().getTime()), "Y-M-D h:m:s")
        create_time: new Date().getTime()
      }
    })
  } catch (e) {
    console.error(e)
  }
}