// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        code: ''
    },

    login: function() {
        const app = getApp();
        
        wx.login({
          timeout: 10000,

          success: (res) => {
            console.log(res);

            wx.request({
              url: 'http://127.0.0.1:5000/wxlogin',
              method: 'POST',
              dataType: 'json',
              data: {
                userCode: res.code
              },
              success: (e) => {
                  console.log('success log e')
                  console.log(e)

                  if (e.data.login == 0 & 1 ){

                      if (e.data.uuid) {
                        app.globalData.uuid = e.data.uuid
                        console.log(app.globalData.uuid)
                        wx.switchTab({
                            url: '/pages/main/main',
                        })
                      } else {
                          wx.showModal({
                            title: '登录失败',
                            content: 'uuid获取失败',
                            showCancel: false
                          })
                      }
                      
                  } else {
                      console.log('fail,statusCode:');
                      console.log(e.statusCode)
                      var errCode = 'HTTP错误代码：' + e.statusCode
                      wx.showModal({
                        title: '登录失败',
                        content: errCode,
                        showCancel: false,
                      })
                  }
              },

              fail: (e) => {
                  console.log('request fail')
                  wx.showModal({
                    title: '登录失败',
                    content: '请检查网络',
                    showCancel: false,
                  })
              }
            })
          },
        })
    },

    loginAdmin: function(e) {
        wx.navigateTo({
          url: '/pages/adminMain/adminMain',
        })
    },

    loginSuccess: function(e) {
        wx.switchTab({
          url: '/pages/main/main',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})