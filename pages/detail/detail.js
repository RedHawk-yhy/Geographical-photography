// pages/detail/detail.js
const { request } = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request(`http://localhost:8088/api/v1/find/${options.id}`)
      .then(res => {
        this.setData({
          value:res.data
        })
        let footMark = wx.getStorageSync('footMark')
        if(footMark && footMark.length > 0){
          let arr = []
          footMark.forEach(item => {
            arr.push(item._id)
          })
          if(arr.indexOf(options.id) > -1){
            const index = arr.findIndex(item => item === options.id)
            footMark.splice(index,1)
            footMark.unshift(this.data.value)
            wx.setStorageSync('footMark', footMark)
          }else{
            footMark.unshift(this.data.value)
            wx.setStorageSync('footMark', footMark)
          }
        }else{
          let footMark = []
          footMark.unshift(this.data.value)
          wx.setStorageSync('footMark', footMark)
        }
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