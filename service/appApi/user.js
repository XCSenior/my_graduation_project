const Router = require('koa-router');
// TODO:将数据存入数据库中
const mongoose = require('mongoose');

let router = new Router();

router.get("/", async (ctx) => {
	ctx.body="这是用户操作首页";
});

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
});

router.post("/login",async (ctx) => {
	/* 得到前端的用户名与密码 */
	let loginUser = ctx.request.body;
	console.log(loginUser,"我是loginUser");
	let username = loginUser.userName;
	let password = loginUser.password;

	/* 数据库查找 :引入user的model*/
	const User = mongoose.model("User");
	await User.findOne({userName:username}).exec().then(async (result) => {
		console.log(result,"我是result");
		//!FIXED:没有读取到数据库,是因为loginUser的userName的N没有大写
		if(result){	//如果用户名存在,比对成功
			/* 开始比对密码 */
			let newUser = new User();
			await newUser.comparePassword(password,result.password)//comparePassword(登录的密码,数据库中的密码)
			.then((isMatch) => {
				console.log(isMatch,"我是isMatch");
				ctx.body = {code:200,message:isMatch};
			}).catch((err) => {
				console.log(err,"密码错误");
				ctx.body = {code:500,message:err}
			});
		}else{	//如果用户名不存在
			ctx.body = {code:500,message:"用户名不存在"};
		}
	}).catch((err) => {
		console.log(err);
		ctx.body = {code:500,message:error};
	});
});

/* 暴露router */
module.exports = router;

