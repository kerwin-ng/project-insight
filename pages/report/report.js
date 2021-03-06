// pages/report/report.js
import WxValidate from "../../resource/js/WxValidate.js";
// 引入SDK核心类
var QQMapWX = require('../../resource/js/qqmap-wx-jssdk.js');
 
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: 'XGNBZ-GRPWS-NW7O6-6O6LX-OWVZT-X2BKG' // 必填
});

const app = getApp();


Page({

    /**
     * 页面的初始数据
     */
    data: {
        form: {
            name: '',
            class: '',
            no: '',
            phone: '',
            address: '',
        },
        date: '',
        reportAddress: '',
        uploadHealthCode: false,
        uploadItineraryCode: false,
        uploadHealthCodeSrc: '',
        uploadItineraryCodeSrc: '',
        uuid: '',
    },

    initValidate: function() {
        let rules = {
            name: {
                required: true,
                maxlength: 10
            },

            class: {
                required: true,
                maxlength: 10,
            },

            no: {
                required: true,
                maxlength: 2,
            },

            phone: {
                required: true,
                tel: true,
            },

            address: {
                required: true,
            }
        }

        let messages = {
            name: {
                required: '请输入姓名',
                maxlength: '名字不能超出10个字符',
            },

            class: {
                required: '请输入班级',
                maxlength: '班级不能超出10个字符',
            },

            no: {
                required: '请输入学号',
                maxlength: '学号不能超出2个字符'
            },

            phone: {
                required: '请输入手机号',
                tel: '手机号必须为11位',
            },

            address: {
                required: '未获取到地址'
            }
        }

        this.WxValidate = new WxValidate(rules, messages);
    },

    // 获取服务器时间
    getServerTime: function(e) {
        var that = this;

        wx.request({
          url: 'http://127.0.0.1:19999/time',
          method: 'POST',

          success: (res) => {
            that.setData({
                date: res.data
            })
          },

          fail: (res) => {
            that.setData({
                date: '获取服务器时间失败'
            })
          }
        })
    },

    // 上传行程卡截图
    uploadItineraryCode: function() {
        var that = this;
        wx.chooseImage({
          count: 1,
          sourceType: 'album',

          success: (res) =>{
            console.log(res)
            that.setData({
                uploadItineraryCodeSrc: res.tempFilePaths,
                uploadItineraryCode: true,
            })
          },

          fail: (res) => {
              console.log(res)
          }
        })
    },

    // 上传健康码截图
    uploadHealthCode: function() {
        var that = this;
        wx.chooseImage({
          count: 1,
          sourceType: 'album',

          success: (res) =>{
            console.log(res)
            that.setData({
                uploadHealthCodeSrc: res.tempFilePaths,
                uploadHealthCode: true,
            })
          },

          fail: (res) => {
              console.log(res)
          }
        })
    },

    // 上传图片重置
    uploadItineraryCodeReset: function() {
        this.setData({
            uploadItineraryCode: false,
            uploadItineraryCodeSrc: '',
        })
    },

    uploadHealthCodeReset: function() {
        this.setData({
            uploadHealthCode: false,
            uploadHealthCodeSrc: '',
        })
    },

    // 获取当前地址
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
                        ['form.address']: e.result.address
                    })
                },
                fail: (e) => {
                    console.log(e)
                }
            })
          },

          fail: (res) => {
                console.log('get location fail')
                console.log(res)
          }
        })
    },

    // 提交报告
    reportSubmit: function(e) {
        var healthCodeName = '';
        var itineraryCodeName = '';
        var that = this;
        const params = e.detail.value;
        console.log(params);

        // 表单校检
        if (!this.WxValidate.checkForm(params)) {
            let error = this.WxValidate.errorList[0];
            that.showModal(error);
            return false;
        }

        // 显示 loading 页面
        wx.showLoading({
            title: '正在上传...',
            mask: true
          })

        // 上传健康码截图
        if (this.data.uploadHealthCodeSrc) {
            console.log('uploadHealthCodeSrc True');
            const healthCodeFilePath = this.data.uploadHealthCodeSrc[0];
            console.log(app.globalData.uuid)
            wx.uploadFile({
              filePath: healthCodeFilePath,
              name: 'HealthCode',
              url: 'http://127.0.0.1:19999/user/upload/health_code',
              method: 'POST',
              formData: {
                uuid: app.globalData.uuid
              },

              success: (res) => {
                  console.log('wx.uploadFile success');
                  console.log(res)
                  healthCodeName = res.data
                  console.log(healthCodeName)
              },

              fail: (res) => {
                wx.showModal({
                    title: '提交失败',
                    content: '请稍后再试',
                    showCancel: false,
                  })
                  return false;
              }
            })
        } else {
            console.log('upload fail')
            wx.showModal({
              title: '提交失败',
              content: '请先选择健康码图片',
              showCancel: false,
            })
            return false;
        }

        // 上传行程卡截图
        if (this.data.uploadItineraryCodeSrc) {
            console.log('uploadItineraryCodeSrc True')
            const itineraryCodeFilePath = this.data.uploadItineraryCodeSrc[0];
            wx.uploadFile({
              filePath: itineraryCodeFilePath,
              name: 'ItineraryCode',
              url: 'http://127.0.0.1:19999/user/upload/itinerary_code',
              method: 'POST',
              formData: {
                  uuid: app.globalData.uuid
              },

              success: (res) => {
                  console.log('wx.uploadFile success');
                  console.log(res)
                  itineraryCodeName = res.data
                  console.log(itineraryCodeName)
              },

              fail: (res) => {
                wx.showModal({
                    title: '提交失败',
                    content: '请稍后再试',
                    showCancel: false,
                  })
                  return false;
              }
            })
        } else {
            console.log('upload fail')
            wx.showModal({
              title: '提交失败',
              content: '请先选择行程卡图片',
              showCancel: false,
            })
            return false;
        }

        console.log('submit log')
        console.log(e);
        
        // 等待上传操作 3000ms 后再进行 wx.request操作
        setTimeout(function (){
            wx.hideLoading()
            wx.request({
                url: 'http://127.0.0.1:19999/user/report',
                method: 'POST',
                dataType: 'json',
                data: {
                    name: e.detail.value.name,
                    the_class: e.detail.value.class,
                    no: e.detail.value.no,
                    phone: e.detail.value.phone,
                    risk_location: e.detail.value.riskLocation,
                    address: e.detail.value.address,
                    temperature: e.detail.value.temperature,
                    health_code: healthCodeName,
                    itinerary_code: itineraryCodeName
                },
      
                success: (res) => {
                    console.log('报告提交成功,下面是data数据');
                    console.log(healthCodeName);
                    console.log(itineraryCodeName);
                },
                fail: (res) => {
                    console.log('报告提交失败');
                    console.log(res);
                }
              })
        },3000)

    },

    // 弹窗
    showModal(error) {
        wx.showModal({
        content: error.msg,
        showCancel: false,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getAddress(); // 获取经纬度转换成地址传递到 address
        this.getServerTime(); // 获取服务器时间
        this.initValidate(); // 表单校检
        var app = getApp(); // 初始化全局变量
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