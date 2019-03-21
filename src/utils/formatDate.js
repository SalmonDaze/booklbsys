import moment from "moment";

// 转化后端数据显示为日期
export function msToDate(ms) {
  // moment.duration创建时间段
  let d = moment.duration(ms);
  let years = d.years() + 1970;
  let months = d.months() < 10 ? "0" + (d.months() + 1) : d.months() + 1;
  let days = d.days() < 10 ? "0" + d.days() : d.days();
  console.log(d.days());
  return `${years}-${months}-${days}`;
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
export function remainTime(end) {
  // 格式化
  return moment(end).diff(moment(), 'days');
}
// 获取当前时间
export function getDate() {
  return Number(moment().format("x"));
}

export function unixTranstoDate(ms) {
  return moment(moment.unix(ms / 1000)).format();
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
