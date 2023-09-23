getApp(), require("../../configs/config.js");

var t = require("../../apis/api.js");

require("../../utils/util.js"), Page({
    data: {
        testId: "",
        testStatus: "1",
        testIndex: 0,
        testScore: 0,
        answer: "",
        description: "",
        testDetail: {}
    },
    onLoad: function(t) {
        this.setData({
            testId: t.testId
        }), this.getTest();
    },
    onShareAppMessage: function() {},
    onOptionItemTap: function(t) {
        var e = this.data.testScore + parseInt(t.currentTarget.dataset.score);
        if (this.setData({
            testScore: e
        }), this.data.testIndex < this.data.testDetail.questionList.length - 1) {
            var s = this.data.testIndex + 1;
            this.setData({
                testIndex: s
            });
        } else this.setData({
            testStatus: "3"
        });
    },
    onStartTap: function() {
        this.setData({
            testStatus: "2"
        });
    },
    onSubmitTap: function() {
        var t = this.data.testDetail.answerList, e = this.data.testScore, s = "", a = "";
        for (var n in t) e >= t[n].scoreLower && e <= t[n].scoreUpper && (s = t[n].answer, 
        a = t[n].description);
        this.setData({
            testStatus: "4",
            answer: s,
            description: a
        });
    },
    onLikeTap: function() {
        wx.showModal({
            title: "提示",
            content: "评价成功！",
            showCancel: !1,
            success: function() {
                wx.navigateBack();
            }
        });
    },
    onUnlikeTap: function() {
        wx.showModal({
            title: "提示",
            content: "评价成功！",
            showCancel: !1,
            success: function() {
                wx.navigateBack();
            }
        });
    },
    onRestartTap: function() {
        this.setData({
            testStatus: "1",
            testIndex: 0,
            testScore: 0
        });
    },
    getTest: function() {
        var e = this, s = {
            testId: e.data.testId
        };
        t.getTest(s).then(function(t) {
            e.setData({
                testDetail: t.responseData
            });
        });
    }
});