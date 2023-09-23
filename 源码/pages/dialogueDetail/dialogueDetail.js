getApp(), require("../../configs/config.js");

var a = require("../../apis/api.js");

require("../../utils/util.js"), Page({
    data: {
        dialogueId: "",
        dialogueDetail: {}
    },
    onLoad: function(a) {
        this.setData({
            dialogueId: a.dialogueId
        }), this.getDialogue();
    },
    onShareAppMessage: function() {},
    onDialogueItemTap: function(a) {
        wx.setClipboardData({
            data: a.currentTarget.dataset.text
        });
    },
    getDialogue: function() {
        var e = this, t = {
            dialogueId: e.data.dialogueId
        };
        a.getDialogue(t).then(function(a) {
            e.setData({
                dialogueDetail: a.responseData
            });
        });
    }
});