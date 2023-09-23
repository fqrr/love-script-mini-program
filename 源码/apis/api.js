var t = require("../configs/config.js"), e = function(e, n, i) {
    return new Promise(function(r, a) {
        wx.showLoading({
            title: "数据加载中..."
        }), wx.request({
            url: t.requestBaseUrl + e,
            data: i,
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                Appid: t.appid,
                Token: wx.getStorageSync("token")
            },
            method: n,
            success: function(o) {
                wx.stopPullDownRefresh(), wx.hideLoading(), console.log("[wx.request:success]\nurl:" + t.requestBaseUrl + e + "\ndata:" + JSON.stringify(i) + "\nmethod:" + n + "\nres:" + JSON.stringify(o)), 
                o.statusCode >= 200 && o.statusCode < 300 || 304 === o.statusCode ? 0 == o.data.responseCode ? r(o.data) : 101 == o.data.responseCode ? (o.data.login = !0, 
                r(o.data)) : (wx.showToast({
                    title: o.data.responseMessage,
                    icon: "none"
                }), a(o.data)) : (wx.showToast({
                    title: "获取数据失败！" + o.errMsg,
                    icon: "none"
                }), a(o));
            },
            fail: function(r) {
                wx.stopPullDownRefresh(), wx.hideLoading(), console.log("[wx.request:fail]\nurl:" + t.requestBaseUrl + e + "\ndata:" + JSON.stringify(i) + "\nmethod:" + n + "\nres:" + JSON.stringify(r) + "\n"), 
                wx.showToast({
                    title: "获取数据失败！" + r.errMsg,
                    icon: "none"
                }), a(r);
            }
        });
    });
}, n = {
    login: function(t) {
        return e("api/user/login", "POST", t);
    },
    getDictionary: function(t) {
        return e("api/dictionary/getDictionary", "GET", t);
    },
    getChatCategoryList: function(t) {
        return e("api/chat/getCategoryList", "GET", t);
    },
    getChatList: function(t) {
        return e("api/chat/getChatList", "GET", t);
    },
    searchChat: function(t) {
        return e("api/chat/searchChat", "GET", t);
    },
    getClient: function(t) {
        return e("api/client/getClient", "GET", t);
    },
    createOrder: function(t) {
        return e("api/order/createOrder", "POST", t);
    },
    pay: function(t) {
        return e("api/order/pay", "POST", t);
    },
    queryOrder: function(t) {
        return e("api/order/queryOrder", "GET", t);
    },
    getArticleCategoryList: function(t) {
        return e("api/article/getCategoryList", "GET", t);
    },
    getArticleList: function(t) {
        return e("api/article/getArticleList", "GET", t);
    },
    getArticle: function(t) {
        return e("api/article/getArticle", "GET", t);
    },
    getDialogueList: function(t) {
        return e("api/dialogue/getDialogueList", "GET", t);
    },
    getDialogue: function(t) {
        return e("api/dialogue/getDialogue", "GET", t);
    },
    getTestList: function(t) {
        return e("api/test/getTestList", "GET", t);
    },
    getTest: function(t) {
        return e("api/test/getTest", "GET", t);
    },
    getDiaryList: function(t) {
        return e("api/diary/getDiaryList", "GET", t);
    },
    getDiary: function(t) {
        return e("api/diary/getDiary", "GET", t);
    },
    getMoment: function(t) {
        return e("api/moment/getmoment", "GET", t);
    }
};

module.exports = n;