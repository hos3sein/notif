const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    enTitle:{
      type: String,
      required:true
    },
    enMessage: {
      type: String,
      required:true
    },
    cnTitle:{
      type: String,
      required:true
    },
    cnMessage: {
      type: String,
      required:true
    },
    recipientId: {
      type: mongoose.Schema.ObjectId,
      required:true
    },
    staticNotifId: {
      type: mongoose.Schema.ObjectId,
      ref:"StaticNotification"
    },
    senderId: {
      type: mongoose.Schema.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
