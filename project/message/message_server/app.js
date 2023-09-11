const config = require("./config/default");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
// 导入 Joi 来定义验证规则
const Joi = require("joi");
app.use(cors()); //解决跨域
app.use(express.static("./assets")); //托管静态资源
app.use(express.json()); //解析json格式
app.use(express.urlencoded({ extended: false })); //解析urlencoded
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    return res.send({
      status,
      err: err instanceof Error ? err.message : err,
    });
  };
  next();
});

const wall_route = require("./routes/wall");
app.use(wall_route);
const file_route = require("./routes/file");
app.use(file_route);

app.use((err, req, res) => {
  //文件错误
  if (err instanceof multer.MulterError) {
    return res.send({
      status: 1,
      message: err.message,
    });
  }
  // 4.1 Joi 参数校验失败
  if (err instanceof Joi.ValidationError) {
    return res.send({
      status: 1,
      message: err.message,
    });
  }
  // 4.2 未知错误
  res.send({
    status: 1,
    message: err.message,
  });
});
app.listen(config.port, () => {
  console.log("http:127.0.0.1:3001 is running");
});
