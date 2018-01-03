//index.js
//获取应用实例
var util = require('../../utils/util')
var app = getApp()
Page({
  name: "index",
  data: {
    rate: 15,
    term: 12,
    total_amount: 5000,
    type: 1,
    res_amount: 0,
    res_term: 0,
    res_payment: 0,
    res_interest: 0,
    res_total: 0,
    res_step: 0,
    step_hide: 'display: none',
    type_text: '每月还款',
    detail_text: '本金',
    reslist: [],
    detail_hide: 'display: none',
    res_hide: 'display: none',
    compute_disable: false
  },
  // //事件处理函数
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  radioChange: function (event) {
    this.setData({
      type: event.detail.value
    })
  },
  bindinput_amount: function (e) {
    this.setData({
      total_amount: e.detail.value
    })
  },
  bindinput_term: function (e) {
    this.setData({
      term: e.detail.value
    })
    console.info(this.data.rate + '---' + this.data.term)
    this.vlidata()
  },
  bindinput_rate: function (e) {
    this.setData({
      rate: e.detail.value
    })
    console.info(this.data.rate + '---' + this.data.term)
    this.vlidata()
  },
  show_detail: function (e) {
    this.setData({
      detail_hide: 'display: none',
      res_hide: 'display: block'
    })
  },
  vlidata: function () {
    if (this.data.rate != 0 && this.data.term != 0) {
      this.setData({
        compute_disable: false
      })
    } else {
      this.setData({
        compute_disable: true
      })
    }
  },
  onReset: function (e) {
    this.setData({
      rate: 0,
      term: 0,
      total_amount: 0,
      type: 1,
      res_amount: 0,
      res_term: 0,
      res_payment: 0,
      res_interest: 0,
      res_total: 0,
      type_text: '每月还款',
      detail_text: '本金',
      reslist: [],
      detail_hide: 'display: none',
      res_hide: 'display: none',
      compute_disable: true
    })
  },
  onCompute: function (e) {
    var res;
    if (this.data.type == 1) {
      res = util.debx(this.data.total_amount, this.data.rate, this.data.term, 1, 1)
    } else {
      res = util.debj(this.data.total_amount, this.data.rate, this.data.term, 1, 1)
    }
    // console.info(res)
    var details = []
    var that = this
    res.details.forEach(function (v, i) {
      var detail = new Object()
      detail.term = v.term
      detail.interest = new Number(v.interest).toFixed(2)
      detail.payment = that.data.type == 1 ? new Number(v.capital).toFixed(2) : new Number(v.payment).toFixed(2)
      detail.balance = new Number(v.balance).toFixed(2)
      details[i] = detail
    })
    this.setData({
      res_amount: this.data.total_amount,
      res_term: this.data.term,
      res_payment: this.data.type == 1 ? new Number(res.payment).toFixed(2) : new Number(res.first_payment).toFixed(2),
      res_interest: new Number(res.interest).toFixed(2),
      res_total: new Number(res.total).toFixed(2),
      type_text: this.data.type == 1 ? '每月还款' : '首月还款',
      detail_text: this.data.type == 1 ? '本金' : '还款',
      reslist: details,
      detail_hide: 'display: block',
      res_hide: 'display: none',
      step_hide: this.data.type == 1 ? 'display: none' : 'display: flex',
      res_step: this.data.type == 1 ? 0 : new Number(res.step).toFixed(2)
    })
    wx.request({
      url: 'https://www.tanyi.lol/getImages',
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  onLoad: function () {
    // this.vlidata()
  }
})
