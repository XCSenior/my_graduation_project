<template>
	<div class="goods-info" @click="goGoodsPage">
		<div class="goods-image">
			<img v-lazy="goodsImage" width="70%"/>
		</div>
		<div class="goods-name">{{goodsName}}</div>
		<div class="goods-price">￥{{goodsPrice | moneyFilter}}</div>
	</div>
</template>

<script>
import {toMoney} from '../../filters/moneyFilter';
export default {
	name:"GoodsInfoComponent",
	props:["goodsImage","goodsName","goodsPrice","goodsId"],
	filters:{
		moneyFilter(money){
			return toMoney(money);
		}
	},
	methods: {
		goGoodsPage(){
			this.$router.push({name:"Goods",query:{goodsId:this.goodsId}});//传递参数
		}
	},
}
</script>

<style scoped>
	.goods-name{	/* 商品名称不换行 */
		padding: 0 0.5rem;
		overflow: hidden;
		text-overflow: ellipsis;	/* 文本溢出用省略号显示 */
		white-space: nowrap;
	}
</style>