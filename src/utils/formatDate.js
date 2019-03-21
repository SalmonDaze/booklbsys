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
