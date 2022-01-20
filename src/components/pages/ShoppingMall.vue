<template>
	<div>
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
			<van-swipe :autoplay="1000">
				<van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
					<a href="#"><img v-lazy="banner.imageUrl" width="100%" alt="banner"></a>
				</van-swipe-item>
			</van-swipe>
		</div>
	</div>
</template>

<script>
export default {
	name:"ShoppingMall",
	data() {
		return {
			locationIcon:require("../../assets/images/location.png"),
			bannerPicArray:[
				{imageUrl:require("../../assets/images/simleVueDemoPic001.jpg")},
				{imageUrl:require("../../assets/images/simleVueDemoPic002.jpg")},
				{imageUrl:require("../../assets/images/simleVueDemoPic003.jpg")}
			]
		}
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
		max-height: 17.5rem;	/* 设置最大高度，不让低网速时未知图片高度，组件溢出 */
		overflow: hidden;	/* 组件溢出隐藏 */
	}
</style>