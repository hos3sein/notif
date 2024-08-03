const express = require("express");
const router = express.Router();

//prefix router Notif
const notification = require("./notification");
const pushNotification=require("./pushNotification")
const static=require("./staticNotif")
router.use("/", notification);
router.use("/pushnotification", pushNotification);
router.use("/static",static)

module.exports = router;
