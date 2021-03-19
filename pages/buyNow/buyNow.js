// pages/buNow/buyNow.js
const { request } = require('../../utils/request')
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
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
    Dialog.confirm({
      message: '确认购买么？',
    })
      .then(() => {
        this.setData({
          totalPrice:this.data.num * this.data.value.price
        })
        const products = wx.getStorageSync('products')
        const order = this.data.value
        order.num = this.data.num
        order.totalPrice = this.data.totalPrice
        if(products && products.length > 0){
          products.unshift(order)
          wx.setStorageSync('products', products)
          Toast.success('购买成功')
        }else{
          const products = []
          products.push(order)
          wx.setStorageSync('products', products)
          Toast.success('购买成功')
        }
      })
      .catch(() => {});
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