<template>
	<div>
		<div class="naavar-div">
			<van-nav-bar
				title="商品详情"
				left-text="返回"
				left-arrow
				@click-left="onClickLeft"
			/>
		</div>
		<div class="topImage-div">
			<img :src="goodsInfo.IMAGE1" width="100%" alt="goods.IMAGE1">
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import url from '../../serviceAPI.config';
import {Toast} from 'vant';
export default {
	name:"Goods",
	data() {
		return {
			goodsId:"",
			goodsInfo:{}	//商品详细信息
		}
	},
	created() {
		this.goodsId = this.$route.query.goodsId;//接收参数
		this.getInfo();
	},
	methods: {
		getInfo(){
			axios({
				url:url.getDetailGoodsInfo,
				method:"post",
				data:{goodsId:this.goodsId}
			}).then((response) => {
				// console.log("我是getInfo()response",response);
				if(response.data.code === 200 && response.data.message){
					this.goodsInfo = response.data.message;
					console.log("我是this.goodsInfo",this.goodsInfo);
				}else{
					console.log(response.data);
					Toast.fail("数据获取失败");
				}
			}).catch((err) => {
				console.log("我是getInfo()err",err);
				Toast.fail("数据获取失败");
			});
		},
		onClickLeft(){
			this.$router.go(-1);	//返回上一级路由
		}
	},
}
</script>

<style>

</style>