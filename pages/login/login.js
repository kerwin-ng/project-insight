// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    loginDemo: function() {
        wx.login({
          timeout: 10000,

          success: resp => {
              console.log(resp);
              var that = this;

              wx.getSetting({
                withSubscriptions: true,

                success: res => {
                    if (res.authSetting['scope.userInfo']) {
                        wx.getUserInfo({
                        //   lang: lang,

                          success: userResult => {
                              var platUserInfoMap = {}
                              platUserInfoMap["encryptedData"] = userResult.encryptedData;
                              platUserInfoMap["iv"] = userResult.iv;
                              console.log('platUserInfoMap:');
                              console.log(platUserInfoMap);
                              wx.request({
                                url: 'http://127.0.0.1:5000/wxlogin',
                                data: {
                                    platCode: resp.code,
                                    platUserInfoMap: platUserInfoMap,
                                },
                                header: {
                                    "Content-Type": "application/json"
                                },
                                method: 'POST',
                                dataType: 'json',
                                success: function(res) {
                                    console.log(res)
                                    wx.setStorageSync("userinfo", res.userinfo)
                                },
                                fail: function(err) {

                                },
                                complete: function() {

                                }
                              })
                          }
                        })
                    }
                }
              })
          }
        })
    },

    login: function() {
        wx.login({
          timeout: 10000,

          success: (res) => {
            console.log(res);

            wx.request({
              url: 'http://127.0.0.1:5000/wxlogin',

              data: {
                userCode: res.code
              },

              method: 'POST',
              dataType: 'json',
            })
          },

          fail: (res) => {
              console.log(res);
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