getApp(), require("../../configs/config.js");

var t = require("../../apis/api.js"), a = require("../../utils/util.js");

Page({
    data: {
        dialogShow: !1,
        platform: "ios",
        iosPayEnabled: !1,
        categoryId: "",
        chatList: [],
        pageCount: 1,
        pageSize: 10,
        totalCount: 0,
        loadMore: !0
    },
    onLoad: function(t) {
        this.setData({
            categoryId: t.categoryId,
            platform: a.getPlatform()
        }), wx.setNavigationBarTitle({
            title: t.title
        }), this.getClient(), this.getChatList();
    },
    onReachBottom: function() {
        this.data.loadMore && this.getChatList();
    },
    onShareAppMessage: function() {},
    onCopyTap: function(t) {
        wx.setClipboardData({
            data: t.currentTarget.dataset.text
        });
    },
    onUnlockTap: function() {
        "ios" != this.data.platform || this.data.iosPayEnabled ? this.setData({
            dialogShow: !0
        }) : wx.showModal({
            title: "提示",
            content: "由于相关规范，iOS功能暂不可用",
            confirmText: "确定",
            success: function(t) {
                t.confirm;
            }
        });
    },
    getClient: function() {},
    getChatList: function() {
        var a = this, e = {
            categoryId: a.data.categoryId,
            pageCount: a.data.pageCount,
            pageSize: a.data.pageSize
        };
        t.getChatList(e).then(function(t) {
            var e = a.data.chatList.concat(t.responseData.chatList), o = !0;
            a.data.pageSize * a.data.pageCount >= t.responseData.totalCount && (o = !1), a.setData({
                chatList: e,
                pageCount: a.data.pageCount + 1,
                totalCount: t.responseData.totalCount,
                loadMore: o
            });
        });
    }
});