const express = require("express");
const router = express.Router();
const { authChack } = require("../middleware/authChack");

const {
  createQuestionRating,
  listQuestionRating,
  updateQuestionRating,
  removeQuestionRating,
} = require("../controller/questionrating_controller");
router.post("/createquestionrating", authChack, createQuestionRating);
router.get("/listquestionrating", listQuestionRating);
router.put("/updatequestionrating/:id", authChack, updateQuestionRating);
router.delete("/removequestionrating/:id", authChack, removeQuestionRating);
module.exports = router;
