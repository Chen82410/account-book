// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含
 * - 小程序端调用传入的 data
 * - 经过微信鉴权直接可信的用户唯一标识 openid 
 * 
 */
// https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code

const cloud = require('wx-server-sdk')
// 默认配置
cloud.init()
// 或者传入自定义配置
cloud.init({
  env: 'main-130627'
})

const db = cloud.database()

const Axios = require("axios")
const APPID = "wxd73569f666a21285"
const SECRET = "439c3e431280556f34d1538a23eda3f1"
let result = {}

exports.main = async (event, context) => {
  try {
    await Axios.get('https://api.weixin.qq.com/sns/jscode2session', {
      params: {
        appid: APPID,
        secret: SECRET,
        js_code: event.code,
        grant_type: 'authorization_code'
      }
    })
    .then(res => {
      console.log(res.data)
      result = res.data
      db.collection("login").add({
        data: {
          session_key: result.session_key,
          openid: result.openid
        }
      })
    })
    .catch(error => {
      console.log(error)
    })
  } catch (error) {
    console.log(error)
  }
  return {openid: result.openid}
}
