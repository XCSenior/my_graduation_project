/* 后台服务器index */
const Koa = require("koa");
const app = new Koa();
/* 数据库连接connect函数对象 */
const { connect } = require('./database/init.js');

app.use(async (ctx)=>{
	ctx.body = `<h1>Hello Koa2</h1>`;

});

app.listen(3000,() => {
	console.log("Koa2服务开启成功,3000端口监听中");
});


/* 数据库立即执行函数 */
(async () => {
	await connect();
});
