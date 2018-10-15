// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const allBooks = ["expenditure_book", "income_book", "transfer_book"]

let threeTypesResult = new Array(3)

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    for (let index in allBooks) {
      await db.collection(allBooks[index])
        .orderBy("create_time", "desc")
        .where({
          open_id: event.userInfo.openId
      }).get()
        .then(res => {
          threeTypesResult[index] = res
        })
    }
    return threeTypesResult
  } catch (error) {
    console.log(error)
  }
}