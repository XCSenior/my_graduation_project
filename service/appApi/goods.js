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

/* 获取商品详情页面data路由 */
router.post("/getDetailGoodsInfo",async (ctx) => {
	try {
		let goodsId = ctx.request.body.goodsId;
		const Goods = mongoose.model("Goods");
		let result = await Goods.findOne({ID:goodsId}).exec();
		ctx.body = {code:200,message:result};
	} catch (error) {
		ctx.body = {code:500,message:error};
	}
});


/* 读取商品大类数据 */
router.get("/getCategoryList", async (ctx) => {
	try {
		const Category = mongoose.model("Category");
		let result = await Category.find().exec();
		ctx.body = {code:200,message:result};
	} catch (error) {
		ctx.body = {code:500,message:error};
	}
});

/* 读取小类的数据 */
router.post("/getCategorySubList",async (ctx) => {
	try {
		let CategoryId = ctx.request.body.categoryId
		const CategorySub = mongoose.model("CategorySub");
		let result = await CategorySub.find({MALL_CATEGORY_ID:CategoryId}).exec();
		ctx.body = {code:200,message:result};
	} catch (error) {
		ctx.body = {code:500,message:error};
	}
});

/* 根据类别获取商品列表 */
router.post("/getGoodsListByCategorySubID",async (ctx) => {
	try {
		let categorySubId = ctx.request.body.categorySubId;
		let page = ctx.request.body.page;	//当前页数
		let num = 10;	//每页显示goods数量
		let start = (page-1)*num;	//开始显示的位置

		// let categorySubId = "2c9f6c946016ea9b016016f79c8e0000";//测试用写死
		const Goods = mongoose.model("Goods");
		let result = await Goods.find({SUB_ID:categorySubId}).skip(start).limit(num).exec();	//skip的意思是跳过多少,limit查找多少个
		ctx.body = {code:200,message:result};
	} catch (error) {
		ctx.body = {code:500,message:error};
	}
});


/* 暴露router */
module.exports = router;

