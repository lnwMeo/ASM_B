const prisma = require("../config/prisma");

exports.createQuestionRating = async (req, res) => {
  try {
    // st 1 req body
    const { questionname } = req.body;
    // เช็คว่าซ้ำกันไหม
    const question = await prisma.QuestionRating.findFirst({
      where: {
        questionname: questionname,
      },
    });
    if (question) {
      return res.status(400).json({ message: "Questionname already exits!!" });
    }
    // สร้าง
    await prisma.QuestionRating.create({
      data: {
        questionname: questionname,
      },
    });
    res.status(200).json({ message: "Create Sucress!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.listQuestionRating = async (req, res) => {
  try {
    const question = await prisma.QuestionRating.findMany({
      select: {
        id: true,
        questionname: true,
      },
    });
    res.status(200).send(question);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.updateQuestionRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { questionname } = req.body;
    // เช็คว่าซ้ำกันไหม
    const question = await prisma.QuestionRating.findFirst({
      where: {
        questionname: questionname,
      },
    });
    if (question) {
      return res.status(400).json({ message: "Questionname already exits!!" });
    }
    await prisma.QuestionRating.update({
      where: {
        id: Number(id),
      },
      data: {
        questionname: questionname,
      },
    });
    res.status(200).json({ message: "Update Sucress!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.removeQuestionRating = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.QuestionRating.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "Delete Sucress!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
