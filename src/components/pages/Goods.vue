<template>
	<div>
		<div class="nav-div">
			<van-nav-bar
				title="商品详情"
				left-text="返回"
				left-arrow
				@click-left="onClickLeft"
				fixed
			/>
		</div>
		<div class="topImage-div">
			<img :src="goodsInfo.IMAGE1" width="100%" alt="goods.IMAGE1">
		</div>
		<div class="goods-price">
			<span class="goods-price-yuan">￥</span><span class="goods-price-price">{{goodsInfo.PRESENT_PRICE | moneyFilter}}</span>
		</div>
		<div class="goods-name">{{goodsInfo.NAME}}</div>
		<div>
			<van-tabs swipeable sticky :offset-top="44">	<!-- 可以滑动切换 增加吸顶效果 -->
				<van-tab title="商品详情">
					<div class="detail" v-html="goodsInfo.DETAIL">

					</div>
				</van-tab>
				<van-tab title="评论">
					<p v-for="(item, index) in 30" :key="index">评论制作中</p>
				</van-tab>
			</van-tabs>
		</div>
		<div class="goods-bottom">
			<div class="goods-bottom-other">
				<div>
					<img src="../../assets/images/kids_lock.png" alt="store.png">
					<br>
					<span>&nbsp;店铺</span>
				</div>
				<div>
					<img src="../../assets/images/calling robort.png" alt="call.png">
					<br>
					<span>&nbsp;客服</span>
				</div>
				<div @click="goToCart()">
					<img src="../../assets/images/cart.png" alt="cart.png">
					<br>
					<span>&nbsp;购车</span>
				</div>
			</div>
			<div>
				<van-button size="large" type="primary" :square="true" @click="addGoodsToCart()">加入购物车</van-button>
			</div>
			<div>
				<van-button size="large" type="danger" :square="true">立即购买</van-button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import url from '../../serviceAPI.config';
import {Toast} from 'vant';
import {toMoney} from '../../filters/moneyFilter';
export default {
	name:"Goods",
	data() {
		return {
			goodsId:"",
			goodsInfo:{}	//商品详细信息
		}
	},
	filters:{
		//注册过滤器
		moneyFilter(money){
			return toMoney(money);
		}
	},
	created() {
		//接收点击商品传过来的参数
		this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId ;
		this.getInfo();
	},
	methods: {
		getInfo(){
			axios({
				url:url.getDetailGoodsInfo,
				method:"post",
				data:{	goodsId:this.goodsId	}
			}).then((response) => {
				// console.log("我是getInfo()response",response);
				if(response.data.code === 200 && response.data.message){
					this.goodsInfo = response.data.message;
					console.log("我是this.goodsInfo",this.goodsInfo);
				}else{
					console.log(response.data);
					Toast.fail("服务器错误，数据获取失败");
				}
			}).catch((err) => {
				console.log("我是getInfo()err",err);
				Toast.fail("数据获取失败");
			});
		},
		onClickLeft(){
			this.$router.go(-1);	//返回上一级路由
		},

		/* 增加商品至购物车方法 */
		addGoodsToCart(){
			// 取出本地购物车的商品
			let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : [] ;
			/* 判断是否有重复商品 */
			let isHaveGoods = cartInfo.find((cart) => {
				return cart.goodsId === this.goodsId;
			});
			if (!isHaveGoods) {
				let newGoodsInfo = {
					goodsId:this.goodsInfo.ID,
					Name:this.goodsInfo.NAME,
					price:this.goodsInfo.PRESENT_PRICE,
					image:this.goodsInfo.IMAGE1,
					count:1	//默认买一个
				};
				cartInfo.push(newGoodsInfo);
				localStorage.cartInfo = JSON.stringify(cartInfo);
				Toast.success("添加成功");
			}else{
				Toast.success("已有此商品");
			}

			/* 跳转至购物车 */
			// this.$router.push({name:"Cart"});
		},
		goToCart(){
			/* 跳转至购物车 */
			this.$router.push({name:"Cart"});
		}
	},
}
</script>

<style scoped>
	.detail{
		font-size: 0px;	/* 去除图片间的空格 */
	}
	.goods-price{
		color: rgb(243, 64, 64);
		font-size: 0;
		font-weight: bold;
		background-color: white;
	}
	.goods-price .goods-price-yuan{
		font-size: 1.2rem;
		font-weight: normal;
	}
	.goods-price .goods-price-price{
		font-size: 1.6rem;
		font-weight: bold;
	}
	.goods-name{
		font-size: 1rem;
		background-color: white;
	}
	.goods-bottom{
		position: fixed;
		bottom: 0px;
		left: 0px;
		background-color: #fff;
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}
	.goods-bottom > div{
		flex:1;
		padding: 5px;
	}

	.goods-bottom-other{
		font-size: 0.1rem;
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}
	.goods-bottom-other span{
		font-size: 8px;
		transform: scale(0.5);	/* 显示小于12px字体,但貌似Chrome不支持显示 */
	}
	.goods-bottom-other > div{
		flex:1;
		padding-left: 4px;
	}
	.goods-bottom-other > div img{
		height: 30px;
		width: 30px;
	}
</style>