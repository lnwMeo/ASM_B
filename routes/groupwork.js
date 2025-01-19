const express = require("express");
const router = express.Router();

const { authChack } = require("../middleware/authChack");

const {
  createGroupWork,
  listGroupWork,
  updateGroupWork,
  removeGroupWork,
  listGroupWorkWithWorkTypeEmployee,
  listGroupWorkWithEmployee,
} = require("../controller/groupwork_controller");

router.post("/creategroupwork", authChack, createGroupWork);
router.get("/listgroupwork", listGroupWork);
router.get("/listgroupworkwithworktypeemployee", listGroupWorkWithWorkTypeEmployee);
router.get("/listgroupworkwithemployee", listGroupWorkWithEmployee);
router.put("/updategroupwork/:id", authChack, updateGroupWork);
router.delete("/removegroupwork/:id", authChack, removeGroupWork);

module.exports = router;
