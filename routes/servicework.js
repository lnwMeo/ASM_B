const express = require("express");
const router = express.Router();
const upload = require("../middleware/uplodeImage");
const {
  createServiceWork,
  listServiceWork,
  listServiceWorkById,
  UpdateStatusServiceWork,
  getServiceSummary,
  getEmployeeSummary,
  removeServiceWork,
} = require("../controller/servicework_controller");

router.post("/createservicework", upload.single("image"), createServiceWork);
router.get("/listservicework", listServiceWork);
router.get("/listserviceworkbyid/:id", listServiceWorkById);
router.post("/updatestatusservicework", UpdateStatusServiceWork);
router.get("/getservicesummary", getServiceSummary);
router.get("/getemployeesummary", getEmployeeSummary);
router.delete("/removeservicework/:id", removeServiceWork);

module.exports = router;
