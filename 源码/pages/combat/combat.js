var t = getApp(),
  a = (require("../../configs/config.js"), require("../../apis/api.js")),
  e = require("../../utils/util.js");

Page({
  data: {
    dialogShow: !1,
    platform: "ios",
    iosPayEnabled: !1,
    articleList: [],
    pageCount: 1,
    pageSize: 10,
    totalCount: 0,
    loadMore: !0
  },
  onLoad: function () {
    t.onLoginSuccess = function () {}, t.onLoginFail = function () {}, this.setData({
      platform: e.getPlatform()
    });

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
  onShow: function () {
    this.setData({
      articleList: [],
      pageCount: 1,
      pageSize: 10,
      totalCount: 0,
      loadMore: !0
    }), this.getArticleList(), this.getClient();
  },
  onPullDownRefresh: function () {
    this.setData({
      articleList: [],
      pageCount: 1,
      pageSize: 10,
      totalCount: 0,
      loadMore: !0
    }), this.getArticleList(), this.getClient();
  },
  onReachBottom: function () {
    this.data.loadMore && this.getArticleList();
  },
  onShareAppMessage: function () {},
  onSearchTap: function () {
    wx.navigateTo({
      url: "/pages/search/search"
    });
  },
  onInterestingItemTap: function (t) {
    var a = t.currentTarget.dataset.type;
    "mzrj" == a || "zpxt" == a || "nscd" == a ? wx.navigateTo({
      url: "/pages/diaryList/diaryList?type=" + a
    }) : "pyq" != a && "djt" != a && "chp" != a || wx.navigateTo({
      url: "/pages/momentDetail/momentDetail?type=" + a
    });
  },
  onArticleItemTap: function (t) {
    wx.navigateTo({
      url: "/pages/articleDetail/articleDetail?articleId=" + t.currentTarget.dataset.id
    });
  },
  onUnlockTap: function () {
    "ios" != this.data.platform || this.data.iosPayEnabled ? this.setData({
      dialogShow: !0
    }) : wx.showModal({
      title: "提示",
      content: "由于相关规范，iOS功能暂不可用",
      confirmText: "确定",
      success: function (t) {
        t.confirm;
      }
    });
  },
  getArticleList: function () {
    var e = this,
      i = {
        categoryId: "21",
        pageCount: e.data.pageCount,
        pageSize: e.data.pageSize
      };
    a.getArticleList(i).then(function (a) {
      if (a.login) t.login();
      else {
        var i = e.data.articleList.concat(a.responseData.articleList),
          o = !0;
        e.data.pageSize * e.data.pageCount >= a.responseData.totalCount && (o = !1), e.setData({
          articleList: i,
          pageCount: e.data.pageCount + 1,
          totalCount: a.responseData.totalCount,
          loadMore: o
        });
      }
    });
  },
  getClient: function () {}
});