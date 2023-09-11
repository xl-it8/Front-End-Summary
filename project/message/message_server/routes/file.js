const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
// //存储在uploads文件夹下面，没有会直接创建
// 设置保存路径和文件名
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    // 设置文件存储路径
    cb(null, "./assets");
  },
  filename: function (req, file, cb) {
    // 设置文件名
    // Math.round(Math.random() *1E9)是生成一个整数部分9位数的随机数，再取整
    let fileData =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, file.fieldname + "-" + fileData);
  },
});
let upload = multer({
  storage: storage,
});
router.post("/fileUpload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send({
    status: 200,
    message: 'http://localhost:3001/'+ req.file.filename,
  });
});

module.exports = router;
