// pages/find/find.js
import { request } from '../../utils/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataSet:[],
    page:{  
      page:1,
      size: 6
    },
    total:0,
    // 瀑布流插件配置
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
    this.loadData('http://localhost:8088/api/v1/skills',this.data.page)
  },
  loadData(url,data){
    const that = this
    request(url,data)
      .then(res => {
        const dataChange = that.data.dataSet
        res.data.success.forEach(item => {
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
          dataSet:dataChange,
          total:res.data.pagination.total
        })
        // console.log(that.data.dataSet);
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
    if(this.data.page.page < this.data.total / this.data.page.size){
      this.setData({
      page:{
        page: this.data.page.page + 1,
        size:6
      }
      })
      this.loadData('http://localhost:8088/api/v1/skills',this.data.page)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})