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
							<li @click="clickCategory(index,item.ID)"
								:class="{categoryActive:categoryIndex === index}"
								v-for="(item, index) in category" :key="item.ID">
								{{item.MALL_CATEGORY_NAME}}
							</li>
						</ul>
					</div>
				</van-col>
				<van-col span="18">
					<div class="tabCategorySub">	<!-- FIXME:修正active属性无法生效的问题 -->
						<van-tabs v-model="active">
							<van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

							</van-tab>
						</van-tabs>
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
				category:[],	//大类类别
				categoryIndex:0,	//大类索引
				categorySub:[],	//小类类别
				active:0,	//默认从第1个tab激活标签
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
						this.getCategorySubByCategoryID(this.category[0].ID);
					} else {
						Toast.fail("获取数据失败");
					}
				}).catch((err) => {
					console.log("我是getCategory的err",err);
				});
			},
			clickCategory(index,categoryId){
				this.categoryIndex = index;
				this.getCategorySubByCategoryID(categoryId);
			},
			/* 根据大类ID读取小类类别列表 */
			getCategorySubByCategoryID(categoryId){
				axios({
					url:url.getCategorySubList,
					method:"post",
					data:{categoryId},
				}).then((response) => {
					console.log("我是getCategorySubByCategoryID的response",response);
					if (response.data.code === 200 && response.data.message) {
						this.categorySub = response.data.message;
						this.active = 0;
					} else {
						Toast.fail("获取数据失败");
					}
				}).catch((err) => {
					console.log("我是getCategorySubByCategoryID的err",err);
				});
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