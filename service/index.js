/* 后台服务器index */
const mongoose = require('mongoose');
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");	//解析前端post参数
const cors = require("koa2-cors");	//解决跨域问题
const user = require("./appApi/user");

const app = new Koa();
/* 后台服务接受前端post数据插件 */
app.use(bodyParser());
app.use(cors());

/* 数据库连接connect函数对象,初始化Schema函数 */
const { connect , initSchemas } = require('./database/init.js');


/* 装载所有子路由 */
let router = new Router();
router.use("/user" , user.routes());
// 路由中间件
app.use(router.routes());
app.use(router.allowedMethods());


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
	// const User = mongoose.model("User");	//引入模型
	// let oneUser = new User({
	// 	userName:"sb01",
	// 	password:"123456"
	// });
	// oneUser.save().then((result) => {
	// 	console.log("插入oneUser成功");
	// }).catch((err) => {
	// 	console.warn("插入oneUser失败");
	// });

	// // 查询数据测试
	// let user = await User.findOne({}).exec();
	// console.log("---------------------");
	// console.log(user);
	// console.log("---------------------");
})();

