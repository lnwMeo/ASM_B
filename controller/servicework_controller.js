const prisma = require("../config/prisma");
const dayjs = require("dayjs");
const fs = require("fs"); // ตรวจสอบให้แน่ใจว่าบรรทัดนี้อยู่ด้านบน
const path = require("path"); // ตรวจสอบให้แน่ใจว่าบรรทัดนี้อยู่ด้านบน

exports.createServiceWork = async (req, res) => {
  try {
    const {
      servicerecipient,
      affiliationId,
      statusrecipientId,
      groupworkId,
      description,
      servicebudget,
      totalAmount,
      employeeIds, // พนักงานที่เกี่ยวข้อง
      worktypeId, // WorkType ที่เกี่ยวข้อง (เลือกได้แค่ 1)
      servicerating, // ข้อมูลคะแนนและคำถาม
      confirmbynameId, // รับค่าจาก request body
    } = req.body;

    // ตรวจสอบไฟล์ที่อัปโหลด
    let imagePath;
    if (req.file) {
      imagePath = `assets/images/${req.file.filename}`; // เก็บ path ของไฟล์ที่อัปโหลด
    }

    // ตรวจสอบว่า WorkType เชื่อมโยงกับ GroupWork ที่กำหนด
    const worktype = await prisma.workType.findFirst({
      where: {
        id: parseInt(worktypeId),
        groupworkId: parseInt(groupworkId),
      },
    });

    if (!worktype) {
      return res.status(400).json({
        message: "ประเภทงานนี้ ไม่เกี่ยวข้องกับ กลุ่มงาน ที่กำหนด",
      });
    }

    // ดึงข้อมูลพนักงานเพื่อตรวจสอบ GroupWork
    const employees = await prisma.employee.findMany({
      where: {
        id: { in: employeeIds.map((id) => parseInt(id)) },
      },
    });

    // ตรวจสอบว่าพนักงานทั้งหมดอยู่ใน GroupWork ที่กำหนด
    const invalidEmployees = employees.filter(
      (employee) => employee.groupworkId !== parseInt(groupworkId)
    );

    if (invalidEmployees.length > 0) {
      return res.status(400).json({
        message: "พนักงาน ไม่ได้อยู่ใน กลุ่มงาน ที่กำหนด",
        invalidEmployees,
      });
    }

    // สร้าง ServiceWork พร้อมข้อมูลที่เกี่ยวข้อง
    const newServiceWork = await prisma.serviceWork.create({
      data: {
        servicerecipient,
        affiliation: {
          connect: { id: parseInt(affiliationId) }, // แปลง affiliationId เป็นจำนวนเต็ม
        },
        statusrecipient: {
          connect: { id: parseInt(statusrecipientId) }, // แปลง statusrecipientId เป็นจำนวนเต็ม
        },
        groupwork: {
          connect: { id: parseInt(groupworkId) }, // แปลง groupworkId เป็นจำนวนเต็ม
        },
        worktype: {
          connect: { id: parseInt(worktypeId) }, // แปลง worktypeId เป็นจำนวนเต็ม
        },
        description,
        image: imagePath || null,
        totalAmount: parseFloat(totalAmount), // แปลง totalAmount เป็นจำนวนทศนิยม
        servicebudget: {
          create:
            servicebudget.map((budget) => ({
              ServiceBudgetname: budget.ServiceBudgetname,
              Amount: parseFloat(budget.Amount), // แปลง Amount เป็นจำนวนทศนิยม
            })) || [],
        },
        ServiceWorkEmployee: {
          create: employeeIds.map((employeeId) => ({
            employeeId: parseInt(employeeId), // แปลง employeeId เป็นจำนวนเต็ม
          })),
        },
        servicerating: {
          create: servicerating.map((rating) => ({
            score: parseInt(rating.score), // แปลง score เป็นจำนวนเต็ม
            questionratingId: parseInt(rating.questionratingId), // แปลง questionratingId เป็นจำนวนเต็ม
          })),
        },
        confirmbyname: confirmbynameId
          ? { connect: { id: parseInt(confirmbynameId) } } // แปลง confirmbynameId เป็นจำนวนเต็ม
          : undefined, // กรณีไม่ส่งค่า confirmbynameId
      },
      include: {
        servicebudget: true,
        ServiceWorkEmployee: {
          include: { employee: true },
        },
        servicerating: true, // รวมข้อมูล ServiceRating
      },
    });
    res.status(200).json({ newServiceWork, message: "Create Succress!!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.listServiceWork = async (req, res) => {
  try {
    const servicework = await prisma.serviceWork.findMany({
      include: {
        affiliation: {
          select: {
            id: true,
            affiliationname: true,
          },
        },
        statusrecipient: {
          // ใช้ชื่อที่ตรงกับ schema
          select: {
            id: true,
            statusrecipientname: true,
          },
        },
        groupwork: {
          // ใช้ชื่อที่ตรงกับ schema
          select: {
            id: true,
            GroupWorkname: true,
          },
        },
        worktype: {
          // ใช้ชื่อที่ตรงกับ schema
          select: {
            id: true,
            WorkTypename: true,
          },
        },
        servicebudget: true,
        ServiceWorkEmployee: {
          include: {
            employee: {
              select: {
                id: true,
                Employeename: true,
              },
            },
          },
        },
        servicerating: {
          include: {
            questionrating: {
              select: {
                id: true,
                questionname: true,
              },
            },
          },
        },
      },
    });

    const formattedServiceWork = servicework.map((item) => ({
      ...item,
      serviceDate: dayjs(item.serviceDate).format("DD/MM/YYYY HH:mm:ss"), // ปรับฟอร์แมตวันที่ที่นี่
      createdAt: dayjs(item.serviceDate).format("DD/MM/YYYY HH:mm:ss"), // ปรับฟอร์แมตวันที่ที่นี่
      updatedAt: dayjs(item.serviceDate).format("DD/MM/YYYY HH:mm:ss"), // ปรับฟอร์แมตวันที่ที่นี่
      servicebudget: item.servicebudget.map((budget) => ({
        id: budget.id,
        ServiceBudgetname: budget.ServiceBudgetname,
        Amount: budget.Amount,
        serviceworkId: budget.serviceworkId, // ไม่รวม createdAt และ updatedAt
      })),
    }));

    res.status(200).json(formattedServiceWork);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.listServiceWorkById = async (req, res) => {
  try {
    const { id } = req.params;
    const servicework = await prisma.serviceWork.findMany({
      where: {
        id: Number(id),
      },

      include: {
        confirmbyname: {
          select: {
            id: true,
            name: true,
            rank: true,
          },
        },
        affiliation: {
          select: {
            id: true,
            affiliationname: true,
          },
        },
        statusrecipient: {
          // ใช้ชื่อที่ตรงกับ schema
          select: {
            id: true,
            statusrecipientname: true,
          },
        },
        groupwork: {
          // ใช้ชื่อที่ตรงกับ schema
          select: {
            id: true,
            GroupWorkname: true,
          },
        },
        worktype: {
          // ใช้ชื่อที่ตรงกับ schema
          select: {
            id: true,
            WorkTypename: true,
          },
        },
        servicebudget: true,
        ServiceWorkEmployee: {
          include: {
            employee: {
              select: {
                id: true,
                Employeename: true,
              },
            },
          },
        },
        servicerating: {
          include: {
            questionrating: {
              select: {
                id: true,
                questionname: true,
              },
            },
          },
        },
      },
    });

    const formattedServiceWork = servicework.map((item) => ({
      ...item,
      serviceDate: dayjs(item.serviceDate).format("DD/MM/YYYY HH:mm:ss"), // ปรับฟอร์แมตวันที่ที่นี่
      createdAt: dayjs(item.serviceDate).format("DD/MM/YYYY HH:mm:ss"), // ปรับฟอร์แมตวันที่ที่นี่
      updatedAt: dayjs(item.serviceDate).format("DD/MM/YYYY HH:mm:ss"), // ปรับฟอร์แมตวันที่ที่นี่
      servicebudget: item.servicebudget.map((budget) => ({
        id: budget.id,
        ServiceBudgetname: budget.ServiceBudgetname,
        Amount: budget.Amount,
        serviceworkId: budget.serviceworkId, // ไม่รวม createdAt และ updatedAt
      })),
    }));

    res.status(200).json(formattedServiceWork);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.UpdateStatusServiceWork = async (req, res) => {
  const { id, statusconfirm, confirmbyname } = req.body;
  try {
    const confirm = await prisma.confirmByName.create({
      data: {
        name: confirmbyname.name,
        rank: confirmbyname.rank,
      },
    });

    const updateServiceWork = await prisma.serviceWork.update({
      where: { id },
      data: {
        statusconfirm,
        confirmbynameId: confirm.id,
      },
    });

    res.status(200).json({ message: "Update Succress!!!", updateServiceWork });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.getServiceSummary = async (req, res) => {
  try {
    const { year, month } = req.query;

    let filters = {};

    // กรองตามปีและเดือน
    if (year || month) {
      filters.serviceDate = {};
      if (year) {
        filters.serviceDate.gte = new Date(`${year}-01-01`);
        filters.serviceDate.lte = new Date(`${year}-12-31`);
      }
      if (month) {
        const startMonth = new Date(
          `${year || new Date().getFullYear()}-${month}-01`
        );
        const endMonth = new Date(
          new Date(startMonth).setMonth(startMonth.getMonth() + 1)
        );
        filters.serviceDate.gte = startMonth;
        filters.serviceDate.lte = endMonth;
      }
    }

    const serviceWorks = await prisma.serviceWork.groupBy({
      by: ["groupworkId", "affiliationId"],
      where: filters,
      _count: { id: true },
      _sum: { totalAmount: true },
    });

    const confirmedWorks = await prisma.serviceWork.groupBy({
      by: ["groupworkId", "affiliationId"],
      where: {
        ...filters,
        statusconfirm: true, // กรองเฉพาะงานที่ยืนยันแล้ว
      },
      _count: { id: true },
    });

    const groupworkIds = serviceWorks.map((data) => data.groupworkId);
    const groupworks = await prisma.groupWork.findMany({
      where: { id: { in: groupworkIds } },
    });

    const affiliationIds = serviceWorks.map((data) => data.affiliationId);
    const affiliations = await prisma.affiliation.findMany({
      where: { id: { in: affiliationIds } },
    });

    const result = serviceWorks.map((data) => {
      const groupwork = groupworks.find((g) => g.id === data.groupworkId);
      const affiliation = affiliations.find((a) => a.id === data.affiliationId);
      const confirmedWork = confirmedWorks.find(
        (c) =>
          c.groupworkId === data.groupworkId &&
          c.affiliationId === data.affiliationId
      );

      return {
        groupworkId: data.groupworkId,
        groupname: groupwork?.GroupWorkname || "Unknown",
        affiliationname: affiliation?.affiliationname || "Unknown",
        totalBudget: data._sum.totalAmount || 0,
        totalJobs: data._count.id,
        confirmedJobs: confirmedWork?._count.id || 0,
      };
    });

    res.status(200).json(result);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.getEmployeeSummary = async (req, res) => {
  const { groupworkId, employeeId, year, month } = req.query;

  try {
    let filters = {};

    // กรองตามกลุ่มงาน
    if (groupworkId) {
      filters.groupworkId = parseInt(groupworkId);
    }

    // กรองตามพนักงาน
    if (employeeId) {
      filters.ServiceWorkEmployee = {
        some: { employeeId: parseInt(employeeId) },
      };
    }

    // กรองตามปีและเดือน
    if (year || month) {
      filters.serviceDate = {};
      if (year) {
        filters.serviceDate.gte = new Date(`${year}-01-01`);
        filters.serviceDate.lte = new Date(`${year}-12-31`);
      }
      if (month) {
        const startMonth = new Date(
          `${year || new Date().getFullYear()}-${month}-01`
        );
        const endMonth = new Date(
          new Date(startMonth).setMonth(startMonth.getMonth() + 1)
        );
        filters.serviceDate.gte = startMonth;
        filters.serviceDate.lte = endMonth;
      }
    }

    // Query ข้อมูลจาก Prisma
    const results = await prisma.serviceWork.findMany({
      where: filters,
      select: {
        id: true,
        servicerecipient: true,
        groupwork: { select: { GroupWorkname: true } },
        ServiceWorkEmployee: {
          select: { employee: { select: { Employeename: true, id: true } } },
        },
        totalAmount: true,
        serviceDate: true,
        affiliation: { select: { affiliationname: true } },
        worktype: { select: { WorkTypename: true } }, // เปลี่ยน workType เป็น worktype
      },
    });

    // รวมจำนวนงานของแต่ละพนักงาน
    const summary = results.reduce((acc, work) => {
      work.ServiceWorkEmployee.forEach(({ employee }) => {
        if (!employeeId || employee.id === parseInt(employeeId)) {
          if (!acc[employee.Employeename]) {
            acc[employee.Employeename] = {
              employeeName: employee.Employeename,
              groupworkName: work.groupwork.GroupWorkname,
              affiliationName: work.affiliation.affiliationname,
              workCount: 0,
              services: [],
            };
          }
          acc[employee.Employeename].workCount += 1;
          acc[employee.Employeename].services.push({
            department: work.groupwork.GroupWorkname,
            affiliationName: work.affiliation.affiliationname,
            serviceDate: work.serviceDate,
            workType: work.worktype.WorkTypename, // เปลี่ยน workType เป็น worktype
          });
        }
      });
      return acc;
    }, {});

    res.status(200).json(Object.values(summary));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.removeServiceWork = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceWork = await prisma.serviceWork.findUnique({
      where: { id: parseInt(id) },
    });

    if (!serviceWork) {
      return res.status(404).json({
        message: "ไม่พบข้อมูลที่ต้องการลบ",
      });
    }

     // ตรวจสอบว่า ServiceWork มีรูปภาพที่เกี่ยวข้องหรือไม่
     if (serviceWork.image) {
      const imagePath = path.join(__dirname, "../", serviceWork.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("ลบรูปภาพไม่สำเร็จ:", err);
          return res.status(500).json({ message: "ลบรูปภาพไม่สำเร็จ" });
        } else {
          console.log("ลบรูปภาพสำเร็จ");
        }
      });
    }

    await prisma.serviceWork.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Delete Success!!!" });
    console.log(serviceWork);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};