const Router = require('koa-router');
// TODO:将数据存入数据库中
const mongoose = require('mongoose');

let router = new Router();

router.get("/", async (ctx) => {
	ctx.body="这是用户操作首页";
})

router.post("/register", async (ctx) => {
	// console.log(ctx.request.body,"我是user模块的ctx.request.body");	//body就是前端传递过来的数据
	// ctx.body = ctx.request.body;	//返回给前端的数据
	const User = mongoose.model("User");
	let newUser = new User(ctx.request.body);

	/* 保存进数据库中 */
	await newUser.save().then( () => {
		console.log("注册成功");
		ctx.body = {
			code:200,
			message:"注册成功"
		};
	}).catch( (error) => {
		console.log("注册失败",error);
		ctx.body = {
			code:500,
			message:error
		}
	})
})

/* 暴露router */
module.exports = router;

