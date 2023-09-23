var e = getApp(), t = require("../../configs/config.js"), i = (require("../../apis/api.js"), 
require("../../utils/util.js"));

Page({
    data: {
        dialogShow: !1,
        platform: "ios",
        iosPayEnabled: !1,
        payEnabled: !1,
        userId: "",
        memberType: "",
        memberTime: ""
    },
    onLoad: function() {
        var t = this;
        e.onLoginSuccess = function() {
            t.setData({
                userId: i.getUserId(),
                memberType: i.getMemberType(),
                memberTime: i.getMemberTime()
            });
        }, e.onLoginFail = function() {
            wx.showToast({
                title: "获取登录信息失败！",
                icon: "none"
            });
        }, this.setData({
            platform: i.getPlatform()
        });
    },
    onShow: function() {
        this.setData({
            userId: i.getUserId(),
            memberType: i.getMemberType(),
            memberTime: i.getMemberTime()
        }), this.getClient(), e.login();
    },
    onPullDownRefresh: function() {
        this.getClient(), e.login();
    },
    onShareAppMessage: function() {},
    onMemberTap: function() {
        "ios" != this.data.platform || this.data.iosPayEnabled ? wx.navigateTo({
            url: "/pages/membership/membership?enabled=true"
        }) : wx.showModal({
            title: "提示",
            content: "由于相关规范，iOS功能暂不可用",
            confirmText: "确定",
            success: function(e) {
                e.confirm;
            }
        });
    },
    onMenuItemTap: function(e) {
        var i = e.currentTarget.dataset.id;
        "1" == i ? wx.navigateToMiniProgram({
            appId: t.navigateToMiniProgramAppId
        }) : "2" == i ? this.setData({
            dialogShow: !0
        }) : "3" == i && wx.navigateTo({
            url: "/pages/about/about"
        });
    },
    getClient: function() {}
});