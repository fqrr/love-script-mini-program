getApp(), require("../../configs/config.js");

var t = require("../../apis/api.js");

require("../../utils/util.js"), Page({
    data: {
        type: "",
        diaryList: [],
        pageCount: 1,
        pageSize: 10,
        totalCount: 0,
        loadMore: !0
    },
    onLoad: function(t) {
        this.setData({
            type: t.type
        }), "mzrj" == t.type ? wx.setNavigationBarTitle({
            title: "男神护肤"
        }) : "zpxt" == t.type ? wx.setNavigationBarTitle({
            title: "自拍修图"
        }) : "nscd" == t.type && wx.setNavigationBarTitle({
            title: "男神穿搭"
        }), this.getDiaryList();
    },
    onReachBottom: function() {
        this.data.loadMore && this.getDiaryList();
    },
    onShareAppMessage: function() {},
    onDiaryItemTap: function(t) {
        wx.navigateTo({
            url: "/pages/diaryDetail/diaryDetail?diaryId=" + t.currentTarget.dataset.id
        });
    },
    getDiaryList: function() {
        var a = this, e = {
            type: a.data.type,
            pageCount: a.data.pageCount,
            pageSize: a.data.pageSize
        };
        t.getDiaryList(e).then(function(t) {
            var e = a.data.diaryList.concat(t.responseData.diaryList), i = !0;
            a.data.pageSize * a.data.pageCount >= t.responseData.totalCount && (i = !1), a.setData({
                diaryList: e,
                pageCount: a.data.pageCount + 1,
                totalCount: t.responseData.totalCount,
                loadMore: i
            });
        });
    }
});