const express = require("express");

const C = require("../controllers/staticNotif");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/create",C.createStaticNotif)

router.get("/getall",C.getall)

router.post("/update/:id",protect,C.editStaticNotif)

router.post("/push",C.pushNotif)

module.exports = router;
