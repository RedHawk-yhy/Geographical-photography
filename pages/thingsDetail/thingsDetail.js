// pages/thingsDetail/thingsDetail.js
const { request } = require('../../utils/request')
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:{},
    showShare: false,
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: '微博', icon: 'weibo' },
      { name:'QQ', icon:'qq' },
      { name: '复制链接', icon: 'link' },
      { name: '分享海报', icon: 'poster' },
      { name: '二维码', icon: 'qrcode' },
    ],
    showNum:false,
    showNumValue:{},
    num:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await this.loadData(options.id)
  },
  async loadData(id){
    const { data } = await request(`http://localhost:8088/api/v1/goods/${id}`)
    this.setData({
      value:data
    })
  },
  onShareClick() {
    const isLogined = wx.getStorageSync('login')
    if(isLogined){
      this.setData({ showShare: true });
    }else{
      Notify({ 
        type: 'danger', 
        message: '请先登录', 
        duration: 3000,
        onClose:() => {
          wx.switchTab({
            url: '../home/home',
          })
        }
      });
    }
    
  },
  buyNowClick(e){
    const isLogined = wx.getStorageSync('login')
    if(isLogined){
      wx.navigateTo({
        url: `../buyNow/buyNow?id=${e.currentTarget.dataset.id}`,
      })
    }else{
      Notify({ 
        type: 'danger', 
        message: '请先登录', 
        duration: 3000, 
        onClose:()=>{
          wx.switchTab({
            url: '../home/home',
          })
        }
      });
      
    }
  },

  // 分享点击事件
  onClose() {
    this.setData({ showShare: false });
  },
  onSelect(event) {
    Toast(event.detail.name);
    this.onClose();
  },
  handleMyCart(){
    const isLogined = wx.getStorageSync('login')
    if(isLogined){
      wx.navigateTo({
        url: '../cart/cart',
      })
    }else{
      Notify({ 
        type: 'danger', 
        message: '请先登录', 
        duration: 3000, 
        onClose:()=>{
          wx.switchTab({
            url: '../home/home',
          })
        }
      });
    }
    
  },
  addToCart(){
    const isLogined = wx.getStorageSync('login')
    if(isLogined){
      const obj = this.data.value
      this.setData({
        showNum:true,
        showNumValue:obj
      })
    }else{
      Notify({ 
        type: 'danger', 
        message: '请先登录', 
        duration: 3000, 
        onClose:()=>{
          wx.switchTab({
            url: '../home/home',
          })
        }
      });
    }
    
  },
  handleMinus(){
    this.setData({
      num : this.data.num - 1
    })
  },
  handleAdd(){
    this.setData({
      num : this.data.num + 1
    })
  },
  onSubmit(){
    const carts = wx.getStorageSync('carts')
    if(carts && carts.length > 0){
      const obj = this.data.showNumValue
      const arr = []
      carts.forEach(item => {
        arr.push(item._id)
      })
      if(arr.indexOf(obj._id) > -1 ){
        const index = carts.findIndex(item => item._id === obj._id)
        carts[index].num += this.data.num
        wx.setStorageSync('carts', carts)
      }else{
        obj.num = this.data.num
        carts.push(obj)
        wx.setStorageSync('carts', carts)
      }
    }else{
      const carts = []
      const obj = this.data.showNumValue
      obj.num = this.data.num
      carts.push(obj)
      wx.setStorageSync('carts', carts)
    }
    wx.navigateTo({
      url: '../cart/cart',
    })
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