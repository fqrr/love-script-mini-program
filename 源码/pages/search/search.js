var t = getApp(), a = (require("../../configs/config.js"), require("../../apis/api.js")), e = require("../../utils/util.js");

Page({
    data: {
        dialogShow: !1,
        platform: "ios",
        iosPayEnabled: !1,
        resultShow: !1,
        keyword: "",
        type: "fuzzy",
        count: 0,
        hotListSource: [ "开玩笑", "早点睡", "是的呢", "回家了", "不可以", "嗯嗯", "早上好", "晚安", "你喜欢我吗", "上班呢", "睡醒了", "在干嘛呢", "啥意思", "想得美", "什么事", "我不认识你", "你叫什么名", "讲个笑话", "吃了", "来大姨妈了", "睡觉了", "我感冒了", "我不要", "想多了", "还行吧", "在吗", "你是做什么", "下班了", "不不不", "你觉得呢", "好无聊", "为什么喜欢", "好困" ],
        hotList: [],
        recordList: [],
        chatList: [],
        pageCount: 1,
        pageSize: 10,
        totalCount: 0,
        loadMore: !0
    },
    onLoad: function(a) {
        t.onLoginSuccess = function() {}, t.onLoginFail = function() {
            wx.showToast({
                title: "获取登录信息失败！",
                icon: "none"
            });
        }, this.setData({
            platform: e.getPlatform()
        }), this.getCount(), this.getHotList(), this.getRecordList(), this.getClient(), 
        a.keyword && (this.setData({
            keyword: a.keyword
        }), this.searchChat());
    },
    onReachBottom: function() {
        this.data.keyword && this.data.chatList && this.data.chatList.length > 0 && this.data.loadMore && this.searchChat();
    },
    onShareAppMessage: function() {},
    onKeywordInput: function(t) {
        this.setData({
            keyword: t.detail.value
        });
    },
    onDeleteTap: function() {
        this.setData({
            keyword: ""
        });
    },
    onSearchTap: function() {
        this.data.keyword ? (this.setData({
            chatList: [],
            pageCount: 1,
            pageSize: 10,
            totalCount: 0,
            loadMore: !0
        }), this.searchChat()) : wx.showToast({
            title: "请输入搜索词",
            icon: "none"
        });
    },
    onHotItemTap: function(t) {
        this.setData({
            keyword: t.currentTarget.dataset.keyword,
            chatList: [],
            pageCount: 1,
            pageSize: 10,
            totalCount: 0,
            loadMore: !0
        }), this.searchChat();
    },
    onHotChangeTap: function() {
        this.getHotList();
    },
    onClearTap: function() {
        wx.setStorageSync("recordList", []), this.setData({
            recordList: []
        });
    },
    onRecordItemTap: function(t) {
        this.setData({
            keyword: t.currentTarget.dataset.keyword,
            chatList: [],
            pageCount: 1,
            pageSize: 10,
            totalCount: 0,
            loadMore: !0
        }), this.searchChat();
    },
    onTabItemTap: function(t) {
        this.setData({
            type: t.currentTarget.dataset.type,
            chatList: [],
            pageCount: 1,
            pageSize: 10,
            totalCount: 0,
            loadMore: !0
        }), this.searchChat();
    },
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
    getCount: function() {
        var t = new Date(), a = parseInt("" + t.getFullYear() + t.getDate() + t.getMonth()) % 400 + 200;
        this.setData({
            count: a
        });
    },
    getHotList: function() {
        for (var t = [], a = this.data.hotListSource.length, e = 0; e < 8; e++) t.push(this.data.hotListSource[Math.floor(Math.random() * a)]);
        this.setData({
            hotList: t
        });
    },
    getRecordList: function() {
        var t = wx.getStorageSync("recordList");
        this.setData({
            recordList: t || []
        });
    },
    getClient: function() {},
    searchChat: function() {
        this.setData({
            resultShow: !0
        });
        var e = this.data.recordList;
        e.unshift(this.data.keyword), e.length > 10 && e.pop(), wx.setStorageSync("recordList", e), 
        this.setData({
            recordList: e
        });
        var o = this, s = {
            keyword: o.data.keyword,
            type: o.data.type,
            pageCount: o.data.pageCount,
            pageSize: o.data.pageSize
        };
        a.searchChat(s).then(function(a) {
            if (a.login) t.login(); else {
                var e = o.data.chatList.concat(a.responseData.chatList), s = !0;
                o.data.pageSize * o.data.pageCount >= a.responseData.totalCount && (s = !1), o.setData({
                    chatList: e,
                    pageCount: o.data.pageCount + 1,
                    totalCount: a.responseData.totalCount,
                    loadMore: s
                }), 0 == a.responseData.totalCount && ("precise" == o.data.type ? wx.showModal({
                    title: "提示",
                    content: "暂无结果，请尝试使用模糊搜索",
                    confirmText: "确定",
                    success: function(t) {
                        t.confirm && (o.setData({
                            type: "fuzzy",
                            chatList: [],
                            pageCount: 1,
                            pageSize: 10,
                            totalCount: 0,
                            loadMore: !0
                        }), o.searchChat());
                    }
                }) : "fuzzy" == o.data.type && wx.showModal({
                    title: "提示",
                    content: "暂无结果，请尝试缩短关键词",
                    confirmText: "确定",
                    success: function(t) {
                        t.confirm;
                    }
                }));
            }
        });
    }
});