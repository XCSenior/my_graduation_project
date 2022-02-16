<template>
	<div>
		<div class="navbar-div">
			<van-nav-bar title="商品类别" />
		</div>
		<div>
			<van-row>
				<van-col span="6">
					<div id="leftNav">
						左侧导航
					</div>
				</van-col>
				<van-col span="18">
					<div>
						右侧列表
					</div>
				</van-col>
			</van-row>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import url from '../../serviceAPI.config';
	import {Toast} from 'vant';
	export default {
		name:"CategoryList",
		created() {
			this.getCategory();
		},
		methods: {
			getCategory(){
				axios({
					url:url.getCategoryList,
					method:"get",
				}).then((response) => {
					console.log("我是getCategory的response",response);
					if (response.data.code === 200 && response.data.message) {
						
					} else {
						Toast.fail("获取数据失败");
					}
				}).catch((err) => {
					console.log("我是getCategory的err",err);
				});
			}
		},
	};
</script>

<style scoped>
	#leftNav{
		background-color: blue;
	}
</style>