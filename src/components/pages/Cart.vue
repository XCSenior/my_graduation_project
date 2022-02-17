<template>
	<div>
		<div class="navbar-div">
			<van-nav-bar
				title="购物车"
			/>
		</div>
		<div class="cart-title">
			<van-button size="small" type="danger" @click="clearCart()">清空购物车</van-button>
		</div>

		<!-- 显示购物车中的商品 -->
		<div class="cart-list">
			<div class="pang-row" v-for="(item, index) in cartInfo" :key="item.goodsId">
				<div class="pang-img">
					<img :src="item.image" width="100%" />
				</div>
				<div class="pang-text">
					<div class="pang-goods-name">{{item.Name}}</div>
					<div class="pang-control">
						<van-stepper v-model="item.count"/>
					</div>
				</div>
				<div class="pang-goods-price">￥<span>{{item.price | moneyFilter}}</span>元</div>
			</div>
		</div>
	</div>
</template>

<script>
import {Toast} from 'vant';
import {toMoney} from '../../filters/moneyFilter';
export default {
	name:"Cart",
	data() {
		return {
			cartInfo:[],	//加入的商品
			isEmpty:false,	//判断是否为空
		}
	},
	filters:{
		moneyFilter(money){
			return toMoney(money);
		}
	},
	created() {
		this.getCartInfo();
	},
	methods: {
		/* 得到购物车信息 */
		getCartInfo(){
			if(localStorage.cartInfo){
				this.cartInfo = JSON.parse(localStorage.cartInfo);
			}
			console.log("我是cartInfo",this.cartInfo);
			this.isEmpty = this.cartInfo.length > 0 ? false : true;
		},
		/* 清空购物车 */
		clearCart(){
			localStorage.removeItem("cartInfo");
			this.cartInfo = [];
			Toast.success("已清空");
		}
	},
}
</script>

<style scoped>
	.cart-title{
		height: 2rem;
		line-height: 2rem;
		background-color: #fff;
		border-bottom: 1px solid #E4E7ED;
		padding: 5px;
		text-align: right;
	}
	.cart-list{
		background-color: #fff;
	}
	.pang-row{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		padding: 0.5rem;
		font-size: 0.6rem;
		border-bottom: 1px solid #E4E7ED;
	}
	.pang-img{
		flex: 6;
	}
	.pang-text{
		width: 100%;
		flex: 12;
		padding-left: 10px;
		overflow: clip;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.pang-control{
		padding-top: 10px;
	}
	.pang-goods-price{
		flex: 6;
		text-align: right;
	}
	.pang-goods-price span{
		color: #ff3030;
	}
</style>