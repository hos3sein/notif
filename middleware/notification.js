var Pushy = require("pushy");
const Notification = require("../models/Notification");

let pushyAPI = new Pushy(
  "4dcc1b863639f84048ce9ce80534332312efdad990281ef7538cf0550eadba6b"
);

exports.notification = async (req, res, next) => {
  let urls = [
    // "statustransport",
    "commentto",
    "requestto",
    "confirmrequest",
    "confirmdriver",
    "rejectdriver",
    "statuschange",
    "declinerequest",
    "requestdrivertoload",
    "bookingtime",
  ];

  const found = urls.find((v) => req.originalUrl.includes(v));

  const notifType =
    found == "statustransport"
      ? "Change Status Transportation"
      : found == "commentto"
      ? "Comment Product"
      : found == "requestto"
      ? "Request BusinessMan"
      : found == "confirmrequest"
      ? "Confirm BusinessMan"
      : found == "confirmdriver"
      ? "Confirm Driver"
      : found == "rejectdriver"
      ? "Reject Driver"
      : found == "statuschange"
      ? "Change Status Product"
      : found == "declinerequest"
      ? "Decline Product"
      : found == "requestdrivertoload"
      ? "Request Driver"
      : found == "bookingtime"
      ? "Booking Time"
      : null;

  //   +++++++++++++++++++++=
  const relModel =
    found == "statustransport" ||
    found == "commentto" ||
    found == "requestto" ||
    found == "confirmrequest" ||
    found == "confirmdriver" ||
    found == "rejectdriver" ||
    found == "statuschange" ||
    found == "declinerequest"
      ? "Product"
      : found == "requestdrivertoload"
      ? "RequestDriver"
      : found == "bookingtime"
      ? "Booking"
      : "";

  let make = [];

  if (found == "statuschange" || found == "declinerequest") {
    const product = await Product.findById(req.params.id);

    const recipientId =
      product.seller.toString() == req.user._id.toString()
        ? product.buyer
        : product.seller;

    await make.push({
      notificationType: notifType,
      sender: req.user._id,
      recipient: recipientId,
      relation: product._id,
      relationModel: relModel,
    });
  }

  if (found == "commentto") {
    const product = await Product.findById(req.body.productId);

    const recipientId =
      product.seller.toString() == req.user._id.toString()
        ? product.buyer
        : product.seller;

    await make.push({
      notificationType: notifType,
      sender: req.user._id,
      recipient: recipientId,
      relation: product._id,
      relationModel: relModel,
    });
  }

  if (found == "requestto") {
    const product = await Product.findById(req.params.id);

    await make.push({
      notificationType: notifType,
      sender: req.user._id,
      recipient: product.seller,
      relation: product._id,
      relationModel: relModel,
    });
  }

  if (
    found == "confirmrequest" ||
    found == "confirmdriver" ||
    found == "rejectdriver"
  ) {
    const product = await Product.findById(req.params.id);
    const request = await Request.findById(req.params.requestId);

    await make.push({
      notificationType: notifType,
      sender: req.user._id,
      recipient: request.user,
      relation: product._id,
      relationModel: relModel,
    });
  }
  if (found == "statustransport") {
    const transportation = await Transportation.findById(req.params.id);
    const product = await Product.findById(transportation.product);
    await make.push({
      notificationType: notifType,
      sender: req.user._id,
      recipient: product.seller,
      relation: product._id,
      relationModel: relModel,
    });
    await make.push({
      notificationType: notifType,
      sender: req.user._id,
      recipient: product.buyer,
      relation: product._id,
      relationModel: relModel,
    });
  }

  if (found == "requestdrivertoload") {
    const requestDriver = await RequestDriver.findById(req.params.id);

    if (requestDriver.product) {
      await make.push({
        notificationType: notifType,
        sender: req.user._id,
        recipient: requestDriver.requester,
        relation: requestDriver.product,
        relationModel: relModel,
      });
    }
  }

  if (found == "postcomment") {
    const post = await Post.findById(req.body.postId);

    const comment = await Comment.findById(req.body.responseTo);

    if (req.body.responseTo) {
      await make.push({
        notificationType: notifType,
        sender: req.user._id,
        recipient: post.sender,
        relation: post._id,
        relationModel: relModel,
      });

      await make.push({
        notificationType: notifType,
        sender: req.user._id,
        recipient: comment.writer,
        relation: post._id,
        relationModel: relModel,
      });
    } else {
      await make.push({
        notificationType: notifType,
        sender: req.user._id,
        recipient: comment.writer,
        relation: post._id,
        relationModel: relModel,
      });
    }
  }

  if (found == "likeordislike") {
    const post = await Post.findById(req.params.id);

    const comment = await Comment.findById(req.params.id);

    if (post) {
      await make.push({
        notificationType: notifType,
        sender: req.user._id,
        recipient: post.sender,
        relation: post._id,
        relationModel: relModel,
      });
    }

    if (comment) {
      await make.push({
        notificationType: notifType,
        sender: req.user._id,
        recipient: comment.writer,
        relation: post._id,
        relationModel: relModel,
      });
    }
  }

  if (found == "customerconfirmdriver" || found == "customerrejectdriver") {
    const requestDriver = await RequestDriver.findById(req.params.id);
    const request = await Request.findById(req.params.requestId);

    await make.push({
      notificationType: notifType,
      sender: req.user._id,
      recipient: request.user,
      relation: requestDriver._id,
      relationModel: relModel,
    });
  }

  // if (found == "bookingtime") {
  //   const user = await User.findById(req.params.id);

  //   const line = await LineMaker.findById(user.role);

  //   await make.push({
  //     notificationType: notifType,
  //     sender: req.user._id,
  //     recipient: req.params.id,
  //     // relation: requestDriver._id,
  //     relationModel: relModel,
  //   });
  // }

  if (make.length) {
    await createNotif(make);
  }

  next();
};

const createNotif = async (arr) => {
  arr &&
    arr.forEach(async (element) => {
      const notif = await Notification.create({
        sender: element.sender,
        recipient: element.recipient,
        notificationType: element.notificationType,
        relation: element.relation,
        relationModel: element.relationModel,
      });

      const user = await User.findById(element.recipient);

      await samIo.to(element.recipient.toString()).emit("refreshNotification");

      if (notif) {
        console.log("notiiif", notif);

        let options;
        let data;
        if (element.relationModel == "Product") {
          const pro = await Product.findById(element.relation);

          options = {
            notification: {
              badge: 1,
              sound: "ping.aiff",
              title: element.notificationType,
              body: `product that invoiceNumber: ${pro.invoiceNumber}`,
            },
          };

          data = {
            title: element.notificationType,
            message: `product that invoiceNumber: ${pro.invoiceNumber}`,
            info: {
              _id: notif._id,
              relation: notif.relation,
              notificationType: notif.notificationType,
            },
          };
        }

        console.log("infoooo", data);

        if (element.relationModel == "RequestDriver") {
          const re = await RequestDriver.findById(element.relation);

          options = {
            notification: {
              badge: 1,
              sound: "ping.aiff",
              title: element.notificationType,
              body: `Load that invoiceNumber: ${re.invoiceNumber}`,
            },
          };

          data = {
            title: element.notificationType,
            notifId: notif._id,
            message: `Load that invoiceNumber: ${re.invoiceNumber}`,
            info: {
              _id: notif._id,
              relation: notif.relation,
              notificationType: notif.notificationType,
            },
          };
        }

        const to = [user.deviceToken];

        pushyAPI.sendPushNotification(data, to, options, function (err, id) {
          // Log errors to console
          if (err) {
            return console.log("Fatal Error", err);
          }

          // Log success
          console.log("Push sent successfully! (ID: " + id + ")");
        });

        await user.updateOne(
          { $addToSet: { notifications: notif._id } },
          { new: true }
        );
      }
    });
};
