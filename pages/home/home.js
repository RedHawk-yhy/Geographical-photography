// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    autograph:'这个人很懒，什么都没有留下!',
    isAutoGraph:false,
    autographIpt:'',
    errorMessage:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
      this.setData({
        autograph:this.data.autographIpt
      })
    }
    
  },
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
                      that.setData({
                        userInfo: res.userInfo
                      })
                      console.log(that.data.userInfo);
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
  exits() {
    const that = this
    wx.showModal({
      title: "您确定要退出么？",
      success(res) {
        if (res.confirm) {
          that.setData({
            userInfo: null
          })
        }
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