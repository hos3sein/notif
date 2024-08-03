const Pushy = require('pushy');

const asyncHandler = require("../middleware/async");
const {getDeviceToken}=require("../utils/getDeviceToken")
const PushNotification = require("../models/PushNotification");
const StaticNotif=require("../models/StaticNotif")
const {pushyRequest}=require("../utils/pushyRequest")
const fetch = require("node-fetch");
exports.createPushNotification = asyncHandler(async (req, res, next) => {
 const {serviceName,number,id}=req.body
 const findNotif=await StaticNotif.findOne({
  $and:[
    {number:number},
    {serviceName:serviceName}
  ]
 })
  
const deviceTokenArray =await getDeviceToken(id)
 if(!findNotif){
  return res.status(401).json({success:false,err:"NotifNotFound"})
}
if(!deviceTokenArray){
   return res.status(401).json({success:false,err:"deviceTokenNotFound"})
} 
  deviceTokenArray.forEach( async(deviceToken) => {
     await pushyRequest(deviceToken,title,message,navigateTo)
  });
    res.status(200).json({success:true,data:{}})
});


  
  
  
  
        
          
        
  
  