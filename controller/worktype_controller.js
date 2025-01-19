const prisma = require("../config/prisma");

exports.createWorkType = async (req, res) => {
  try {
    // code
    const { worktypename, groupworkId } = req.body;
    const worktype = await prisma.WorkType.findFirst({
      where: {
        WorkTypename: worktypename,
      },
    });
    if (worktype) {
      return res.status(400).json({ message: "Worktypename already exits!!" });
    }
    await prisma.WorkType.create({
      data: {
        WorkTypename: worktypename,
        groupworkId: parseInt(groupworkId),
      },
    });
    res.status(200).json({ message: "Create Succress!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.listWorkType = async (req, res) => {
  try {
    // code
    const worktype = await prisma.WorkType.findMany({
      include: {
        groupwork: {
          // ระบุชื่อโมเดลที่สัมพันธ์
          select: {
            id: true,
            GroupWorkname: true,
          },
        },
      },
    });
    res.status(200).send(worktype);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.updateWorkType = async (req, res) => {
  try {
    // code
    const { id } = req.params;
    const { worktypename, groupworkId } = req.body;

    // ดึงข้อมูลเดิมจากฐานข้อมูล
    const existingWorkType = await prisma.workType.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingWorkType) {
      return res.status(404).json({ message: "WorkType not found" });
    }

    await prisma.WorkType.update({
      where: {
        id: Number(id),
      },
      data: {
        WorkTypename: worktypename || existingWorkType.WorkTypename,
        groupworkId: groupworkId
          ? parseInt(groupworkId)
          : existingWorkType.groupworkId,
      },
    });
    res.status(200).json({ message: "Update Succress!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.removeWorkType = async (req, res) => {
  try {
    // code
    const { id } = req.params;
    await prisma.WorkType.delete({
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
