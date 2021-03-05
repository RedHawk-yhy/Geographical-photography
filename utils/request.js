/**
 * 网络请求封装
 * http://net-music.penkuoer.com/banner
 * @param {*} url 
 * @param {*} data 
 * @param {*} method 
 */

function request(url,data,method = 'GET'){
  return new Promise((resolve,reject) => {
    wx.request({
      url,
      method,
      data,
      success:resolve,
      fail:reject
    })
  })
}

module.exports = {
  request
}