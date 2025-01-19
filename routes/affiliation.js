const express = require("express");
const router = express.Router();
const { authChack } = require("../middleware/authChack");
const {
  createAffiliation,
  listAffiliation,
  updateAffiliation,
  removeAffiliation,
} = require("../controller/affiliation_controller");

router.post("/createaffiliation", authChack, createAffiliation);
router.get("/listAffiliation", listAffiliation);
router.put("/updateaffiliation/:id", authChack, updateAffiliation);
router.delete("/removeaffiliation/:id", authChack, removeAffiliation);

module.exports = router;
