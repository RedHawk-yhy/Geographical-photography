// pages/cart/cart.js
const { request } = require('../../utils/request')
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts:[],
    result:[],
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
  },
  loadData(){
    const carts = wx.getStorageSync('carts')
    this.setData({
      carts
    })
    console.log(this.data.carts);
  },
  handleAdd(e){
    const { id } = e.currentTarget.dataset 
    const carts = wx.getStorageSync('carts')
    const index = carts.findIndex(item => item._id === id)
    carts[index].num += 1
    wx.setStorageSync('carts', carts)
    this.setData({
      carts
    })
    this.countMoney()
  },
  handleMinus(e){
    const { id } = e.currentTarget.dataset 
    const carts = wx.getStorageSync('carts')
    const index = carts.findIndex(item => item._id === id)
    carts[index].num -= 1
    wx.setStorageSync('carts', carts)
    this.setData({
      carts
    })
    this.countMoney()
  },
  onChange(event) {
    this.setData({
      result: event.detail,
    });
    console.log(this.data.result);
    if(this.data.result.length > 0){
      this.countMoney()
    }else{
      this.setData({
        totalNum:0
      })
    }
  },
  countMoney(){
    this.setData({
      totalNum:0
    })
    const carts = wx.getStorageSync('carts')
      this.data.result.forEach(item => {
        const obj = carts.find(value => item === value._id)
        let sum = this.data.totalNum
        sum += obj.num * obj.price * 100
        this.setData({
          totalNum: sum
        })
      })
  },
  onClickButton(){
    const that = this
    Dialog.confirm({
      message: '确认购买么？',
    }).then(()=>{
      that.data.result.forEach( async function(item){
        const { data } = await request(`http://localhost:8088/api/v1/goods/${item}`)
        const products = wx.getStorageSync('products')
        const carts = wx.getStorageSync('carts')
        const thisCart = carts.find(value => value._id === item)
        data.num = thisCart.num
        products.push(data)
        wx.setStorageSync('products', products)
        const index = carts.findIndex(value => value._id === item)
        carts.splice(index,1)
        wx.setStorageSync('carts', carts)
      })
      Toast({
        type: 'success',
        message: '购买成功',
        onClose: () => {
          wx.switchTab({
            url: '../home/home',
          })
        },
      })
    }).catch(()=>{})
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