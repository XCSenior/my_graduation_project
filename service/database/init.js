/* 初始化对数据库的连接,使用Mongoose */
const mongoose = require("mongoose");
const db = "mongodb://localhost:27017/smile-db";
// 引入glob和resolve
const glob = require("glob");
const { resolve } = require("path");

mongoose.Promise = global.Promise;

/* 载入Schemas */
exports.initSchemas = () => {
	//引入所有schema目录下的js文件，也就是所有schema
	glob.sync(resolve(__dirname,"./schema","**/*.js")).forEach(require);
}


/* 向外暴露connect函数 */
exports.connect =  ()=>{
	/* 声明最大连接次数 */
	let maxConnectTimes = 0;

	/* 连接数据库 */
	mongoose.connect(db);

	/* 连接数据库的异步操作 增加数据库监听 */
	return new Promise((resolve , reject) => {
		//1、断开连接
		mongoose.connection.on("disconnected",(err) => {
			console.warn("***********数据库断开连接");
			if(maxConnectTimes <= 3){
				mongoose.connect(db);	//重新连接数据库
				++maxConnectTimes;
			}else{
				reject(err);
				throw new Error("数据库断连，程序无法执行");
			}
		});

		//2、数据库出错
		mongoose.connection.on("error",(err) => {
			console.error("***********数据库出错");
			if(maxConnectTimes <= 3){
				mongoose.connect(db);	//重新连接数据库
				++maxConnectTimes;
			}else{
				reject(err);
				throw new Error("数据库出错，程序无法执行");
			}
		});

		//3、数据库连接成功
		mongoose.connection.once("open",() => {
			console.log("****MongoDB数据库连接成功****");
			resolve();
		});
	});



}

