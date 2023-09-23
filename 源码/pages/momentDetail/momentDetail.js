getApp(), require("../../configs/config.js");

var t = require("../../apis/api.js");

require("../../utils/util.js"), Page({
    data: {
        moreShow: !1,
        type: "",
        momentDetail: {}
    },
    onLoad: function(t) {
        this.setData({
            type: t.type
        }), "pyq" == t.type ? wx.setNavigationBarTitle({
            title: "朋友圈"
        }) : "djt" == t.type ? wx.setNavigationBarTitle({
            title: "喝绿茶"
        }) : "chp" == t.type && wx.setNavigationBarTitle({
            title: "渣小明"
        }), this.getMoment();
    },
    onShareAppMessage: function() {},
    onSaveTap: function(t) {
        this.setData({
            moreShow: !1
        }), wx.previewImage({
            urls: [ this.data.momentDetail.poster ]
        });
    },
    onCopyTap: function(t) {
        this.setData({
            moreShow: !1
        }), wx.setClipboardData({
            data: this.data.momentDetail.title
        });
    },
    onMoreTap: function(t) {
        this.setData({
            moreShow: !this.data.moreShow
        });
    },
    onNextTap: function(t) {
        this.getMoment();
    },
    getMoment: function() {
        var e = this, a = {
            type: e.data.type
        };
        t.getMoment(a).then(function(t) {
            e.setData({
                momentDetail: t.responseData
            });
        });
    }
});