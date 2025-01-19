const express = require("express");
const router = express.Router();
const { authChack } = require("../middleware/authChack");
const {
  createEmployee,
  listEmployee,
  updateEmployee,
  removeEmployee,
  listEmployeeGroupwork
} = require("../controller/employee_controller");

router.post("/createemployee", authChack, createEmployee);
router.get("/listemployee", listEmployee);
router.get("/listemployeegroupwork", listEmployeeGroupwork);
router.put("/updateemployee/:id", authChack, updateEmployee);
router.delete("/removeemployee/:id", authChack, removeEmployee);

module.exports = router;
