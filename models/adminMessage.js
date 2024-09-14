
const mongoose = require("mongoose");

const adminMessage = new mongoose.Schema(
  {
    admin : {
        username : {type : String},
        phone : {type : String},
        group : [String],
        adminRole : {type : String},
        firstName : {type : String} , lastName : {type : String}
    },
    enTitle:{
      type: String,
      required:true
    },
    enMessage: {
      type: String,
      required:true
    },
    recipientGroup : {type : String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("adminMessages", adminMessage);
