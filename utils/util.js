function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//等额本息法
function debx(total_amount, rate, term, type, show) {
  term = parseInt(term);//期数
  total_amount = parseFloat(total_amount);//贷款金额
  rate = parseFloat(rate);//年利率
  type = parseInt(type);//年利率算2，月利率算1
  show = parseInt(show);//是否显示详细
  var lv = 2 == type ? .01 * rate : rate / 12 * .01;//利率
  var s = Math.pow(1 + lv, term);//返回 x 的 y 次幂的值。
  var n = total_amount * lv * (s / (s - 1));//月还款
  var o = n * term;//还款总额
  var r = o - total_amount;
  var res = new Object;
  res.interest = r;//总利息
  res.total = o;//还款总额
  res.payment = n;//月还款
  if (1 == show) {
    var v = total_amount;
    var c = [];
    for (var i = 1; term >= i; i++) {
      var m = v * lv;
      var h = n - m;
      v -= h;
      var detail = new Object;
      detail.term = i;
      detail.interest = m;//当期利息
      detail.capital = h;//当期本金
      detail.balance = v;//余额
      c[i - 1] = detail;
    }
    res.details = c//详细
  }
  return res
}
//等额本金法
function debj(total_amount, rate, term, type, show) {
  term = parseInt(term);//期数
  total_amount = parseFloat(total_amount);//贷款金额
  rate = parseFloat(rate);//年利率
  type = parseInt(type);//年利率算2，月利率算1
  show = parseInt(show);//是否显示详细
  var lv = 2 == type ? .01 * rate : rate / 12 * .01;//利率
  var s = 0;
  var n = total_amount / term;//月本金
  var res = new Object;
  res.capital = n;//月本金
  var r = total_amount;
  var detail = [];
  for (var i = 1; term >= i; i++) {
    var yhk = total_amount / term + (total_amount - total_amount * (i - 1) / term) * lv;
    if (1 == i)
      res.first_payment = yhk;
    if (2 == i)
      res.step = res.first_payment - yhk;
    s += yhk;
    var ylx = yhk - n;
    r -= n;
    var v = new Object;
    v.term = i;
    v.interest = ylx;//当期利息
    v.payment = yhk;//当期还款
    v.balance = r;//余额
    detail[i - 1] = v;
  }
  res.interest = s - total_amount;
  res.total = s;
  if (show == 1)
    res.details = detail;
  return res;
}

module.exports = {
  formatTime: formatTime,
  debx: debx,
  debj: debj
}
