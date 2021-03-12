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
  onSearch: function(e){
    wx.navigateTo({
      url: `../searchPage/searchPage?value=${e.detail}`,
    })
  },
  onFocus: function(){
    console.log(111);
  },
  loadDaliyData(){
    const daliyDataList = []
    request('http://localhost:8088/api/v1/strategy',{ page:1,size:100 })
      .then(res => {
        console.log(res);
        let countNums = []
        while(daliyDataList.length < 4){
          const num = Math.floor(Math.random()*res.data.success.length)
          if(countNums.indexOf(num) === -1){
            countNums.push(num)
            daliyDataList.push(res.data.success[num])
          }
        }
        this.setData({
          daily:daliyDataList
        })
      })
  },
  picView(e){
    const url = e.target.dataset.url
    const previewImageArr = [];
    previewImageArr.push(url)
    wx.previewImage({
      current:url,
      urls: previewImageArr,
    })
  },
  onLoad: function () {
    console.log(app.globalData);
    this.loadDaliyData()
  },
  onShow(){
    this.getTabBar().init()
  },
})