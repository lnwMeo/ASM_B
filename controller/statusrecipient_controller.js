const prisma = require("../config/prisma");

exports.createStatusRecipient = async (req, res) => {
  try {
    const { statusname } = req.body;
    const statusrecipient = await prisma.StatusRecipient.findFirst({
      where: {
        statusrecipientname: statusname,
      },
    });

    if (statusrecipient) {
      return res
        .status(400)
        .json({ message: "statusrecipientname already exits!!" });
    }
    await prisma.StatusRecipient.create({
      data: {
        statusrecipientname: statusname,
      },
    });
    res.status(200).json({ message: "Create Succress!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.listStatusRecipient = async (req, res) => {
  try {
    const statusrecipient = await prisma.StatusRecipient.findMany();
    res.send(statusrecipient);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.updateStatusRecipient = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusname } = req.body;
    const statusrecipient = await prisma.StatusRecipient.findFirst({
      where: {
        statusrecipientname: statusname,
      },
    });
    if (statusrecipient) {
      return res
        .status(400)
        .json({ message: "statusrecipientname already exits!!" });
    }

    await prisma.StatusRecipient.update({
      where: {
        id: Number(id),
      },
      data: {
        statusrecipientname: statusname,
      },
    });
    res.status(200).json({ message: "Update Succress!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.removeStatusRecipient = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.StatusRecipient.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "Delete Succress!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
