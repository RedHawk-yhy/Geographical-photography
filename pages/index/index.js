const { request } = require('../../utils/request')
const app = getApp() // 获取App实例，关联app.js 用来获取globalData数据
// const axios = require('axios')
Page({
  data: {
    banners: ["https://s3.ax1x.com/2021/02/08/yNjDFH.jpg", "https://s3.ax1x.com/2021/02/08/yNj0Te.jpg",
      "https://s3.ax1x.com/2021/02/08/yNjwwD.jpg", "https://s3.ax1x.com/2021/02/08/yNjdeO.jpg"
    ],
    value:'',
    daily:[]
  },
  onCancel:function(){
    console.log('点击了取消按钮');
  }, 
  onSearch: function(){
    wx.navigateTo({
      url: '../searchPage/searchPage',
    })
  },
  onFocus: function(){
    console.log(111);
  },
  loadDaliyData(){
    const daliyDataList = []
    request('http://localhost:8088/api/v1/skills')
      .then(res => {
        for(let i = 0; i < 4; i++){
          daliyDataList.push(res.data[Math.floor(Math.random()*res.data.length)])
        }
        this.setData({
          daily:daliyDataList
        })
      })
  },
  onLoad: function () {
    // request('http://net-music.penkuoer.com/banner').then(res => {
    //   console.log(res);
    // })
    console.log(app.globalData);
    this.loadDaliyData()
  },
  onShow(){
    this.getTabBar().init()
  },
})