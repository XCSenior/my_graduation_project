const BASEURL = "http://127.0.0.1:4000/";
const LOCALURL = "http://localhost:3000/";

const URL = {
	getShoppingMallInfo: BASEURL + "index" ,		/* 商城首页所有信息 */
	getGoodsInfo:BASEURL + "getGoodsInfo",
	registerUser : LOCALURL + "user/register",	/* 连接后端数据接口 */
	login : LOCALURL + "user/login",	/* 用户登录接口 */
	getDetailGoodsInfo:LOCALURL + "goods/getDetailGoodsInfo", //获取商品详情
	getCategoryList:LOCALURL + "goods/getCategoryList", //获取商品类别信息
}

module.exports = URL;