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
				<div class="pang-goods-price">
					<div>
						￥{{item.price | moneyFilter}}
					</div>
					<div>
						×{{item.count}}
					</div>
					<div class="all-price">
						<span>￥{{item.price*item.count | moneyFilter}}</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 显示总价格 -->
		<div class="total-money">
			商品总价：￥{{totalMoney | moneyFilter}}
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
	computed:{
		totalMoney(){
			let allMoney = 0;
			this.cartInfo.forEach((item,index) => {
				allMoney += item.price*item.count;
			});
			localStorage.cartInfo = JSON.stringify(this.cartInfo);	//刷新保存数据
			return allMoney;
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
	.all-price span{
		color: #ff3030;
	}

	.total-money{
		text-align: right;
		background-color: #fff;
		border-bottom: 1px solid #E4E7ED;
		padding: 5px;
	}
</style>