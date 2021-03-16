// pages/PhotographySkills/PhotographySkills.js
import { request } from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    pagination:{
      page:1,
      size:8,
    },
    total:0,
    ischeck:'1'
  },
  handleDetail(e){
    wx.navigateTo({
      url: `../skillsDetail/skillsDetail?id=${ e.target.dataset.id }`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData('http://localhost:8088/api/v1/skills',this.data.pagination)
    console.log(options);
  },
  loadData(url,data){
    request(url,data)
      .then(res => {
        const listMiddle = this.data.list
        const stars = wx.getStorageSync('stars')
        let arr = []
        if(stars){
          stars.forEach(item => {
            arr.push(item._id)
          })
        }
        for(let i = 0 ; i < res.data.success.length ; i++){
          for(let j = 0 ;j < arr.length ; j++){
            if(arr.indexOf(res.data.success[i]._id) > -1){
              res.data.success[i].checked = true
            }else{
              res.data.success[i].checked = false
            }
          }
          listMiddle.push(res.data.success[i])
        }
        this.setData({
          list:listMiddle,
          total:res.data.pagination.total
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
    if(this.data.pagination.page < this.data.total / this.data.pagination.size){
      this.setData({
      pagination:{
        page: this.data.pagination.page + 1,
        size:8
      }
      })
      this.loadData('http://localhost:8088/api/v1/skills',this.data.pagination)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})