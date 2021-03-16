const { request } = require('../../utils/request')
const app = getApp() // 获取App实例，关联app.js 用来获取globalData数据
// const axios = require('axios')
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
Page({
  data: {
    banners: ["https://s3.ax1x.com/2021/02/08/yNjDFH.jpg", "https://s3.ax1x.com/2021/02/08/yNj0Te.jpg",
      "https://s3.ax1x.com/2021/02/08/yNjwwD.jpg", "https://s3.ax1x.com/2021/02/08/yNjdeO.jpg"
    ],
    value:'',
    daily:[],
    isSearch:false,
    searchList:[]
  },
  onCancel:function(){
    this.setData({
      isSearch:false
    })
  }, 
  onSearch: function(e){
    try {
      var value = wx.getStorageSync('searchList')
      const isLogined = wx.getStorageSync('login')
      if (value && isLogined ) {
        if(value.indexOf(e.detail) === -1){
          value.push(e.detail)
          wx.setStorage({
            data: value,
            key: 'searchList',
          })
          this.setData({
            searchList:value
          })
        }
      }else if(isLogined){
        const arr = []
        arr.push(e.detail)
        this.setData({
          searchList:arr
        })
        wx.setStorage({
          key: 'searchList',
          data: this.data.searchList
        })
      }
    } catch (e) {
      console.log(e);
    }
    wx.navigateTo({
      url: `../searchPage/searchPage?value=${e.detail}`,
    })
  
  },
  searchByTag(e){
    wx.navigateTo({
      url: `../searchPage/searchPage?value=${e.target.dataset.txt}`,
    })
  },
  onFocus: function(){
    const isLogined = wx.getStorageSync('login')
    this.setData({
      isSearch:true
    })
    if(isLogined){
      const that = this
      wx.getStorage({
        key: 'searchList',
        success(res){
          that.setData({
            searchList:res.data
          })
        }
      })
    }else{
      this.setData({
        searchList: []
      })
    }
  },
  loadDaliyData(){
    const daliyDataList = []
    request('http://localhost:8088/api/v1/strategy',{ page:1,size:100 })
      .then(res => {
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
  delMarks(){
    const that = this
    Dialog.confirm({
      // title: '标题',
      message: '您确定要清空搜索记录么？',
    }).then(()=>{
      that.setData({
        searchList:[]
      })
      wx.setStorage({
        data: that.data.searchList,
        key: 'searchList',
      })
    }).catch((e) => {
      console.log(e);
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
    this.setData({
      isSearch:false
    })
  },
})