// pages/home/home.js
const {
  request
} = require('../../utils/request')
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    autograph: '请先登录哟',
    isAutoGraph: false,
    autographIpt: '',
    errorMessage: '',
    starsList: [],
    footMark: [],
    products: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserProfile()
  },
  editAutograph() {
    this.setData({
      isAutoGraph: true,
      autographIpt: this.data.autograph ? this.data.autograph : ''
    })
  },
  getAutographIptValue() {
    if (this.data.autographIpt === '') {
      this.setData({
        errorMessage: '输入内容不能为空！',
        isAutoGraph: true
      })
    } else {
      request(`http://localhost:8088/api/v1/user/updateMark?nickName=${ this.data.userInfo.nickName }`, {
        autograph: this.data.autographIpt
      }, 'POST').then(res => {
        if (res.data.code === 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
        }
      })
      this.setData({
        autograph: this.data.autographIpt
      })
    }

  },
  //  获取用户信息方法
  getUserProfile() {
    if (!this.data.userInfo) {
      const that = this
      wx.getUserProfile({
        desc: '用于使用更多功能', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
          })
          wx.setStorageSync('login', true)
          request('http://localhost:8088/api/v1/user').then((result) => {
            const thisUser = result.data.find(item => res.userInfo.nickName === item.nickName)
            if (thisUser) {
              that.setData({
                autograph: thisUser.autograph
              })
            }
            const arr = result.data.map(item => item.nickName)
            that.getStars()
            that.getfootMark()
            that.getProducts()
            if (arr.indexOf(res.userInfo.nickName) === -1) {
              request('http://localhost:8088/api/v1/user', {
                  nickName: res.userInfo.nickName,
                  autograph: that.data.autograph
                }, 'POST')
                .then(val => {
                  console.log(val.data.msg);
                })
            }
          })
        }
      })
    }
  },
  //  退出方法
  exits() {
    const that = this
    wx.showModal({
      title: "您确定要退出么？",
      success(res) {
        if (res.confirm) {
          that.setData({
            userInfo: null,
            autograph: '请先登录哟！',
            starsList: [],
            footMark: [],
            products: []
          })
          wx.setStorageSync('login', false)
        }
      }
    })
  },
  getStars() {
    const dataList = wx.getStorageSync('stars')
    this.setData({
      starsList: dataList
    })
  },
  getfootMark() {
    const dataList = wx.getStorageSync('footMark')
    this.setData({
      footMark: dataList
    })
  },
  getProducts() {
    const dataList = wx.getStorageSync('products')
    this.setData({
      products: dataList
    })
  },
  handleDel(e) {
    Dialog.confirm({
      // title: '标题',
      message: '您确定要取消收藏么？',
    }).then(() => {
      const stars = wx.getStorageSync('stars')
      const index = stars.findIndex(item => item._id === e.target.dataset.id)
      stars.splice(index, 1)
      wx.setStorageSync('stars', stars)
      this.setData({
        starsList: stars
      })
    }).catch(() => {

    })
  },
  delFootMark() {
    const that = this
    const isLogined = wx.getStorageSync('login')
    if (isLogined) {
      const footMark = wx.getStorageSync('footMark')
      if (footMark && footMark.length > 0) {
        Dialog.confirm({
          message: '您确定要清空足迹么？'
        }).then(() => {
          wx.setStorageSync('footMark', [])
          that.setData({
            footMark: []
          })
        }).catch(() => {})
      } else {
        Notify({
          type: 'primary',
          message: '暂无足迹',
          duration: 2000
        });
      }
    } else {
      Notify({
        type: 'danger',
        message: '请先登录',
        duration: 3000,
        onClose: () => {
          this.getUserProfile()
        }
      });
    }
  },
  onClose(e) {
    const {
      position,
      instance
    } = e.detail;
    switch (position) {
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          const stars = wx.getStorageSync('stars')
          const index = stars.findIndex(item => item._id === e.currentTarget.dataset.id)
          stars.splice(index, 1)
          wx.setStorageSync('stars', stars)
          this.setData({
            starsList: stars
          })
          instance.close();
        }).catch(() => {
          instance.close()
        })
        break;
    }
  },
  goDetail(e) {
    wx.navigateTo({
      url: `../skillsDetail/skillsDetail?id=${ e.currentTarget.dataset.id }`,
    })
  },
  /**
   * 确认收货
   */
  submitOrder(e) {
    const that = this
    Dialog.confirm({
        message: '确认收货么？',
      })
      .then(() => {
        const products = wx.getStorageSync('products')
        const arr = []
        products.forEach(item => arr.push(item._id))
        const index = arr.findIndex(item => item === e.currentTarget.dataset.id)
        products.splice(index, 1)
        wx.setStorageSync('products', products)
        Toast.success('确认收货成功');
        that.setData({
          products: products
        })
      })
      .catch(() => {});
  },
  switchToCart() {
    wx.navigateTo({
      url: '../cart/cart',
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
    const isLogined = wx.getStorageSync('login')
    if(!isLogined){
      this.getUserProfile()
    }
    if (this.data.userInfo) {
      const stars = wx.getStorageSync('stars')
      this.setData({
        starsList: stars
      })
      const footMark = wx.getStorageSync('footMark')
      this.setData({
        footMark: footMark
      })
      const products = wx.getStorageSync('products')
      this.setData({
        products: products
      })
    }

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