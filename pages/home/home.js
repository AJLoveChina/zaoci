// pages/home/home.js
import {createPosterConfig} from '../../utils/util'
import POSTER from '../../components/poster-canvas/poster/poster'
import minganci from '../../data/minganci'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ci: "我爱造新词",
        ciList: [],
        info: "我爱造新词是年轻人的一种娱乐方式",
        posterConfig: {},
        destroy: false,
        isHidden: true,
        mingan: false,
        minganci: ""
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

    isEnableLogo() {
        return new Promise((resolve, reject) => {
            wx.request({
                url : "https://boke-1251259897.cossh.myqcloud.com/mini-program/zaoci/config.json?t=" + (+ new Date()),
                success(res) {
                    resolve(res.data.isEnableQRCode)
                },
                fail() {
                    resolve(false)
                }
            });
        })
    },



    exchangeCanvas(){
        this.setData({
            destroy: !this.data.destroy
        });
    },

    getSelector() {
        return this.data.destroy ? "#poster2" : "#poster";
    },

    create(){
        this.beforeCreateCanvas();

        this.isEnableLogo().then(enable => {
            let config = createPosterConfig({
                list: this.data.ciList,
                info: this.data.info,
                nologo: !enable
            });
            this.setData({
                posterConfig: config
            });
            POSTER({
                selector: this.getSelector()
            }).onCreate()
        });
    },

    chouqu(sentence) {
        let list = [];

        for (let i = 0; i + 2 <= sentence.length; i++) {
            list.push(sentence.substr(i, 2));
        }

        for (let i = 0; i + 3 <= sentence.length; i++) {
            list.push(sentence.substr(i, 3));
        }

        return list;
    },

    cifromuser() {
        try {
            let list = [];

            list.push(...this.chouqu(this.data.ci));
            list.push(...this.chouqu(this.data.info));

            return list;
        } catch (ex) {
            return [];
        }
    },

    checkMinganci() {
        let cifromuser = this.cifromuser();
        console.log("cifromuser", cifromuser);
        for (let i = 0; i < cifromuser.length; i++) {
            if (minganci[cifromuser[i]]) {
                this.setData({
                    mingan: true,
                    minganci: cifromuser[i]
                });
                throw new Error("包含敏感词");
            }
        }

        this.setData({
            mingan: false,
            minganci: ""
        });
    },

    beforeCreateCanvas() {

        this.checkMinganci();

        this.exchangeCanvas();

        this.setData({
            isHidden: false
        });
    },

    createWithA(e) {
        this.beforeCreateCanvas();
        let userInfo = e.detail.userInfo;
        console.log(userInfo);

        this.isEnableLogo().then(enable => {
            let config = createPosterConfig({
                list: this.data.ciList,
                info: this.data.info,
                userInfo,
                nologo: !enable
            });
            this.setData({
                posterConfig: config
            });
            POSTER({
                selector: this.getSelector()
            }).onCreate()
        });

    },

    onPosterSuccess(e) {
        const { detail } = e;

        this.setData({
            isHidden: true
        });

        wx.previewImage({
            current: detail,
            urls: [detail]
        });
    },

    onPosterFail(e) {
        console.log(e);
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
