// pages/report/report.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        location: '点击按钮进行定位',
        date: '2022-05-06'
    },

    getLocation:function(){
        const that = this;
        wx.getLocation({
          altitude: 'altitude',
          type: 'wgs84',
          success: (res) => {
              console.log(res)
              location = res.latitude
              that.setData({
                  location: location
              })
          },
          fail (res) {
              console.log("fail")
              console.log(res)
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