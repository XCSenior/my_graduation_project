const Koa = require("koa");
const app = new Koa();

app.use(async (ctx)=>{
	ctx.body = `<h1>Hello Koa2</h1>`;

});

app.listen(3000,() => {
	console.log("Koa2服务开启成功,3000端口监听中");
})
