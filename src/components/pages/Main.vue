<template>
	<div>
		<div class="main-div">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
		<van-tabbar v-model="active" @change="changeTabbar(active)">
			<van-tabbar-item icon="shop">首页</van-tabbar-item>
			<van-tabbar-item icon="records">列表</van-tabbar-item>
			<van-tabbar-item icon="cart">购物车</van-tabbar-item>
			<van-tabbar-item icon="contact">会员中心</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
	name:"Main",
	data() {
		return {
			active:0,	/* 显示界面的索引 */
			nowPath:"",
		}
	},
	mounted() {
		this.changeTabbarActiveByPath();
	},
	updated() {
		this.changeTabbarActiveByPath();
	},
	methods: {
		changeTabbar(active){
			console.log("我是changeTabbar()的active",active);
			switch (active) {
				case 0:
					this.$router.push({name:"ShoppingMall"})
					break;
				case 1:
					this.$router.push({name:"CategoryList"})
					break;
				case 2:
					this.$router.push({name:"Cart"})
					break;
				case 3:
					console.log("跳转到会员中心");
					break;
				default:
					break;
			}
		},
		changeTabbarActiveByPath(){
			this.nowPath = this.$route.path;	/* 获得当前路径 */
			if (this.nowPath === "/Cart") {
				this.active = 2;
			}else if (this.nowPath === "/CategoryList") {
				this.active = 1;
			}else if (this.nowPath === "/") {
				this.active = 0;
			}
		},
	},
}
</script>

<style>

</style>