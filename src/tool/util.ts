
/**
 * 字符串转date类型
 * @param s 如：2022年12月1日
 */
export const stringToDate = (s: string): Date | null => {
  if (!s || s === '') {
    return null
  }
  s = s.replace('年', '/').replace('月', '/').replace('日', '')
  return new Date(s)
}

/**
 * date类型转字符串
 * @param d date对象
 * @param format 输出字符串的格式，默认：YYYY年MM月DD日
 */
export const dateToString = (d: Date, format: string): string => {
  if (!d) {
    return ''
  }
  if (!format) {
    format = 'YYYY年MM月DD日'
  }
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const date = d.getDate()
  const h = d.getHours()
  const m = d.getMinutes()
  const s = d.getSeconds()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return format.replace('YYYY', year.toString())
  .replace('MM', (month > 9 ? month : '0' + month).toString())
  .replace('DD', (date > 9 ? date : '0' + date).toString())
  .replace('HH', (h > 9 ? h : '0' + h).toString())
  .replace('mm', (m > 9 ? m : '0' + m).toString())
  .replace('SS', (s > 9 ? s : '0' + s).toString())
}

/**
 * @description 格式化金额
 * @param number：要格式化的数字
 * @param decimals：保留几位小数 默认0位
 * @param decPoint：小数点符号 默认.
 * @param thousandsSep：千分位符号 默认为,
 */
export const formatMoney = (number: string | number, decimals = 2, decPoint = '.', thousandsSep = ',') => {
  number = number.toString()
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals) // 2
  const sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep //,
  const dec = (typeof decPoint === 'undefined') ? '.' : decPoint // .
  let s: string | string[] = ''
  const toFixedFix = function (n: number, prec: number) {
    const k = Math.pow(10, prec)
    return '' + (Math.floor(n * k) / k)
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  const re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

// 倒计时计算
export const countDown = (timeStr: string, time: any) => {
  const now = new Date().getTime()

  // 设置截止时间
  const end = new Date(timeStr).getTime()
  const leftTime = end - now
  if (leftTime >= 0) {
    time.day = Math.floor(leftTime / 1000 / 60 / 60 / 24)
    const h = Math.floor((leftTime / 1000 / 60 / 60) % 24)
    time.hour = h < 10 ? '0' + h : h
    const m = Math.floor((leftTime / 1000 / 60) % 60)
    time.minute = m < 10 ? '0' + m : m
    const s = Math.floor((leftTime / 1000) % 60)
    time.second = s < 10 ? '0' + s : s
  } else {
    time.day = 0
    time.hour = '00'
    time.minute = '00'
    time.second = '00'
  }
  // 时间为0清空
  if (!(Number(time.day) <= 0 && Number(time.hour) <= 0 && Number(time.minute) <= 0 && Number(time.second) <= 0)) {
    setTimeout(() => {
      countDown(timeStr, time)
    }, 1000)
  }
}
