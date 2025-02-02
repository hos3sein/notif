const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const StaticNotif=require("../models/StaticNotif")
const Notification=require("../models/Notification")
const {refreshNotif , newLog}=require("../utils/refresh")
const {pushyRequest}=require("../utils/pushyRequest")
const {getDeviceToken}=require("../utils/getDeviceToken")
const {pushy}=require("../utils/pushy")
const {initStaticNotifApproveService,
  initCommerceSecion,
  initStaticTransportService,
  initStaticNotifLineMakerService,
  authentication,
  initStaticTruckService}=require("../test")

exports.createStaticNotif = asyncHandler(async (req, res, next) => {
  await StaticNotif.remove()
  initStaticNotifApproveService.forEach(async(item)=>{
    const create=await StaticNotif.create({
      serviceName:item.serviceName,
      cnTitle:item.cnTitle,
      enTitle:item.enTitle,
      cnMassage:item.cnMassage,
      enMassage:item.enMassage,
      cnDescription:item.cnDescription,
      enDescription:item.enDescription,
      number:item.number,
      section:item.section
    })
  })
  initCommerceSecion.forEach(async(item)=>{
    console.log(item.number);
    const create=await StaticNotif.create({
      serviceName:item.serviceName,
      cnTitle:item.cnTitle,
      enTitle:item.enTitle,
      cnMassage:item.cnMassage,
      enMassage:item.enMassage,
      cnDescription:item.cnDescription,
      enDescription:item.enDescription,
      number:item.number,
      section:item.section
    })
  })
  initStaticTransportService.forEach(async(item)=>{
    const create=await StaticNotif.create({
      serviceName:item.serviceName,
      cnTitle:item.cnTitle,
      enTitle:item.enTitle,
      cnMassage:item.cnMassage,
      enMassage:item.enMassage,
      cnDescription:item.cnDescription,
      enDescription:item.enDescription,
      number:item.number,
      section:item.section
    })
  })
  authentication.forEach(async(item)=>{
    const create=await StaticNotif.create({
      serviceName:item.serviceName,
      cnTitle:item.cnTitle,
      enTitle:item.enTitle,
      cnMassage:item.cnMassage,
      enMassage:item.enMassage,
      cnDescription:item.cnDescription,
      enDescription:item.enDescription,
      number:item.number,
      section:item.section
    })
  })
  initStaticNotifLineMakerService.forEach(async(item)=>{
    const create=await StaticNotif.create({
      serviceName:item.serviceName,
      cnTitle:item.cnTitle,
      enTitle:item.enTitle,
      cnMassage:item.cnMassage,
      enMassage:item.enMassage,
      cnDescription:item.cnDescription,
      enDescription:item.enDescription,
      number:item.number,
      section:item.section
    })
  })
  initStaticTruckService.forEach(async(item)=>{
    const create=await StaticNotif.create({
      serviceName:item.serviceName,
      cnTitle:item.cnTitle,
      enTitle:item.enTitle,
      cnMassage:item.cnMassage,
      enMassage:item.enMassage,
      cnDescription:item.cnDescription,
      enDescription:item.enDescription,
      number:item.number,
      section:item.section
    })
  })
  const all=await StaticNotif.find()
  res.status(200).json({
    success: true,
    data:all
  });
});



exports.editStaticNotif=asyncHandler(async (req, res, next) => {
  const {cnTitle,enTitle,cnMassage,enMassage,cnDescription,enDescription}=req.body
  const last = await StaticNotif.findById(req.params.id)
  await StaticNotif.findByIdAndUpdate(req.params.id,{
    cnTitle,enTitle,cnMassage,enMassage,cnDescription,enDescription
  })
  
    const Log = {
    admin : {username :req.user.username , phone : req.user.phone , adminRole : req.user?.adminRole , group :  req.user?.group , firstName : req.user?.firstName , lastName : req.user?.lastName},
    section : "notification",
    part : "update notifications",
    success : true,
    description : `${req.user.username}  has successfully update notification ${last.enDescription} to title : ${enTitle} , message : ${enMessage} , description : ${enDescription}`,
  }
  await newLog(Log)
  
  res.status(201).json({
    success: true,
  });
});
exports.getall = asyncHandler(async (req, res, next) => {
  const all=await StaticNotif.find()
  res.status(200).json({
    success: true,
    data:all,
  });
});


exports.pushNotif= asyncHandler(async (req, res, next) => {
  // console.log("ffffffff",req.body);
   const {serviceName , number , userId}=req.body
   console.log("req",req.body);
   const notifInfo=await StaticNotif.findOne({
    $and:[
      {serviceName:serviceName},
      {number:number}
    ]
   })
   await Notification.create({
    enTitle:notifInfo.enTitle,
    enMessage:notifInfo.enMassage,
    cnTitle:notifInfo.cnTitle,
    cnMessage:notifInfo.cnMassage,
    recipientId:userId, 
    staticNotifId:notifInfo._id
   })
 
const deviceTokenArray =await getDeviceToken(userId)
// console.log('device token>>>' , deviceTokenArray)
console.log("notiffInfo>>>>",notifInfo);
console.log("devicetkenArray",deviceTokenArray);

if(!notifInfo){
  return res.status(401).json({success:false,err:"NotifNotFound"})
}
if(!deviceTokenArray){
   return res.status(401).json({success:false,err:"deviceTokenNotFound"})
}

// console.log(deviceTokenArray);

deviceTokenArray.forEach( async(deviceToken) => {
//   console.log(deviceToken);
  const noti = await pushyRequest(deviceToken , notifInfo)
  console.log('notifResault>>>>' , noti)
});
 
 await refreshNotif()
 res.status(200).json({success:true,data:{}})
})