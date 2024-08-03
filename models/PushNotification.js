const mongoose = require("mongoose");

const PushNotificationSchema = new mongoose.Schema(
  {
    notificationType: {
      type: String,
    },
    title: {
      type: String,
      
    },

    message: {
      type: String,
      
    },
    recipient: {
      _id: { type: mongoose.Schema.ObjectId },
      username: { type: String },
      pictureProfile: { type: String,default:"" },
    },
    sender: {
      _id: { type: mongoose.Schema.ObjectId },
      username: { type: String },
      pictureProfile: { type: String ,default:""},
    },

    navigateTo: {
      type: String,
      default: "",  
    },
    relationModel: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PushNotification", PushNotificationSchema);
