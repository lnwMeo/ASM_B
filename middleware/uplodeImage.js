const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ตรวจสอบโฟลเดอร์ปลายทาง หากไม่มี ให้สร้างขึ้นมา
const uploadDir = path.join(__dirname, "../assets/images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// กำหนดโฟลเดอร์สำหรับจัดเก็บไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // โฟลเดอร์สำหรับจัดเก็บไฟล์
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // ตั้งชื่อไฟล์ด้วย timestamp
  },
});

// กำหนดประเภทไฟล์ที่อนุญาต
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // จำกัดขนาดไฟล์ 5MB
});

module.exports = upload;