const Router = require('koa-router');

let router = new Router();

router.get("/", async (ctx) => {
	ctx.body="这是用户操作首页";
})

router.post("/register", async (ctx) => {
	console.log(ctx.request.body,"我是user模块的ctx.request.body");	//body就是前端传递过来的数据
	ctx.body = ctx.request.body;	//返回给前端的数据
})

/* 暴露router */
module.exports = router;

