const prisma = require("../config/prisma");

exports.createGroupWork = async (req, res) => {
  try {
    // code
    const { groupworkname } = req.body;
    const groupwork = await prisma.GroupWork.findFirst({
      where: {
        GroupWorkname: groupworkname,
      },
    });
    if (groupwork) {
      return res
        .status(400)
        .json({ message: "GroupWorkname already exits!!!" });
    }
    await prisma.GroupWork.create({
      data: {
        GroupWorkname: groupworkname,
      },
    });
    res.status(200).json({ message: "Create Sucress!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.listGroupWork = async (req, res) => {
  try {
    // code
    const groupwork = await prisma.GroupWork.findMany();
    res.send(groupwork);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.updateGroupWork = async (req, res) => {
  try {
    // code
    const { id } = req.params;
    const { groupworkname } = req.body;
    const groupwork = await prisma.GroupWork.findFirst({
      where: {
        GroupWorkname: groupworkname,
      },
    });
    if (groupwork) {
      return res.status(400).json({ message: "GroupWorkname already exits!!" });
    }

    await prisma.GroupWork.update({
      where: {
        id: Number(id),
      },
      data: {
        GroupWorkname: groupworkname,
      },
    });
    res.status(200).json({ message: "Update Sucress!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.removeGroupWork = async (req, res) => {
  try {
    // code
    const { id } = req.params;
    await prisma.GroupWork.delete({
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
exports.listGroupWorkWithWorkTypeEmployee = async (req, res) => {
  try {
    // ดึงข้อมูล GroupWork พร้อม WorkType ที่เกี่ยวข้อง
    const groupworks = await prisma.GroupWork.findMany({
      include: {
        WorkType: {
          select: {
            id: true,
            WorkTypename: true,
          },
        }, // ดึงข้อมูล WorkType ที่เกี่ยวข้อง
        employee: {
          select: {
            id: true,
            Employeename: true,
          },
        }, // ดึงข้อมูล WorkType ที่เกี่ยวข้อง
      },
    });

    res.status(200).json(groupworks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.listGroupWorkWithEmployee = async (req, res) => {
  try {
    // ดึงข้อมูล GroupWork พร้อม WorkType ที่เกี่ยวข้อง
    const groupworks = await prisma.GroupWork.findMany({
      include: {
        employee: {
          select: {
            id: true,
            Employeename: true,
          },
        }, // ดึงข้อมูล WorkType ที่เกี่ยวข้อง
      },
    });

    res.status(200).json(groupworks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
