<template>
	<div>
		<div class="navbar-div">
			<van-nav-bar
				title="购物车"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name:"Cart",
	data() {
		return {
			cartInfo:[],	//加入的商品
			isEmpty:false,	//判断是否为空
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
		}
	},
}
</script>

<style scoped>

</style>