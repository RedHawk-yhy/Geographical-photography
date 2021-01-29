Page({
  data: {
    banners: ["https://s1.ax1x.com/2020/10/27/BQUKhQ.jpg", "https://s1.ax1x.com/2020/10/27/BQUutg.jpg",
      "https://s1.ax1x.com/2020/10/27/BQUnAS.jpg", "https://s1.ax1x.com/2020/10/27/BQUe78.jpg"
    ],
    
  },
  
  onLoad: function () {

  },
  onShow(){
    this.getTabBar().init()
  }
})