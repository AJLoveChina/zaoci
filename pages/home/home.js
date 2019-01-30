// pages/home/home.js
import {createPosterConfig} from '../../utils/util'
import POSTER from '../../components/poster-canvas/poster/poster'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ci: "我爱造新词",
        ciList: [],
        info: "我爱造新词是年轻人的一种娱乐方式",
        posterConfig: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    split2List() {
        this.setData({
            ciList: this.data.ci.split("")
        });
    },

    ciInput(e) {
        let val = e.detail.value;
        this.setData({
            ci: val
        });
        this.split2List();
    },

    infoInput(e) {
        let val = e.detail.value;
        this.setData({
            info: val
        });
    },

    create(){
        let config = createPosterConfig({
            list: this.data.ciList,
            info: this.data.info
        });
        this.setData({
            posterConfig: config
        });
        POSTER.create();

    },

    onPosterSuccess(e) {
        const { detail } = e;
        wx.previewImage({
            current: detail,
            urls: [detail]
        });
    },

    onPosterFail() {

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // 测试报告取消下面注释
        // this.create();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.split2List();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
