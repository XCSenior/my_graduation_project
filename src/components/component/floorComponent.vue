<template>
	<!-- 楼层1数据 -->
	<div class="floor">
		<div class="floor-anomaly">		<!-- 不规则的楼层 -->
			<div class="floor-one">
				<img :src.lazy="floorData0.image" width="100%">
			</div>
			<div>
				<div class="floor-two">
					<img :src.lazy="floorData1.image" width="100%">
				</div>
				<div class="floor-three">
					<img :src.lazy="floorData2.image" width="100%">
				</div>
			</div>
		</div>
		<div class="floor-rule">
			<div v-for="(item,index) in floorData.slice(3)" :key="item.goodsId">
				<img :src.lazy="item.image" width="100%">
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name:"FloorComponent",
	props:["floorData"],
	data() {
		return {
			floorData0:{},
			floorData1:{},
			floorData2:{}
		}
	},
	watch:{
		floorData(value){
			this.floorData0 = this.floorData[0];
			this.floorData1= this.floorData[1];
			this.floorData2 = this.floorData[2];
		}
	}
}
</script>

<style scoped>
	.floor-anomaly{
		display: flex;
		flex-direction: row;
		background-color: #ffffff;
		border-bottom: 0.0625rem solid #cccccc;
	}
	.floor-anomaly div{
		width: 10rem;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	.floor-one{
		border-right: .0625rem solid #cccccc;
	}
	.floor-two{
		border-bottom: .0625rem solid #cccccc;
	}
	.floor-rule{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background-color: #ffffff;
	}
	.floor-rule div{
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		width: 10rem;
		border-bottom: 0.0625rem solid #cccccc;
	}
	.floor-rule div:nth-child(odd){
		border-right: 0.0625rem solid #cccccc;
	}
</style>