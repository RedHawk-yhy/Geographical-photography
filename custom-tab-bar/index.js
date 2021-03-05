// custom-tab-bar/index.js
Component({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    list:[
      {
        "url":"/pages/index/index",
        "icon":"home-o",
        "text":"首页"
      },
      {
        "url":"/pages/find/find",
        "icon":"eye-o",
        "text":"发现"
      },
      {
        "url":"/pages/home/home",
        "icon":"contact",
        "text":"个人中心"
      }
    ]
  },
  methods:{
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      this.setData({
        active: event.detail
      });
      wx.switchTab({
        url: this.data.list[event.detail].url,
      })
    },
    init(){
      const page = getCurrentPages().pop()
      this.setData({
        active:this.data.list.findIndex(item => item.url === `/${page.route}`)
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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