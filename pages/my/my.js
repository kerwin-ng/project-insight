// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userImgUrl: '',
        userName: '',
        userLogin: false,

    },

    goToYuekangCode: function(e) {
        wx.navigateToMiniProgram({
          appId: 'wx82d43fee89cdc7df',

          success(res) {
              console.log("Go to YuekangCode success.")
              console.log(res)
          },

          fail(res) {
              console.log(res)
          }
        })
        console.log(e)
    },

    goToItineraryCard: function(e) {
        wx.navigateToMiniProgram({
          appId: 'wx8f446acf8c4a85f5',

          success(res) {
            console.log("Go to Itinerary Card success.")
            console.log(res)
            },

            fail(res) {
            console.log(res)
            }
        })
    },

    goToAbout: function(e){
        wx.navigateTo({
          url: '/pages/about/about',
        })
    },

    goToHistoryReport: function(e) {
        wx.navigateTo({
           url: '/pages/historyReport/historyReport',
        })
    },

    getUserProfile: function(e) {
        wx.getUserProfile({
          desc: '用于完善个人界面信息',

          success: (res) => {
              console.log(res)
              console.log("Get user profile success.")
              this.setData({
                  userLogin: true,
                  userImgUrl: res.userInfo.avatarUrl,
                  userName: res.userInfo.nickName,
              })
          }
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