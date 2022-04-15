/* 获取indexData */
const path = require("path")
const indexDataPath = path.resolve("./index.json");		/* 修改为相对路径 */
console.log(indexDataPath);		/* 输出indexDataPath */
let indexJSONData = null
const fs = require('fs');
fs.readFile(indexDataPath,(err , data) => {
	if(err){
		console.log(err);
	}else{
		indexJSONData = data.toString()
	}
})

/* 创建后端express框架应用 */
const express = require("express")
const app = new express()
let count = 0;

app.get("/index",(request,response)=>{
	/* 设置跨域请求,脚手架默认localhost8080端口,服务器是127.0.0.1:4000/index */
	response.setHeader("Access-Control-Allow-Origin","*");
	response.setHeader("Access-Control-Allow-Headers","*");
	response.setHeader("Access-Control-Allow-Method","*");

	response.send(indexJSONData);
	console.log(`第${count+1}次请求了首页JSON数据`);
	++count;
});

app.listen(4000,() => {
	console.log("服务已启动,4000端口监听中");
});