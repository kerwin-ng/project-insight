// pages/report/report.js

// 引入SDK核心类
var QQMapWX = require('./qqmap-wx-jssdk.js');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'XGNBZ-GRPWS-NW7O6-6O6LX-OWVZT-X2BKG' // 必填
});

Page({

    /**
     * 页面的初始数据
     */
    data: {
        locationLatitude: '',
        locationLongitude: '',
        date: '2022-05-06',
        address: '',
    },

    getAddress: function(e) {
        var _this = this;
        // var latitude = this.getLocation.latitude;
        // var longitude = this.getLocation.longitude;
        qqmapsdk.reverseGeocoder({
            location: {
              // 你的经纬度
                latitude: this.getLocation.latitude,
                longitude: this.getLocation.longitude,
                // latitude: 23.12463,
                // longitude: 113.36199,
            },

        
            success: function (res) {
              console.log(res);
            },
            fail: function (res) {
              console.log(res);
            }
          });
      
    },

    getLocation:function(){
        const that = this;
        var latitude;
        var longitude;
        wx.getLocation({
          altitude: 'altitude',
          type: 'gcj02',
          success: (res) => {
              console.log(res) 
              that.setData({
                  latitude: res.latitude,
                  longitude: res.longitude
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