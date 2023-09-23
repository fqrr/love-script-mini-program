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
    categoryList: [],
    articleList: []
  },
  onLoad: function () {

    this.setData({
      platform: a.getPlatform(),
      memberType: a.getMemberType()
    });

    // 在页面中定义激励视频广告
let videoAd = null

// 在页面onLoad回调事件中创建激励视频广告实例
if (wx.createRewardedVideoAd) {
  videoAd = wx.createRewardedVideoAd({
    adUnitId: 'adunit-e72a854111d9298e'
  })
  videoAd.onLoad(() => {})
  videoAd.onError((err) => {})
  videoAd.onClose((res) => {})
}

// 用户触发广告后，显示激励视频广告
if (videoAd) {
  videoAd.show().catch(() => {
    // 失败重试
    videoAd.load()
      .then(() => videoAd.show())
      .catch(err => {
        console.log('激励视频 广告显示失败')
      })
  })
}
   

  },
  onShow: function () {
    this.setData({
      memberType: a.getMemberType()
    }), this.getCategoryList(), this.getArticleList(), this.getClient(), t.login();

    
   
  },
  onPullDownRefresh: function () {
    this.setData({
      memberType: a.getMemberType()
    }), this.getCategoryList(), this.getArticleList(), this.getClient(), t.login();
  },
  onShareAppMessage: function () {},
  onSearchTap: function () {
    wx.navigateTo({
      url: "/pages/search/search"
    });
  },
  onSearchItemTap: function (t) {
    wx.navigateTo({
      url: "/pages/search/search?keyword=" + t.currentTarget.dataset.keyword
    });
  },
  onTopicItemTap: function (t) {
    wx.navigateTo({
      url: "/pages/chatList/chatList?categoryId=" + t.currentTarget.dataset.id + "&title=" + t.currentTarget.dataset.name
    });
  },
  onCombatMoreTap: function () {
    wx.switchTab({
      url: "/pages/combat/combat"
    });
  },
  onCombatItemTap: function (t) {
    "vip会员" != this.data.memberType && this.data.payEnabled ? "ios" != this.data.platform || this.data.iosPayEnabled ? this.setData({
      dialogShow: !0
    }) : wx.showModal({
      title: "提示",
      content: "由于相关规范，iOS功能暂不可用",
      confirmText: "确定",
      success: function (t) {
        t.confirm;
      }
    }) : wx.navigateTo({
      url: "/pages/articleDetail/articleDetail?articleId=" + t.currentTarget.dataset.id
    });
  },
  onHotTap: function () {
    wx.switchTab({
      url: "/pages/discover/discover"
    });
  },
  getClient: function () {},
  getCategoryList: function () {
    var t = this,
      a = {};
    e.getChatCategoryList(a).then(function (e) {
      t.setData({
        categoryList: e.responseData.categoryList
      });
    });
  },
  getArticleList: function () {
    var t = this,
      a = {
        pageCount: 1,
        pageSize: 9
      };
    e.getArticleList(a).then(function (e) {
      t.setData({
        articleList: e.responseData.articleList
      });
    });
  }
});