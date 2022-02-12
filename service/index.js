/* 后台服务器index */
const mongoose = require('mongoose');
const Koa = require("koa");
const app = new Koa();
/* 数据库连接connect函数对象,初始化Schema函数 */
const { connect , initSchemas } = require('./database/init.js');

app.use(async (ctx)=>{
	ctx.body = `<h1>Hello Koa2</h1>`;

});

app.listen(3000,() => {
	console.log("Koa2服务开启成功,3000端口监听中");
});

/* 数据库立即执行函数 */
// 增加获取所有Schema，遍历后引入，并加载进服务中，然后载入模型后进行增查操作
console.log("启动数据库init服务");
(async function toConnectDatabase(){
	await connect();
	initSchemas();	//载入schemas
	// 插入一条数据测试
	const User = mongoose.model("User");	//引入模型
	let oneUser = new User({
		userName:"CBJ",
		password:"123456"
	});
	oneUser.save().then((result) => {
		console.log("插入oneUser成功");
	}).catch((err) => {
		console.warn("插入oneUser失败");
	});

	// 查询数据测试
	let user = await User.findOne({}).exec();
	console.log("---------------------");
	console.log(user);
	console.log("---------------------");
})();

