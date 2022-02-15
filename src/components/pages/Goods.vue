<template>
	<div>
		商品详情页面
	</div>
</template>

<script>
import axios from 'axios';
import url from '../../serviceAPI.config';
export default {
	name:"Goods",
	data() {
		return {
			goodsId:"775e575ce28a4f89b1dfe2c99eb08ae7",
		}
	},
	created() {
		this.getInfo();
	},
	methods: {
		getInfo(){
			axios({
				url:url.getDetailGoodsInfo,
				method:"post",
				data:{goodsId:this.goodsId}
			}).then((response) => {
				console.log("我是getInfo()response",response);
			}).catch((err) => {
				console.log("我是getInfo()err",err);
			});
		}
	},
}
</script>

<style>

</style>