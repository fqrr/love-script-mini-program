var e = getApp(), t = (require("../../configs/config.js"), require("../../apis/api.js")), a = require("../../utils/util.js");

Page({
    data: {
        dialogShow: !1,
        userId: "",
        memberType: "",
        memberTime: "",
        planList: [ {
            type: "plan1",
            name: "",
            price: "",
            tip: "原价：40元",
            label: "新手入门",
            text: "今日仅限100名"
        }, {
            type: "plan2",
            name: "",
            price: "",
            tip: "原价：129元",
            label: "人气最高",
            text: "所有功能免费看"
        }, {
            type: "plan3",
            name: "",
            price: "",
            tip: "原价：199元",
            label: "优惠最高",
            text: "永久免费更新"
        } ],
        selectedPlanType: "plan3",
        noticeList: [ "林**45刚刚开通了永久会员", "二**百的刚刚开通了永久会员", "王**u12刚刚开通了永久会员", "V**895刚刚开通了年度会员", "善**ku刚刚开通了永久会员", "T**y刚刚开通了永久会员", "奔**无刚刚开通了永久会员", "小**瓜刚刚开通了年度会员", "T**y刚刚开通了永久会员", "徐**3刚刚开通了永久会员" ]
    },
    onLoad: function(t) {
        var n = this;
        this.setData({
            enabled: t.enabled,
            userId: a.getUserId(),
            memberType: a.getMemberType(),
            memberTime: a.getMemberTime()
        }), e.onLoginSuccess = function() {
            n.setData({
                userId: a.getUserId(),
                memberType: a.getMemberType(),
                memberTime: a.getMemberTime()
            });
        }, e.onLoginFail = function() {
            wx.showToast({
                title: "获取登录信息失败！",
                icon: "none"
            });
        }, wx.onAppShow(function(e) {
            if (e && 1038 == e.scene && e.referrerInfo) {
                var t = e.referrerInfo.extraData;
                n.setData({
                    enabled: !0
                }), t.status ? (n.setData({
                    orderId: t.orderId
                }), n.queryOrder()) : "requestPayment:fail cancel" == t.errMsg ? n.setData({
                    dialogShow: !0
                }) : wx.showToast({
                    title: "支付失败！" + t.errMsg,
                    icon: "none"
                });
            }
        }), this.getPlanNameList(), this.getPlanPriceList();
    },
    onShareAppMessage: function() {},
    onSubmitTap: function() {
        this.setData({
            membershipDialogShow: !1
        }), this.createOrder();
    },
    getPlanNameList: function() {
        var e = this, a = {
            key: "planName"
        };
        t.getDictionary(a).then(function(t) {
            var a = e.data.planList, n = t.responseData.result;
            for (var r in a) for (var i in n) a[r].type == n[i].name && (a[r].name = n[i].value);
            e.setData({
                planList: a
            });
        });
    },
    getPlanPriceList: function() {
        var e = this, a = {
            key: "planPrice"
        };
        t.getDictionary(a).then(function(t) {
            var a = e.data.planList, n = t.responseData.result;
            for (var r in a) for (var i in n) a[r].type == n[i].name && (a[r].price = parseInt(n[i].value) / 100);
            e.setData({
                planList: a
            });
        });
    },
    createOrder: function() {
        var e = this, a = {
            planType: e.data.selectedPlanType
        };
        t.createOrder(a).then(function(t) {
            t.responseData.paymentAppid ? wx.navigateToMiniProgram({
                appId: t.responseData.paymentAppid,
                path: "/pages/payment/payment?orderId=" + t.responseData.orderId
            }) : (e.setData({
                orderId: t.responseData.orderId
            }), e.pay());
        });
    },
    pay: function() {
        var e = this, a = {
            orderId: e.data.orderId
        };
        t.pay(a).then(function(t) {
            wx.requestPayment({
                timeStamp: t.responseData.timeStamp,
                nonceStr: t.responseData.nonceStr,
                package: t.responseData.package,
                signType: t.responseData.signType,
                paySign: t.responseData.paySign,
                success: function() {
                    e.queryOrder();
                },
                fail: function(t) {
                    "requestPayment:fail cancel" == t.errMsg ? e.setData({
                        dialogShow: !0
                    }) : wx.showToast({
                        title: "支付失败！" + t.errMsg,
                        icon: "none"
                    });
                }
            });
        });
    },
    queryOrder: function() {
        var a = {
            orderId: this.data.orderId
        };
        t.queryOrder(a).then(function(t) {
            e.login(), wx.showModal({
                title: "提示",
                content: "续费成功！"
            });
        }, function(e) {
            wx.showModal({
                title: "提示",
                content: e.responseMessage
            });
        });
    },
    onPlanItemTap: function(e) {
        this.setData({
            selectedPlanType: e.currentTarget.dataset.type
        });
    }
});