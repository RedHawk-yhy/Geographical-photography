// pages/home/home.js
const { request } = require('../../utils/request')
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    autograph:'请先登录哟',
    isAutoGraph:false,
    autographIpt:'',
    errorMessage:'',
    starsList:[],
    footMark:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    wx.getSetting({
      success(res){
        if(res.authSetting['scope.userInfo']){
          that.getUserInfo()
        }
      }
    })
  },
  editAutograph(){
    this.setData({
      isAutoGraph:true,
      autographIpt:this.data.autograph ? this.data.autograph : ''
    })
  },
  getAutographIptValue(){
    if(this.data.autographIpt === ''){
      this.setData({
        errorMessage:'输入内容不能为空！',
        isAutoGraph:true
      })
    }else{
      request(`http://localhost:8088/api/v1/user/updateMark?nickName=${ this.data.userInfo.nickName }`,{ autograph:this.data.autographIpt },'POST').then(res => {
        if(res.data.code === 1){
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
        }
      })
      this.setData({
        autograph:this.data.autographIpt
      })
    }
    
  },
  //  获取用户信息方法
  getUserInfo() {
    if (!this.data.userInfo) {
      const that = this
      wx.showModal({
        title: '地理摄影想要获取您的信息',
        content: '头像和昵称',
        success(res) {
          if (res.confirm) {
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                      wx.setStorageSync('login', true)
                      request('http://localhost:8088/api/v1/user').then((result) => {
                        const thisUser = result.data.find(item => res.userInfo.nickName === item.nickName)
                        that.setData({
                          autograph:thisUser.autograph
                        })
                        const arr = []
                        result.data.forEach(item =>{
                          arr.push(item.nickName)
                        })
                        that.getStars()
                        that.getfootMark()
                        if(arr.indexOf(res.userInfo.nickName) === -1){
                          request('http://localhost:8088/api/v1/user',{ nickName:res.userInfo.nickName,autograph:that.data.autograph },'POST')
                          .then(val => {
                            console.log(val);
                          })
                        }
                      })
                      that.setData({
                        userInfo: res.userInfo
                      })
                    }
                  })
                }
              }
            })
          }
        }
      })
    }
  },
  //  退出方法
  exits() {
    const that = this
    wx.showModal({
      title: "您确定要退出么？",
      success(res) {
        if (res.confirm) {
          that.setData({
            userInfo: null,
            autograph:'请先登录哟！',
            starsList:[],
            footMark:[]
          })
          wx.setStorageSync('login', false)
        }
      }
    })
  },
  getStars(){
    const dataList = wx.getStorageSync('stars')
    this.setData({
      starsList:dataList
    })
  },
  getfootMark(){
    const dataList = wx.getStorageSync('footMark')
    this.setData({
      footMark:dataList
    })
  },
  handleDel(e){
    
    Dialog.confirm({
      // title: '标题',
      message: '您确定要取消收藏么？',
    }).then(()=>{
      const stars = wx.getStorageSync('stars')
      const index = stars.findIndex(item => item._id === e.target.dataset.id)
      stars.splice(index,1)
      wx.setStorageSync('stars', stars)
      this.setData({
        starsList:stars
      })
    }).catch(()=>{
      
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
    if(this.data.userInfo){
      const stars = wx.getStorageSync('stars')
      this.setData({
        starsList:stars
      })
      const footMark = wx.getStorageSync('footMark')
      this.setData({
        footMark:footMark
      })
    }
    this.getTabBar().init()
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