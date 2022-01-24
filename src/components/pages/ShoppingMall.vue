<template>
<div>
	<!-- 头部区域 -->
	<div class="search-bar">
		<van-row>
			<van-col span="3">
				<img :src="locationIcon" width="80%" alt="定位.png" class="location-icon">
			</van-col>
			<van-col span="16">
				<input type="text" class="search-input">
			</van-col>
			<van-col span="5" class="search-button">
				<van-button size="mini">查找</van-button>
			</van-col>
		</van-row>
	</div>
	<!-- 轮播图swiper area-->
	<div class="swiper-area">
		<van-swipe :autoplay="2000">
			<van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
				<a href="#"><img v-lazy="banner.image" width="100%" alt="banner"></a>
			</van-swipe-item>
		</van-swipe>
	</div>
	<!-- 商品类别type-bar -->
	<div class="type-bar">
		<div v-for="(cate,index) in category" :key="cate.mallCategoryId">
			<a href="javascript:;">
				<!-- lazy懒加载 -->
				<img v-lazy="cate.image" width="90%">
				<span>{{cate.mallCategoryName}}</span>
			</a>
		</div>
	</div>
	<!-- 广告条adBanner -->
	<div class="adBanner-area">
		<img v-lazy="adBanner" alt="广告banner.gif" width="100%">
	</div>
	<!-- 商品推荐 recommend goods area -->
	<div class="recommend-area">
		<div class="recommend-title">
			商品推荐
		</div>
		<div class="recommend-body">
			<swiper :options="swiperOption">
				<swiper-Slide v-for="(item,index) in recommendGoods" :key="item.goodsId">
					<div class="recommend-item">
						<a href="javascript:;">
							<img :src.lazy="item.image" width="80%">
							<div>{{item.goodsName}}</div>
							<div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
						</a>
					</div>
				</swiper-Slide>
			</swiper>
		</div>
		<!-- 楼层1数据 -->
		<FloorComponent :floorData="floor1" :floorTitle="floorName.floor1"></FloorComponent>
		<!-- 楼层2数据 -->
		<FloorComponent :floorData="floor2" :floorTitle="floorName.floor2"></FloorComponent>
		<!-- 楼层3数据 -->
		<FloorComponent :floorData="floor3" :floorTitle="floorName.floor3"></FloorComponent>
	</div>

</div>
</template>

<script>
import axios from 'axios';
import 'swiper/dist/css/swiper.css';
import url from '../../serviceAPI.config';

import {swiper,swiperSlide} from 'vue-awesome-swiper';
import {toMoney} from '@/filters/moneyFilter.js';
import FloorComponent from '../component/floorComponent.vue';
export default {
	name:"ShoppingMall",
	components:{swiper,swiperSlide,FloorComponent},
	filters:{
		moneyFilter(money){
			return toMoney(money);
		}
	},
	data() {
		return {
			locationIcon:require("../../assets/images/location.png"),
			bannerPicArray:[],
			category:[],
			adBanner:"",
			recommendGoods:[],
			floor1:[],		/* 获得楼层数据 */
			floor2:[],
			floor3:[],
			floorName:{},
			swiperOption:{
				slidesPerView:3
			}
		}
	},
	created() {
		/* 获取首页JSON数据 */
		axios({
			url:url.getShoppingMallInfo,
			method:"get"
		})
		.then((response) => {
			console.log(response.data);			/* 打印data */
			/* 如果请求成功 */
			if(response.status === 200){
				/* 1、获得type-bar的目录数据 */
				this.category = response.data.data.category;
				/* 由于type-bar图片第一张大小不同,所以下载至本地。现在遍历改成本地路径 */
				this.category.forEach( (cate,index)=>{
					cate.image = require(`../../assets/images/type-bar/${index+1}.png`)
				});
				// console.log(this.category);
				/* 2、获得广告条图片 */
				this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
				/* 3、获取轮播图的image */
				this.bannerPicArray = response.data.data.slides;
				/* 4、获取商品推荐数据 */
				this.recommendGoods = response.data.data.recommend;
				/* 5、获得楼层数据 */
				this.floor1 = response.data.data.floor1;
				this.floor2 = response.data.data.floor2;
				this.floor3 = response.data.data.floor3;
				/* 6、获得floorName */
				this.floorName = response.data.data.floorName;
			}
		}).catch((error) => {
			console.log(error);
			console.log("首页axios请求发生错误啦!!");
		});
	},
}
</script>

<style scoped>
	.search-bar{
		height: 2.5rem;
		background-color: #e5017b;
		line-height: 2.5rem;	/* 文字上下居中 */
		overflow: hidden;		/* 溢出部分隐藏 */
	}
	.search-input{
		width: 100%;
		height: 1.3rem;
		border: 0;
		border-bottom: 1px solid white !important;
		background-color: #e5017b;
		color: white;		/* 字体颜色 */
	}
	.location-icon{
		padding-top: 0.2rem;
		padding-left: 0.3rem;
	}
	.search-button{
		padding-left: 0.75rem;
	}
	.swiper-area{
		clear: both;	/* 清除浮动 */
		max-height: 9rem;	/* 设置最大高度，不让低网速时未知图片高度，组件溢出 */
		overflow: hidden;	/* 组件溢出隐藏 */
	}
	.type-bar{
		background-color: #ffffff;
		margin: 0 0.3rem 0.3rem 0.3rem;
		border-radius: 0.3rem;
		font-size: 0.875rem;
		display: flex;
		flex-direction: row;	/* 一行排列不换行 */
		flex-wrap: nowrap;
	}
	.type-bar div{
		padding: 0.3rem;
		font-size: 0.75rem;
		text-align: center;
	}
	.type-bar a{
		text-decoration: none;
		color: #000000;
	}
	.type-bar a:active{
		color: #686868;
	}
	.recommend-area{
		background-color: #ffffff;
		margin-top: 0.3rem;

	}
	.recommend-title{
		color: #e5017b;
		font-size: 0.875rem;
		border-bottom: 1px solid #eeeeee;
		padding: 0.2rem;
	}
	.recommend-body{
		border-bottom: 0.0625rem solid #ececec;
	}
	.recommend-item{
		width: 99%;
		font-size: 0.75rem;
		border-right: 0.0625rem solid #ececec;
		text-align: center;
	}
	.recommend-item a{
		text-decoration: none;
		color: #888888;
	}
	.recommend-item a:active{
		color: #686868;
	}
</style>