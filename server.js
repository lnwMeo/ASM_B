// Step 1 import ....
require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const { readdirSync } = require("fs");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 นาที
  max: 200, // จำกัด 200 คำขอ
  standardHeaders: true, // เปิดใช้งานการเพิ่มข้อมูล Rate Limiting ใน Response Headers มาตรฐาน
  legacyHeaders: false, // ปิดการเพิ่มข้อมูล Rate Limiting ใน Legacy Headers (X-RateLimit-*)
  message: "Too many requests, please try again later.",
});

// middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "20mb" }));
// Domain ที่อนุญาติ
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api", limiter);

readdirSync("./routes").map((c) => app.use("/api", require("./routes/" + c)));

// เพิ่มเส้นทางสำหรับ root
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/assets", express.static("assets"));
// Step 2 Start Server
app.listen(8000, () => console.log("Server is running on port 8000"));
