// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    login: function() {
        wx.login({
          timeout: 10000, //单位：ms

          success: (res) => {
            console.log(res);
            if (res.code) {
                wx.request({
                  url: 'http://127.0.0.1:5000/login',
                  data: {
                      code: res.code
                  },
                  
                })
            } else {
                console.log('fail');
                console.log(res);
            }

          },

          fail: (res) => {
              console.log('fail');
              console.log(res)
          }
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