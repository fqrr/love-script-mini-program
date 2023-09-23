getApp(), require("../../configs/config.js");

var e = require("../../apis/api.js"), t = require("../../utils/util.js"), a = require("../../libs/wxParse/wxParse.js");

Page({
    data: {
        articleId: "",
        articleDetail: {}
    },
    onLoad: function(e) {
        this.setData({
            articleId: e.articleId
        }), this.getArticle();
    },
    onShareAppMessage: function() {},
    getArticle: function() {
        var i = this, r = {
            articleId: i.data.articleId
        };
        e.getArticle(r).then(function(e) {
            i.setData({
                articleDetail: e.responseData
            });
            var r = e.responseData.text, s = t.getDevicePixelRatio();
            a.wxParse("article", "html", r, i, 30 / s);
        });
    }
});