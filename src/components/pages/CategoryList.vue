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
					<div id="list-div">
						<van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
							<van-list v-model="loading" :finished="finished" @load="onLoad">
								<div class="list-item" v-for="(item, index) in list" :key="index">
									{{item}}
								</div>
							</van-list>
						</van-pull-refresh>
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

				loading:false,	//上拉加载时候的变量
				finished:false, 	//上拉加载是否有数据
				list:[],		//商品数据
				isRefresh:false,	//下拉刷新
			}
		},
		created() {
			this.getCategory();
		},
		mounted() {
			let windowHeight = document.documentElement.clientHeight;
			document.getElementById("leftNav").style.height = windowHeight - 46 + "px";
			document.getElementById("list-div").style.height = windowHeight - 90 + "px";	//限制list-div高度
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
			},

			/* 实现上拉加载方法 */
			onLoad(){
				setTimeout(() => {
					for (let i = 0; i < 10; i++) {
						this.list.push(this.list.length+1)
					}
					this.loading = false;	//完成后变成false
					if (this.list.length>=40) {
						this.finished = true;	//40个后没有数据了
					}
				}, 500);
			},

			/* 实现下拉刷新方法 */
			onRefresh(){
				setTimeout(() => {
					this.isRefresh = false;
					this.finished = false;
					this.list = [];
					this.onLoad();
				}, 500);
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
	.list-item{
		text-align: center;
		line-height: 80px;
		border-bottom: 1px solid #f0f0f0;
		background-color: #fff;
	}
	#list-div{
		overflow: scroll;
	}
</style>