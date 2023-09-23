var t = getApp(),
  e = (require("../../configs/config.js"), require("../../apis/api.js")),
  a = require("../../utils/util.js");

Page({
  data: {
    dialogShow: !1,
    platform: "ios",
    memberType: "",
    iosPayEnabled: !1,
    payEnabled: !1,
    testList: [],
    selectList: [],
    articleList: [],
    pageCount: 1,
    pageSize: 10,
    totalCount: 0,
    loadMore: !0,
    selectColor: [{
      color: "#a9bde9",
      backgroundColor: "#ebedfa"
    }, {
      color: "#a68faf",
      backgroundColor: "#e9dfee"
    }, {
      color: "#d8baae",
      backgroundColor: "#f6efe9"
    }, {
      color: "#b3b5ba",
      backgroundColor: "#ebecf3"
    }]
  },
  onLoad: function () {
    var e = this;
    this.setData({
      platform: a.getPlatform(),
      memberType: a.getMemberType()
    }), t.onLoginSuccess = function () {
      e.setData({
        memberType: a.getMemberType()
      });
    };
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
    }), this.getArticleList(), this.getTestList(), this.getSelectList(), this.getClient();
  },
  onPullDownRefresh: function () {
    this.setData({
      articleList: [],
      pageCount: 1,
      pageSize: 10,
      totalCount: 0,
      loadMore: !0
    }), this.getArticleList(), this.getTestList(), this.getSelectList(), this.getClient();
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
  onTopicItemTap: function (t) {
    var e = t.currentTarget.dataset.id;
    "1" == e ? wx.switchTab({
      url: "/pages/test/test"
    }) : "2" == e ? wx.switchTab({
      url: "/pages/combat/combat"
    }) : "3" == e && wx.navigateTo({
      url: "/pages/dialogue/dialogue"
    });
  },
  onTestMoreTap: function () {
    wx.switchTab({
      url: "/pages/test/test"
    });
  },
  onTestItemTap: function (t) {
    wx.navigateTo({
      url: "/pages/testDetail/testDetail?testId=" + t.currentTarget.dataset.id
    });
  },
  onSelectItemTap: function (t) {
    wx.navigateTo({
      url: "/pages/articleList/articleList?categoryId=" + t.currentTarget.dataset.id + "&categoryName=" + t.currentTarget.dataset.name
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
  getClient: function () {},
  getTestList: function () {
    var t = this,
      a = {
        pageCount: 1,
        pageSize: 5
      };
    e.getTestList(a).then(function (e) {
      t.setData({
        testList: e.responseData.testList
      });
    });
  },
  getSelectList: function () {
    var t = this,
      a = {};
    e.getArticleCategoryList(a).then(function (e) {
      t.setData({
        selectList: e.responseData.categoryList
      });
    });
  },
  getArticleList: function () {
    var t = this,
      a = {
        categoryId: "22",
        pageCount: t.data.pageCount,
        pageSize: t.data.pageSize
      };
    e.getArticleList(a).then(function (e) {
      var a = t.data.articleList.concat(e.responseData.articleList),
        i = !0;
      t.data.pageSize * t.data.pageCount >= e.responseData.totalCount && (i = !1), t.setData({
        articleList: a,
        pageCount: t.data.pageCount + 1,
        totalCount: e.responseData.totalCount,
        loadMore: i
      });
    });
  }
});