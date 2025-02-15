const express = require("express");
const router = express.Router();
const { authChack } = require("../middleware/authChack");
const {
  register,
  login,
  listadmin,
  updateAdmin,
  removeAdmin,
} = require("../controller/auth_controller");

router.post("/register",  register);
router.post("/login", login);
router.get("/listadmin",  listadmin);
router.put("/updateadmin/:id", authChack, updateAdmin);
router.delete("/removeadmin/:id", authChack, removeAdmin);

module.exports = router;
