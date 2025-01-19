const jwt = require("jsonwebtoken");

exports.authChack = async (req, res, next) => {
  try {
    // ตรวจสอบ Token ใน Header
    const headerToken = req.headers.authorization;
    // ถ้าไม่มี
    if (!headerToken) {
      return res
        .status(401)
        .json({ message: "No Token ,Authorization Denied" });
    }
    // ตัด Bearer ออกจาก Header
    const token = headerToken.split(" ")[1];
    // ตรวจสอบความถูกต้องของ Token
    // ใช้ SECRET จาก .env
    const decode = jwt.verify(token, process.env.SECRET);
    req.user = decode;
    if (!req.user) {
      return res.status(400).json({ message: "This account cannot access" });
    }
    next(); // เรียกใช้ middleware หรือ controller ถัดไป
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Token Invalid" });
  }
};
