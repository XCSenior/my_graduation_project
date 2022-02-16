<template>
	<div>
		<div class="navbar-div">
			<van-nav-bar title="商品类别" />
		</div>
		<div>
			<van-row>
				<van-col span="6">
					<div id="leftNav">
						<ul>
							<li @click="clickCategory(index)"
								:class="{categoryActive:categoryIndex === index}"
								v-for="(item, index) in category" :key="item.ID">
								{{item.MALL_CATEGORY_NAME}}
							</li>
						</ul>
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
		data() {
			return {
				category:[],
				categoryIndex:0,
			}
		},
		created() {
			this.getCategory();
		},
		mounted() {
			let windowHeight = document.documentElement.clientHeight;
			document.getElementById("leftNav").style.height = windowHeight - 46 + "px";
		},
		methods: {
			getCategory(){
				axios({
					url:url.getCategoryList,
					method:"get",
				}).then((response) => {
					console.log("我是getCategory的response",response);
					if (response.data.code === 200 && response.data.message) {
						this.category = response.data.message;
					} else {
						Toast.fail("获取数据失败");
					}
				}).catch((err) => {
					console.log("我是getCategory的err",err);
				});
			},
			clickCategory(index){
				this.categoryIndex = index;
			}
		},
	};
</script>

<style scoped>
	#leftNav{
		background-color: aliceblue;
	}
	#leftNav ul li{
		line-height: 2rem;
		border-bottom: 1px solid #E4E7ED;
		padding: 3px;
		font-size: 0.8rem;
		text-align: center;
	}
	.categoryActive{
		background-color: #fff;
	}
</style>