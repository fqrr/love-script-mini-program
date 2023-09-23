var t = getApp(), a = (require("../../configs/config.js"), require("../../apis/api.js")), e = require("../../utils/util.js");

Page({
    data: {
        dialogShow: !1,
        platform: "ios",
        iosPayEnabled: !1,
        payEnabled: !1,
        memberType: "",
        type: "selected",
        dialogueList: [],
        pageCount: 1,
        pageSize: 10,
        totalCount: 0,
        loadMore: !0
    },
    onLoad: function() {
        var a = this;
        t.onLoginSuccess = function() {
            a.setData({
                memberType: e.getMemberType()
            });
        }, this.setData({
            platform: e.getPlatform(),
            memberType: e.getMemberType()
        }), this.getClient(), this.getDialogueList();

        // 在页面中定义插屏广告
let interstitialAd = null

// 在页面onLoad回调事件中创建插屏广告实例
if (wx.createInterstitialAd) {
  interstitialAd = wx.createInterstitialAd({
    adUnitId: 'adunit-b20ba2098b77aaec'
  })
  interstitialAd.onLoad(() => {})
  interstitialAd.onError((err) => {})
  interstitialAd.onClose(() => {})
}

// 在适合的场景显示插屏广告
if (interstitialAd) {
  interstitialAd.show().catch((err) => {
    console.error(err)
  })
}
    },
    onPullDownRefresh: function() {
        this.setData({
            dialogueList: [],
            pageCount: 1,
            pageSize: 10,
            totalCount: 0,
            loadMore: !0
        }), this.getDialogueList();
    },
    onReachBottom: function() {
        this.data.loadMore && this.getDialogueList();
    },
    onShareAppMessage: function() {},
    onTabItemTap: function(t) {
        this.setData({
            type: t.currentTarget.dataset.type
        }), this.setData({
            dialogueList: [],
            pageCount: 1,
            pageSize: 10,
            totalCount: 0,
            loadMore: !0
        }), this.getDialogueList();
    },
    onDialogueItemTap: function(t) {
        "vip会员" != this.data.memberType && this.data.payEnabled ? "ios" != this.data.platform || this.data.iosPayEnabled ? this.setData({
            dialogShow: !0
        }) : wx.showModal({
            title: "提示",
            content: "由于相关规范，iOS功能暂不可用",
            confirmText: "确定",
            success: function(t) {
                t.confirm;
            }
        }) : wx.navigateTo({
            url: "/pages/dialogueDetail/dialogueDetail?dialogueId=" + t.currentTarget.dataset.id
        });
    },
    getClient: function() {
        var t = this, e = {};
        a.getClient(e).then(function(a) {
            t.setData({
                iosPayEnabled: a.responseData.iosPayEnabled,
                payEnabled: a.responseData.payEnabled
            });
        });
    },
    getDialogueList: function() {
        var t = this, e = {
            type: t.data.type,
            pageCount: t.data.pageCount,
            pageSize: t.data.pageSize
        };
        a.getDialogueList(e).then(function(a) {
            var e = t.data.dialogueList.concat(a.responseData.dialogueList), o = !0;
            t.data.pageSize * t.data.pageCount >= a.responseData.totalCount && (o = !1), t.setData({
                dialogueList: e,
                pageCount: t.data.pageCount + 1,
                totalCount: a.responseData.totalCount,
                loadMore: o
            });
        });
    }
});