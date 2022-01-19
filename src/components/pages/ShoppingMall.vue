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
	</div>
</template>

<script>
export default {
	name:"ShoppingMall",
	data() {
		return {
			locationIcon:require("../../assets/images/location.png"),
			bannerPicArray:[
                {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg'},
                {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg'},
                {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg'},
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
		padding-left: 0.5rem;
	}
</style>