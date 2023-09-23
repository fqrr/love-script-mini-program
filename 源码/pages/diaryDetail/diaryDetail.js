getApp(), require("../../configs/config.js");

var i = require("../../apis/api.js");

require("../../utils/util.js"), Page({
    data: {
        swiperHeight: "",
        diaryId: "",
        diaryDetail: {}
    },
    onLoad: function(i) {
        this.setData({
            diaryId: i.diaryId
        }), this.getDiary();
    },
    onShareAppMessage: function() {},
    onSwiperChange: function(i) {
        var t = i.detail.current;
        this.setData({
            swiperHeight: this.data.diaryDetail.imageList[t].height
        });
    },
    onImageLoad: function(i) {
        var t = this.data.diaryDetail;
        for (var a in t.imageList) t.imageList[a].url == i.currentTarget.dataset.url && (t.imageList[a].height = i.detail.height / i.detail.width * 750), 
        0 != a || this.data.swiperHeight || this.setData({
            swiperHeight: t.imageList[a].height
        });
        this.setData({
            diaryDetail: t
        });
    },
    getDiary: function() {
        var t = this, a = {
            diaryId: t.data.diaryId
        };
        i.getDiary(a).then(function(i) {
            t.setData({
                diaryDetail: i.responseData
            });
        });
    }
});