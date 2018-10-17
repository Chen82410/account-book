export function formatDate(time) {
  let today = getMillisecond(new Date().toLocaleDateString());

  if (today - getMillisecond(time) > 1000 * 60 * 60 * 24 * 2) { //具体日期
    return getYMD(time)
  } else if (today - getMillisecond(time) > 1000 * 60 * 60 * 24) { //前天
    return "2天前" + getHoursAndMinutes(time, 10, 16)
    // return "2天前"
  } else if (today - getMillisecond(time) < 0) { //今天
    return "今天" + getHoursAndMinutes(time, 10, 16)
    // return "今天"
  } else {
    return "1天前" + getHoursAndMinutes(time, 10, 16)
    // return "1天前"
  }
}

function getMillisecond(strtime) {
  var date = new Date(strtime.replace(/-/g, '/'))
  return date.getTime()
}

function getHoursAndMinutes(time, start, stop) {
  var newTime = time.substring(start, stop)
  return newTime
}

function getYMD(time) {
  // return time.substring(0, 16)
  // return time.substring(5, 16)
  return time.substring(5, 10)
}

// 处理时间 formatTimeToHHMMSS
export function formatTimeToHHMMSS(date) {
  return pad2(date.getHours()).toString() + pad2(date.getMinutes()) + pad2(date.getSeconds())
}
function pad2(n) {
  return n < 10 ? '0' + n : n
}