const express = require("express");
const router = express.Router();
const { authChack } = require("../middleware/authChack");

const {
  createStatusRecipient,
  listStatusRecipient,
  updateStatusRecipient,
  removeStatusRecipient,
} = require("../controller/statusrecipient_controller");

router.post("/createstatusrecipient", authChack, createStatusRecipient);
router.get("/liststatusrecipient", listStatusRecipient);
router.put("/updatestatusrecipient/:id", authChack, updateStatusRecipient);
router.delete("/removestatusrecipient/:id", authChack, removeStatusRecipient);

module.exports = router;
