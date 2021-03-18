// pages/buNow/buyNow.js
const { request } = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:{},
    num:1,
    totalPrice:Number,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const { id } = options
    await this.loadData(id)
  },
  async loadData(id){
    const { data } = await request(`http://localhost:8088/api/v1/goods/${id}`)
    // data.price = Number(data.price)
    this.setData({
      value:data
    })
  },
  add(){
    this.setData({
      num:this.data.num + 1
    })
  },
  sub(){
    this.setData({
      num:this.data.num - 1
    })
  },
  onSubmit(){
    this.setData({
      totalPrice:this.data.num * this.data.value.price
    })
    const carts = wx.getStorageSync('carts')
    console.log(carts);
    const order = this.data.value
    order.num = this.data.num
    order.totalPrice = this.data.totalPrice
    console.log(order);
    if(carts && carts.length > 0){
      carts.unshift(order)
      wx.setStorageSync('carts', carts)
    }else{
      const carts = []
      carts.push(order)
      wx.setStorageSync('carts', carts)
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})