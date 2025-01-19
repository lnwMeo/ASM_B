const prisma = require("../config/prisma");

exports.createAffiliation = async (req, res) => {
  try {
    const { affiliationname } = req.body;
    const affiliation = await prisma.affiliation.findFirst({
      where: {
        affiliationname: affiliationname,
      },
    });
    if (affiliation) {
      return res
        .status(400)
        .json({ message: "Affiliationname already exits!!" });
    }
    await prisma.affiliation.create({
      data: {
        affiliationname: affiliationname,
      },
    });
    res.status(200).json({ message: "Create Succress!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.listAffiliation = async (req, res) => {
  try {
    const affiliation = await prisma.affiliation.findMany();
    res.send(affiliation);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.updateAffiliation = async (req, res) => {
  try {
    const { id } = req.params;
    const { affiliationname } = req.body;
    const affiliation = await prisma.affiliation.findFirst({
      where: {
        affiliationname: affiliationname,
      },
    });
    if (affiliation) {
      return res
        .status(400)
        .json({ message: "Affiliationname already exits!!" });
    }

    await prisma.affiliation.update({
      where: {
        id: Number(id),
      },
      data: {
        affiliationname: affiliationname,
      },
    });
    res.status(200).json({ message: "Update Succress" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.removeAffiliation = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.affiliation.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "Delete Succress" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
