const prisma = require("../config/prisma");

exports.createEmployee = async (req, res) => {
  try {
    // code
    const { employeename, groupworkId } = req.body;
    if (!groupworkId || !employeename) {
      return res.status(400).json({ message: "ข้อมูลไม่ครบถ้วน!" });
    }
    const employee = await prisma.Employee.findFirst({
      where: {
        Employeename: employeename,
      },
    });
    if (employee) {
      return res.status(400).json({ message: "Employeename already exits!!" });
    }
    await prisma.Employee.create({
      data: {
        Employeename: employeename,
        groupworkId: Number(groupworkId),
      },
    });
    res.status(200).json({ message: "Create Succress!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.listEmployee = async (req, res) => {
  try {
    const employee = await prisma.Employee.findMany({
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
    res.status(200).send(employee); // ส่งข้อมูลกลับ
  } catch (err) {
    console.error(err); // แสดงข้อผิดพลาด
    res.status(500).json({ message: "Server Error!!!" }); // ส่งข้อผิดพลาดกลับ
  }
};
exports.updateEmployee = async (req, res) => {
  try {
    // code
    const { id } = req.params;
    const { employeename, groupworkId } = req.body;

    // ดึงข้อมูลเดิม
    const existingEmployee = await prisma.Employee.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!existingEmployee) {
      return res.status(404).json({ message: "Employee not found!!!" });
    }
    await prisma.Employee.update({
      where: {
        id: Number(id),
      },
      data: {
        Employeename: employeename || existingEmployee.employeename,
        groupworkId: groupworkId
          ? parseInt(groupworkId)
          : existingEmployee.groupworkId,
      },
    });
    res.status(200).json({ message: "Update Succress!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.removeEmployee = async (req, res) => {
  try {
    // code
    const { id } = req.params;
    await prisma.Employee.delete({
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
exports.listEmployeeGroupwork = async (req, res) => {
  const { groupworkId } = req.query; // รับค่า groupworkId จาก query string

  try {
    const filters = {};
    if (groupworkId) {
      filters.ServiceWorkEmployee = {
        some: {
          servicework: {
            groupworkId: parseInt(groupworkId), // กรองตาม groupworkId
          },
        },
      };
    }

    const employees = await prisma.employee.findMany({
      where: filters,
      select: {
        id: true,
        Employeename: true,
      },
    });

    res.status(200).json(employees);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error!!!" });
  }
};

