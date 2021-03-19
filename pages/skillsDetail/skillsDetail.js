// pages/skillsDetail/skillsDetail.js
const { request } = require('../../utils/request')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:{},
    checked:false,
    isLogined:Boolean
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    const _id = options.id
    const isLogined = wx.getStorageSync('login')
    this.setData({
      isLogined: isLogined
    })
    request(`http://localhost:8088/api/v1/skills/${_id}`)
      .then(res => {
        const stars = wx.getStorageSync('stars')
        if(stars && stars.length > 0){
          let arr = []
          stars.forEach(item => {
            arr.push(item._id)
          })
          if(arr.indexOf(_id) > -1){
            that.setData({
              checked:true
            })
          }else{
            that.setData({
              checked:false
            })
          }
        }else{
          that.setData({
            checked:false
          })
        }
        this.setData({
          value:res.data
        })
        if(this.data.isLogined){
          let footMark = wx.getStorageSync('footMark')
          if(footMark && footMark.length > 0){
            let arr = []
            footMark.forEach(item => {
              arr.push(item._id)
            })
            if(arr.indexOf(_id) > -1){
              const index = arr.findIndex(item => item === _id)
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
        }
      })
  },  
  handleStar(e){
    const { _id } = this.data.value;
    const stars = wx.getStorageSync('stars')
    if(stars && stars.length > 0 ){
      let arr = []
      stars.forEach(item => {
        arr.push(item._id)
      })
      if(arr.indexOf(_id) > -1 ){
        const index = arr.findIndex(item => item === _id)
        stars.splice(index,1)
        wx.setStorageSync('stars', stars)
        this.setData({
          checked:false
        })
        wx.showToast({
          title: '取消收藏',
          duration: 2000
        })
      }else{
        stars.push(this.data.value)
        wx.setStorageSync('stars', stars)
        this.setData({
          checked:true
        })
        wx.showToast({
          title: '添加收藏',
          duration: 2000
        })
      }
    }else{
      const stars = []
      stars.push(this.data.value)
      wx.setStorageSync('stars', stars)
      this.setData({
        checked:true
      })
      wx.showToast({
        title: '添加收藏',
        duration: 2000
      })
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