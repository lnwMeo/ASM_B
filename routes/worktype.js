const express = require("express");
const router = express.Router();

const { authChack } = require("../middleware/authChack");

const {
  createWorkType,
  listWorkType,
  updateWorkType,
  removeWorkType,
} = require("../controller/worktype_controller");

router.post("/createworktype", authChack, createWorkType);
router.get("/listworktype", listWorkType);
router.put("/updateworktype/:id", authChack, updateWorkType);
router.delete("/removeworktype/:id", authChack, removeWorkType);

module.exports = router;
