Component({
    properties: {
        show: Boolean
    },
    data: {},
    methods: {
        onDialogTap: function() {},
        onCloseTap: function() {
            this.setData({
                show: !1
            });
        },
        onConfirmTap: function() {
            this.setData({
                show: !1
            }), wx.navigateTo({
                url: "/pages/membership/membership?enabled=true"
            });
        }
    }
});