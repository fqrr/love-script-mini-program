var e = {
    getPlatform: function() {
        return wx.getSystemInfoSync().platform || "ios";
    },
    getDevicePixelRatio: function() {
        return 750 / wx.getSystemInfoSync().windowWidth || 2;
    },
    getUserId: function() {
        return wx.getStorageSync("userId") || "";
    },
    getMemberType: function() {
        return wx.getStorageSync("memberType") || "";
    },
    getMemberTime: function() {
        var e = wx.getStorageSync("memberTime");
        return e ? "-1" == e ? "永久" : new Date(1e3 * e).format("yyyy-MM-dd") : "";
    }
};

module.exports = e;