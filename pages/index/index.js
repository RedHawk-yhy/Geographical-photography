Page({
  data: {
    banners: ["https://s3.ax1x.com/2021/02/08/yNjDFH.jpg", "https://s3.ax1x.com/2021/02/08/yNj0Te.jpg",
      "https://s3.ax1x.com/2021/02/08/yNjwwD.jpg", "https://s3.ax1x.com/2021/02/08/yNjdeO.jpg"
    ],
    value:'',
    daily:[{image:'https://s3.ax1x.com/2021/02/08/yNjDFH.jpg',content:'我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字'},{image:'https://s3.ax1x.com/2021/02/08/yNj0Te.jpg',content:'我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字'},{image:'https://s3.ax1x.com/2021/02/08/yNjwwD.jpg',content:'我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字'},{image:'https://s3.ax1x.com/2021/02/08/yNjdeO.jpg',content:'我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字我是文字'}]
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
    // this.getData()
  },
  onShow(){
    this.getTabBar().init()
  },
  // getData:function () {
  //   wx.request({
  //     url: 'http://localhost:8088/data',
  //     success:(res) => {
  //       console.log(res.data);
  //     }
  //   })
  // }
})