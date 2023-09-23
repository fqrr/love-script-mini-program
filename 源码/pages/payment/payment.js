getApp(), require("../../configs/config.js");

var a = require("../../apis/api.js");

require("../../utils/util.js"), Page({
    data: {
        orderId: "",
        code: ""
    },
    onLoad: function(a) {
        this.setData({
            orderId: a.orderId
        });
        var e = this;
        wx.login({
            success: function(a) {
                e.setData({
                    code: a.code
                }), e.pay();
            },
            fail: function(a) {
                wx.navigateBackMiniProgram();
            }
        });
    },
    onShareAppMessage: function() {},
    pay: function() {
        var e = this, t = {
            orderId: e.data.orderId,
            code: e.data.code
        };
        a.pay(t).then(function(a) {
            wx.requestPayment({
                timeStamp: a.responseData.timeStamp,
                nonceStr: a.responseData.nonceStr,
                package: a.responseData.package,
                signType: a.responseData.signType,
                paySign: a.responseData.paySign,
                success: function(a) {
                    wx.navigateBackMiniProgram({
                        extraData: {
                            status: !0,
                            orderId: e.data.orderId
                        }
                    });
                },
                fail: function(a) {
                    wx.navigateBackMiniProgram({
                        extraData: {
                            status: !1,
                            errMsg: a.errMsg
                        }
                    });
                }
            });
        });
    }
});