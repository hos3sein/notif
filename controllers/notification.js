const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Notification = require("../models/Notification");
const { refresh,refreshNotif } = require("../utils/refresh");
const { getUsers } = require("../utils/getDeviceToken");
const {pushyRequest}=require("../utils/pushyRequest")
const {getDeviceToken}=require("../utils/getDeviceToken")


exports.createNotif = asyncHandler(async (req, res, next) => {
  const {title,message,notificationType,relation,recipient,sender}=req.body
  const create=await Notification.create({
    title,
    message,
    notificationType,
    relation,
    recipient,
    sender
  })
  // await refresh(req.body.recipient._id, "refreshNotification");
  res.status(200).json({
    success: true,
    newCode: create,
  });
});

exports.allMe = asyncHandler(async (req, res, next) => {
  const allme = await Notification.find({
    recipientId: req.user._id,
  }).sort({ createdAt: "desc" });

  res.status(200).json({
    success: true,
    data: allme,
  });
});

exports.read = asyncHandler(async (req, res, next) => {
  const find = await Notification.findByIdAndUpdate(
    req.params.id,
    {
      read: true,
    },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: find,
  });
});

exports.del = asyncHandler(async (req, res, next) => {
  await Notification.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

exports.all = asyncHandler(async (req, res, next) => {
  const allme = await Notification.find().sort({ createdAt: "desc" });

  res.status(200).json({
    success: true,
    data: allme,
  });
});
exports.notifUser = asyncHandler(async (req, res, next) => {
  const allme = await Notification.find({
    recipientId:req.params.id
  })

  res.status(200).json({
    success: true,
    data: allme,
  });
});

exports.test = asyncHandler(async (req, res, next) => {


  res.status(200).json({
    success: true,
    data: "http worked !!!",
  });
});

exports.notifUser = asyncHandler(async (req, res, next) => {
  const {title,message,notificationType,type}=req.body
  console.log('body....',req.body)
  const notification =[]
  const sender={
    _id:req.user._id,
    pictureProfile:req.user.pictureProfile,
    username:req.user.username
  }
  const users=await getUsers(type)
   if(users.length==0){
    next(new ErrorResponse(404,"no user find !!"))
   }
  users.forEach(async(item) => {
    const notif={
    enTitle:title ,
    enMassage:message,
    cnTitle:title,
    cnMessage:message,
    recipientId:item._id, 
    // staticNotifId : notifInfo._id
    //   ,
    //   ,
    //   recipient:users,
    //   sender
    }
    const deviceTokenArray =await getDeviceToken(item._id)
    console.log(item._id , deviceTokenArray)
    deviceTokenArray.forEach( async(deviceToken) => {
      console.log('device tokens>>>>',deviceToken);
      await pushyRequest(deviceToken , notif)
    });
    notification.push(notif)
    await Notification.create(notif)
  });
  console.log('<<<<<<<<<<<>>>>>>>>>',notification)
  await refreshNotif()
  res.status(201).json({
    success: true,
    notification
  });
});



exports.single = asyncHandler(async (req, res, next) => {
  const {title,message,notificationType}=req.body

 const recipient={
    _id:req.params.id,
    pictureProfile:req.user.pictureProfile,
    username:req.user.username
  }
  const sender={
    _id:req.user._id,
    pictureProfile:req.user.pictureProfile,
    username:req.user.username
  }

  const notif={
    title,
    message,
    notificationType,
    recipient,
    sender
  }
  await Notification.create(notif)
  await refreshNotif()
  res.status(201).json({
    success: true,
  });
});