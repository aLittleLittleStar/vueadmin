/*
 * @Author: Star
 * @Date:   2019-05-25 14:51:35
 * @Last Modified by:   Star
 * @Last Modified time: 2019-05-27 21:25:45
 */
const routerApi = require("./router");
const fs = require("fs"); //操作文件
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const express = require("express"); //server服务
const app = express();

app.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }));

// 后端api路由
app.use("/api", routerApi);

// 设置跨域
http
  .createServer(function(request, response) {
    response.writeHead(200, {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    });
    response.end("Hello World\n");
  })
  .listen(3000);

// 监听端口
let server = app.listen(3000, "localhost", function(err) {
  if (err) {
    console.log(err);
    return;
  }
  let host = server.address().address;
  let port = server.address().port;
  console.log("success listen at port: 3000....", host, port);
});
