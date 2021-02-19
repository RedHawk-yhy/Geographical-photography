// pages/find/find.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    dataSet:[
      {
        id: '1',
        content:'这是一张关于地理摄影的图片,我的文字比较长，用来测试瀑布流布局',
        backgroundColor: '#ffffff',
        time: 1533106010,
        user: {
          username: 'Minya Chan',
          userId: '1'
        },
        liked: false,
        images: ["https://s3.ax1x.com/2021/02/08/yNjDFH.jpg"]
      },
      {
        id: '2',
        content:'这是一张关于地理摄影的图片',
        backgroundColor: '#ffffff',
        liked: false,
        images: ["https://s3.ax1x.com/2021/02/08/yNjdeO.jpg"]
      },
      {
        id: '3',
        content:'这是一张关于地理摄影的图片',
        backgroundColor: '#ffffff',
        liked: false,
        images: ["https://s3.ax1x.com/2021/02/08/yNjwwD.jpg"]
      },
      {
        id: '4',
        content:'这是一张关于地理摄影的图片',
        backgroundColor: '#ffffff',
        liked: false,
        images: ["https://s3.ax1x.com/2021/02/08/yNjwwD.jpg"]
      },
      {
        id: '5',
        content:'这是一张关于地理摄影的图片',
        backgroundColor: '#ffffff',
        liked: false,
        images: ["https://s3.ax1x.com/2021/02/08/yNj0Te.jpg"]
      },
      {
        id: '6',
        content:'这是一张关于地理摄影的图片',
        backgroundColor: '#ffffff',
        liked: false,
        images: ["https://s3.ax1x.com/2021/02/08/yNjwwD.jpg"]
      },
      {
        id: '7',
        content:'这是一张关于地理摄影的图片',
        backgroundColor: '#ffffff',
        liked: false,
        images: ["https://s3.ax1x.com/2021/02/08/yNjwwD.jpg"]
      },
    ],
    brick_option:{
      defaultExpandStatus: true,
      backgroundColor:  '#fff',
      forceRepaint: false,
      columns: 2,
      imageFillMode: 'widthFix',
      icon:{
        fill:'https://s3.ax1x.com/2021/02/19/yf0j0S.png',
        default:'https://s3.ax1x.com/2021/02/19/yf0Xm8.png'
      },
      fontColor:'#000'
    }
  },
  tapCard:function(event){
    console.log(event.detail);
  },
  tapLike:function(event){
    console.log(event.detail);
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