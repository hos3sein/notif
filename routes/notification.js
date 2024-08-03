const express = require("express");

const C = require("../controllers/notification");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/create", C.createNotif);

router.get("/allme", protect, C.allMe);
router.get("/read/:id", protect, C.read);
router.get("/del", protect, C.del);
router.get("/all", C.all);
router.get("/tt/:id", C.notifUser);

router.post("/group",protect,C.notifUser);

router.post("/single",protect,C.single);

module.exports = router;
