const express = require("express");

const C = require("../controllers/pushNotification");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/createpushnotif",C.createPushNotification)


module.exports = router;
