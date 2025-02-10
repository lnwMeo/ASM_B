const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { token } = require("morgan");

exports.register = async (req, res) => {
  try {
    // st 1 รับค่าจาก body
    const { username, password } = req.body;
    // st 2 เช็ค
    if (!username) {
      return res.status(400).json({ message: "Username not Found!!" });
    }
    if (!password) {
      return res.status(400).json({ message: "password is Wrong!!" });
    }
    // st 3 ตรวจสอบรูปแบบ password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "รหัสผ่านต้องประกอบไปด้วย ตัวอักษรภาษาอังกฤษ ตัวพิมพ์ เล็ก - ใหญ่ อักคละพิเศษ และตัวเลข 8 ตัวอักษรขึ้นไป",
      });
    }
    // st 4 เช็คว่ามีชื่อซ้ำไหม
    const admin = await prisma.admin.findFirst({
      where: {
        username: username,
      },
    });
    if (admin) {
      return res.status(400).json({ message: "Username already exits!!" });
    }
    // st 5 hash password
    const hashPassword = await bcrypt.hash(password, 10);
    // st 6 register
    await prisma.admin.create({
      data: {
        username: username,
        password: hashPassword,
      },
    });
    //st 6 สำเร็จ
    res.status(200).json({ message: "Register Succress!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    // st 1 check username
    const admin = await prisma.admin.findFirst({
      where: {
        username: username,
      },
    });

    if (!admin) {
      return res.status(400).json({ message: "Username not Found!!" });
    }
    //st 2 check password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password Invalid!!!" });
    }
    //st 3 Create Payload
    const payload = {
      id: admin.id,
      username: admin.username,
    };

    //st 4 Genetate Token
    jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        return res.status(500).json({ message: "Server Error" });
      }
      res.json({ payload, token });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.listadmin = async (req, res) => {
  try {
    const admin = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
      },
    });
    res.status(200).send(admin);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    if (!username) {
      return res.status(400).json({ message: "Username not Found!!!" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is Wrong!!!" });
    }
    // st 3 ตรวจสอบรูปแบบ password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "รหัสผ่านต้องประกอบไปด้วย ตัวอักษรภาษาอังกฤษ ตัวพิมพ์ เล็ก - ใหญ่ อักคละพิเศษ และตัวเลข 8 ตัวอักษรขึ้นไป",
      });
    }
    // st 4 เช็คว่ามีชื่อซ้ำไหม
    const admin = await prisma.admin.findFirst({
      where: {
        username: username,
      },
    });
    if (admin) {
      return res.status(400).json({ message: "Username already exits!!" });
    }
    // st 5 hash password
    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.admin.update({
      where: {
        id: Number(id),
      },
      data: {
        username: username,
        password: hashPassword,
      },
    });

    res.status(200).json({ message: "Update Sucress!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
exports.removeAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.admin.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "Delete Sucress!!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Update Sucress!!!" });
  }
};
exports.currentAdmin = async (req, res) => {
  try {
    res.send("Hello currentAdmin");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error!!!" });
  }
};
