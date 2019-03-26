import moment from "moment";

/**
 * 剩余时间
 * @param {*} start 开始时间
 * @param {*} end 结束时间
 */
export function remainTime(end) {
  // 格式化
  return moment(end).diff(moment(), 'days');
}

/**
 *
 *处理图片路径
 * @export
 * @param {*} path
 * @returns
 */
export function formatPath(path) {
  /**
   *.split("\\") 以单个反斜杠分隔的字符串
   *.slice(2) 从已有数组中返回选定的元素，从2开始选
   * .join() 把数组中的所有元素放入一个字符串
   */
  return path.split("\\").slice(2).join("");
}
// 日期格式
export function formatTime(time) {
  return time.split('').slice(0, time.indexOf(' ')).join('')
}

// 选择日历日期格式化
export function calendarTime(date) {
  const i = '00';
  var datamonth = i + (date.getMonth() + 1);
  var dataday = i + (date.getDate());
  // datamonth.slice(datamonth.length - 2)选取月份最后两位例如3月，不截取就是003
  return date.getFullYear() + '-' + datamonth.slice(datamonth.length - 2) + '-' + dataday.slice(dataday.length - 2);
}
