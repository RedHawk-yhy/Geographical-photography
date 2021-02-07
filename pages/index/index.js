Page({
  data: {
    banners: ["https://s1.ax1x.com/2020/10/27/BQUKhQ.jpg", "https://s1.ax1x.com/2020/10/27/BQUutg.jpg",
      "https://s1.ax1x.com/2020/10/27/BQUnAS.jpg", "https://s1.ax1x.com/2020/10/27/BQUe78.jpg"
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