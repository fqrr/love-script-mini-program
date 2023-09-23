var t = getApp(),
  e = (require("../../configs/config.js"), require("../../apis/api.js")),
  a = require("../../utils/util.js");

Page({
  data: {
    dialogShow: !1,
    platform: "ios",
    iosPayEnabled: !1,
    payEnabled: !1,
    memberType: "",
    testList: [],
    pageCount: 1,
    pageSize: 10,
    totalCount: 0,
    loadMore: !0
  },
  onLoad: function () {
    var e = this;
    t.onLoginSuccess = function () {
      e.setData({
        memberType: a.getMemberType()
      });
    }, this.setData({
      platform: a.getPlatform(),
      memberType: a.getMemberType()
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
      testList: [],
      pageCount: 1,
      pageSize: 10,
      totalCount: 0,
      loadMore: !0
    }), this.getTestList(), this.getClient(), t.login();

  },
  onPullDownRefresh: function () {
    this.setData({
      testList: [],
      pageCount: 1,
      pageSize: 10,
      totalCount: 0,
      loadMore: !0
    }), this.getTestList(), this.getClient(), t.login();
  },
  onReachBottom: function () {
    this.data.loadMore && this.getTestList();
  },
  onShareAppMessage: function () {},
  onTestItemTap: function (t) {
    wx.navigateTo({
      url: "/pages/testDetail/testDetail?testId=" + t.currentTarget.dataset.id
    });
  },
  getClient: function () {},
  getTestList: function () {
    var t = this,
      a = {
        pageCount: t.data.pageCount,
        pageSize: t.data.pageSize
      };
    e.getTestList(a).then(function (e) {
      var a = t.data.testList.concat(e.responseData.testList),
        o = !0;
      t.data.pageSize * t.data.pageCount >= e.responseData.totalCount && (o = !1), t.setData({
        testList: a,
        pageCount: t.data.pageCount + 1,
        totalCount: e.responseData.totalCount,
        loadMore: o
      });
    });
  }
});