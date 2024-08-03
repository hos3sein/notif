const mongoose = require("mongoose");

const StaticNotification = new mongoose.Schema(
  {
    serviceName: {
      type: String,
    },
    cnTitle: {
      type: String,
      default: "",
      require:true         
    },
    enTitle: {
      type: String,
      default: "",
      require:true   
    },
    cnMassage:{
        type: String,
        default: "",
        require:true  
    },
    enMassage:{
        type: String,
        default: "", 
        require:true 
    },
    cnDescription:{
        type: String,
        default: "", 
        require:true
    },
    enDescription:{
        type: String,
        default: "", 
        require:true
    },
    number:{
        type: Number,
    },
    section:{
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("StaticNotification", StaticNotification);
