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
        date: '2022-05-06',
        reportAddress: '',
        uploadImage: false,
        uploadImageSrc: '/resource/img/screenshots/testDemo.png',
    },

    uploadImage: function() {
        
    },

    uploadImageReset: function() {
        this.setData({
            uploadImage: false,
        })
        console.log('uploadImage:',this.data.uploadImage)
    },

    getAddress: function(e) {
        var that = this;

        wx.getLocation({

          altitude: 'altitude',
          type: 'gcj02',

          success: (res) => {
            console.log(res)
            qqmapsdk.reverseGeocoder({
                location: {
                    latitude: res.latitude,
                    longitude: res.longitude,
                },
                success: (e) => {
                    console.log(e)
                    that.setData({
                        reportAddress: e.result.address
                    })
                },
                fail: (e) => {
                    console.log(e)
                }
            })
            // this.setData({
            //     locationLatitude: res.latitude,
            //     locationLongitude: res.longitude
            // })
            // console.log(this.data.locationLatitude)
            // console.log(this.data.locationLongitude)
          },

          fail: (res) => {
                console.log('get location fail')
                console.log(res)
          }
        })

        // qqmapsdk.reverseGeocoder({
        //     location: {
        //         latitude: this.data.locationLatitude,
        //         longitude: this.data.locationLongitude,
        //     },

        //     success: function(res) {
        //         console.log(res);
        //     },
        //     fail: function(res) {
        //         console.log(res);
        //     }
        // })
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
        // 获取经纬度转换成地址传递到 address
        this.getAddress();
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