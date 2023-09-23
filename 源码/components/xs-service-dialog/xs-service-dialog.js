var t = require("../../configs/config.js");

Component({
    properties: {
        icon: String,
        title: String,
        content: String,
        image: String,
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
        onImageLongPress: function() {
            wx.previewImage({
                urls: [ this.data.image ]
            });
        },
        onConfirmTap: function() {
            wx.setClipboardData({
                data: t.serviceWeChatId
            });
        }
    }
});