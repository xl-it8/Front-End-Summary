const config = require("../config/default");
const mysql = require("mysql");
const pool = mysql.createPool(config.database); //创建数据池

exports.query = function (sql, arr, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      callback(err, null);
    } else {
      connection.query(sql, arr, (err, results) => {
        // console.log(results);
        callback(err, results);
        //释放连接
        connection.release();
      });
    }
  });
};

exports.query2 = function (sql, arr) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject([err, null]);
      } else {
        connection.query(sql, arr, (err, results) => {
          resolve([err, results]);
          connection.release();
        });
      }
    });
  });
};
