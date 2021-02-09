Page({
  data: {
    banners: ["https://s3.ax1x.com/2021/02/08/yNjDFH.jpg", "https://s3.ax1x.com/2021/02/08/yNj0Te.jpg",
      "https://s3.ax1x.com/2021/02/08/yNjwwD.jpg", "https://s3.ax1x.com/2021/02/08/yNjdeO.jpg"
    ],
    value:''
  },
  onCancel:function(){
    console.log('点击了取消按钮');
  }, 
  onSearch: function(){
    console.log(this.value);
    wx.navigateTo({
      url: '../searchPage/searchPage',
    })
  },
  onFocus: function(){
    console.log(111);
  },
  onLoad: function () {

  },
  onShow(){
    this.getTabBar().init()
  }
})