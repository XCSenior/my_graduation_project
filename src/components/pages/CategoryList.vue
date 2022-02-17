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
					<div class="tabCategorySub">
						<van-tabs v-model="active" @click="onClickCategorySub">
							<van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

							</van-tab>
						</van-tabs>
					</div>
					<div id="list-div">
						<van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
							<van-list v-model="loading" :finished="finished" @load="onLoad">
								<div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item, index) in goodList" :key="index">
									<div class="list-item-image">
										<img
											:src="item.IMAGE1"
											width="100%"
											:onerror="errorImg"
										>
									</div>
									<div class="list-item-text">
										<div>{{item.NAME}}</div>
										<div>￥{{item.ORI_PRICE | moneyFilter}}元</div>
									</div>
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
	import {toMoney} from '../../filters/moneyFilter';
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
				// list:[],		//数据测试
				isRefresh:false,	//下拉刷新

				page:1,		//商品列表页数
				goodList:[],	//商品列表信息
				categorySubId:"",	//商品子类ID

				errorImg:'this.src="'+ require("@/assets/images/errorimg.png")+'"',
			}
		},
		filters:{
			moneyFilter(money){
				return toMoney(money);
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

			/* 点击大类类别 */
			clickCategory(index,categoryId){
				this.categoryIndex = index;
				/* 初始化参数 */
				this.goodList = [];
				this.finished = false;
				this.page = 1;

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

						this.categorySubId = this.categorySub[0].ID;
						this.onLoad();
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
					/* 三元运算,可能初始化的时候没有 */
					this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID;
					this.getGoodList();
				}, 1000);
			},

			/* 实现下拉刷新方法 */
			onRefresh(){
				setTimeout(() => {
					this.isRefresh = false;
					this.finished = false;
					this.goodList = [];
					this.page = 1;	/* 初始化 */
					this.onLoad();
				}, 500);
			},

			/* 获取goodList */
			getGoodList(){
				axios({
					url:url.getGoodsListByCategorySubID,
					method:"post",
					data:{
						categorySubId:this.categorySubId,
						page:this.page
					}
				}).then((response) => {
					console.log("我是getGoodList()的response",response);
					if (response.data.code === 200 && response.data.message.length) {
						++this.page;
						this.goodList = this.goodList.concat(response.data.message);//合并数组
					} else {
						this.finished = true;	//完成后已经无数据
					}
					this.loading = false;

				}).catch((err) => {
					console.log("我是getGoodList()的err",err);
				});
			},

			/* 点击获取子类 */
			onClickCategorySub(index,title){
				this.categorySubId = this.categorySub[index].ID;
				// console.log("!!!!!",this.categorySubId);

				/* 初始化操作 */
				this.goodList = [];
				this.finished = false;
				this.page = 1;
				this.onLoad();
			},

			/* 跳转到商品详细页 */
			goGoodsInfo(id){
				this.$router.push({name:"Goods",params:{goodsId:id}});
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

	#list-div{
		overflow: scroll;
	}

	.list-item{
        display: flex;
        flex-direction: row;
        font-size:0.6rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    #list-div{
        overflow: scroll;
    }
    .list-item-image{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>