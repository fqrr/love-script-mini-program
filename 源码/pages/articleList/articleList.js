getApp(), require("../../configs/config.js");

var t = require("../../apis/api.js"), a = require("../../utils/util.js");

Page({
    data: {
        dialogShow: !1,
        platform: "ios",
        iosPayEnabled: !1,
        categoryId: "",
        category2Id: "",
        categoryList: [],
        articleList: [],
        pageCount: 1,
        pageSize: 10,
        totalCount: 0,
        loadMore: !0
    },
    onLoad: function(t) {
        this.setData({
            categoryId: t.categoryId,
            platform: a.getPlatform()
        }), wx.setNavigationBarTitle({
            title: t.categoryName
        }), this.getClient(), this.getCategoryList();
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
            articleList: [],
            pageCount: 1,
            pageSize: 10,
            totalCount: 0,
            loadMore: !0
        }), this.getArticleList();
    },
    onReachBottom: function() {
        this.data.loadMore && this.getArticleList();
    },
    onShareAppMessage: function() {},
    onCategoryItemTap: function(t) {
        this.setData({
            category2Id: t.currentTarget.dataset.id,
            articleList: [],
            pageCount: 1,
            pageSize: 10,
            totalCount: 0,
            loadMore: !0
        }), this.getArticleList();
    },
    onArticleItemTap: function(t) {
        wx.navigateTo({
            url: "/pages/articleDetail/articleDetail?articleId=" + t.currentTarget.dataset.id
        });
    },
    onUnlockTap: function() {
        "ios" != this.data.platform || this.data.iosPayEnabled ? this.setData({
            dialogShow: !0
        }) : wx.showModal({
            title: "提示",
            content: "由于相关规范，iOS功能暂不可用",
            confirmText: "确定",
            success: function(t) {
                t.confirm;
            }
        });
    },
    getClient: function() {},
    getCategoryList: function() {
        var a = this, e = {
            categoryId: a.data.categoryId
        };
        t.getArticleCategoryList(e).then(function(t) {
            a.setData({
                categoryList: t.responseData.categoryList,
                category2Id: t.responseData.categoryList[0].id
            }), a.getArticleList();
        });
    },
    getArticleList: function() {
        var a = this, e = {
            categoryId: a.data.category2Id,
            pageCount: a.data.pageCount,
            pageSize: a.data.pageSize
        };
        t.getArticleList(e).then(function(t) {
            var e = a.data.articleList.concat(t.responseData.articleList), i = !0;
            a.data.pageSize * a.data.pageCount >= t.responseData.totalCount && (i = !1), a.setData({
                articleList: e,
                pageCount: a.data.pageCount + 1,
                totalCount: t.responseData.totalCount,
                loadMore: i
            });
        });
    }
});