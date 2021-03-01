// pages/find/find.js
import { request } from '../../utils/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataSet:[],
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
    const that = this
    request('http://localhost:8088/api/v1/p')
      .then(res => {
        console.log(res.data);
        const dataChange = []
        res.data.forEach(item => {
          const data = {}
          const images = []
          images.push(item.image)
          data.id = item._id,
          data.images = images,
          data.content = item.content,
          data.author = item.author
          dataChange.push(data)
        })
        that.setData({
          dataSet:dataChange
        })
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