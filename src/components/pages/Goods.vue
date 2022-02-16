<template>
	<div>
		<div class="naavar-div">
			<van-nav-bar
				title="商品详情"
				left-text="返回"
				left-arrow
				@click-left="onClickLeft"
			/>
		</div>
		<div class="topImage-div">
			<img :src="goodsInfo.IMAGE1" width="100%" alt="goods.IMAGE1">
		</div>
		<div class="goods-name">{{goodsInfo.NAME}}</div>
		<div class="goods-price">价格：￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}元</div>
		<div>
			<van-tabs swipeable sticky>	<!-- 可以滑动切换 增加吸顶效果 -->
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
			<div>
				<van-button size="large" type="primary" :square="true">加入购物车</van-button>
			</div>
			<div>
				<van-button size="large" type="danger" :square="true">直接购买</van-button>
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
		this.goodsId = this.$route.query.goodsId;//接收参数
		this.getInfo();
	},
	methods: {
		getInfo(){
			axios({
				url:url.getDetailGoodsInfo,
				method:"post",
				data:{goodsId:this.goodsId}
			}).then((response) => {
				// console.log("我是getInfo()response",response);
				if(response.data.code === 200 && response.data.message){
					this.goodsInfo = response.data.message;
					console.log("我是this.goodsInfo",this.goodsInfo);
				}else{
					console.log(response.data);
					Toast.fail("数据获取失败");
				}
			}).catch((err) => {
				console.log("我是getInfo()err",err);
				Toast.fail("数据获取失败");
			});
		},
		onClickLeft(){
			this.$router.go(-1);	//返回上一级路由
		}
	},
}
</script>

<style scoped>
	.detail{
		font-size: 0px;	/* 去除图片间的空格 */
	}
	.goods-name{
		background-color: red;
	}
	.goods-price{
		background-color: red;
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
</style>