import moment from 'moment'

// 转化后端数据显示为日期
export function msToDate(ms) {
  // moment.duration创建时间段
  let d = moment.duration(ms)
  let years = d.years() + 1970
  let months = d.months() < 10 ? '0' + (d.months() + 1 ) : d.months() + 1
  let days = d.days() < 10 ? '0' + d.days() : d.days()
  console.log(d.days())
  return `${years}-${months}-${days}`
}
/**
 * ``模板字符串
 * ${} el表达式，可用在所有的HTML和JSP标签中作用是代替JSP页面中复杂的JAVA代码
 */

/**
 * 剩余时间
 * @param {*} start 开始时间
 * @param {*} end 结束时间
 */
export function remainTime(start, end) {
  start = Number(start)
  end = Number(end)
  // 格式化
  return (start - end) / 1000 / 60 / 60 / 24
}
// 获取当前时间
export function getDate() {
  return Number(moment().format('x'))
}

export function unixTranstoDate(ms) {
  return moment(moment.unix(ms / 1000)).format()
}