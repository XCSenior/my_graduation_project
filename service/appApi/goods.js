const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs');
let router = new Router();

router.get("/insertAllGoodsInfo",async (ctx) => {
	fs.readFile("./data_json/newGoods.json","utf8", (err,data) => {
		data = JSON.parse(data);
		let saveCount = 0;

		const Goods = mongoose.model("Goods");	//引入模型
		data.map((value,index) => {		//遍历
			let newGoods = new Goods(value);
			newGoods.save().then((result) => {
				++saveCount;
				console.log("成功",saveCount);
			}).catch((err) => {
				console.log(err.errmsg,"单条数据保存失败");
			});
		});
	});
	ctx.body = "开始导入newGoods.json数据至数据库中";
});

/* 插入Category的数据 */
router.get("/insertAllCategory",async (ctx) => {
	fs.readFile("./data_json/Category.json","utf8", (err,data) => {
		data = JSON.parse(data);
		let saveCount = 0;

		const Category = mongoose.model("Category");	//引入模型
		data.RECORDS.map((value,index) => {		//遍历
			let newCategory = new Category(value);
			newCategory.save().then((result) => {
				++saveCount;
				console.log("成功",saveCount);
			}).catch((err) => {
				console.log(err.errmsg,"单条数据保存失败");
			});
		});
	});
	ctx.body = "开始导入Category.json数据至数据库中";
});

/* 插入CategorySub的数据 */
router.get('/insertAllCategorySub',async(ctx)=>{
    fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0 
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value,index)=>{
            let newCategorySub = new CategorySub(value)
            newCategorySub.save().then((result)=>{
                saveCount++
                console.log('成功插入'+saveCount)
            }).catch((err)=>{
                console.log('插入失败:',err)
            })
        }) 
    })
    ctx.body="开始导入CategorySub数据"
})


/* 暴露router */
module.exports = router;

