// pages/main/main.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mainText: '【通知】天河校区各部门、二级学院：刚接到教育局通知，定于今天中午13:00在学校礼堂三楼进行天河校区师生全员核酸检测，核酸检测方案详见附件，请及时通知给学生及转发校内相关人员。',
    },

    goToYueshengshi:function(e) {
        wx.navigateToMiniProgram({
          appId: 'wx82d43fee89cdc7df',
          path: 'page'
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