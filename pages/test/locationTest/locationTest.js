// pages/test/locationTest/locationTest.js

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

    },

   
    formSubmit(e) {
        var _this = this;
        qqmapsdk.reverseGeocoder({
          //位置坐标，默认获取当前位置，非必须参数
          /**
           * 
           //Object格式
            location: {
              latitude: 39.984060,
              longitude: 116.307520
            },
          */
          /**
           *
           //String格式
            location: '39.984060,116.307520',
          */
          location: e.detail.value.reverseGeo || '', //获取表单传入的位置坐标,不填默认当前位置,示例为string格式
          //get_poi: 1, //是否返回周边POI列表：1.返回；0不返回(默认),非必须参数
          success: function(res) {//成功后的回调
            console.log(res);
            var res = res.result;
            var mks = [];
            /**
             *  当get_poi为1时，检索当前位置或者location周边poi数据并在地图显示，可根据需求是否使用
             *
                for (var i = 0; i < result.pois.length; i++) {
                mks.push({ // 获取返回结果，放到mks数组中
                    title: result.pois[i].title,
                    id: result.pois[i].id,
                    latitude: result.pois[i].location.lat,
                    longitude: result.pois[i].location.lng,
                    iconPath: './resources/placeholder.png', //图标路径
                    width: 20,
                    height: 20
                })
                }
            *
            **/
            //当get_poi为0时或者为不填默认值时，检索目标位置，按需使用
            mks.push({ // 获取返回结果，放到mks数组中
              title: res.address,
              id: 0,
              latitude: res.location.lat,
              longitude: res.location.lng,
              iconPath: './resources/placeholder.png',//图标路径
              width: 20,
              height: 20,
              callout: { //在markers上展示地址名称，根据需求是否需要
                content: res.address,
                color: '#000',
                display: 'ALWAYS'
              }
            });
            _this.setData({ //设置markers属性和地图位置poi，将结果在地图展示
              markers: mks,
              poi: {
                latitude: res.location.lat,
                longitude: res.location.lng
              }
            });
          },
          fail: function(error) {
            console.error(error);
          },
          complete: function(res) {
            console.log(res);
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