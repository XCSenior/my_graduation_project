<template>
<div class="register-all">
	<van-nav-bar class="register-top"
		title="登录"
		left-text="返回"
		left-arrow
		@click-left="goBack"
	/>
	<div class="register-panel">
		<van-field
			class="van-field-area"
			v-model="username"
			label="用户名"
			icon="clear"
			placeholder="请输入用户名："
			required
			@click-icon="username=''"
			:error-message="usernameErrorMsg"
		/>
		<van-field
			class="van-field-area"
			v-model="password"
			type="password"
			label="密码"
			placeholder="请输入密码："
			required
			:error-message="passwordErrorMsg"
		/>
		<div class="register-button">
			<van-button type="primary" size="large" @click="loginAction" :loading="openLoading">登录</van-button>
		</div>
	</div>
</div>
</template>

<script>
import { Toast } from 'vant';
import axios from 'axios';
import url from '../../serviceAPI.config';
export default {
	name:"Login",
	data() {
		return {
			username:"",
			password:"",
			openLoading:false,	//是否开启用户登录的Loading状态
			usernameErrorMsg:"", //当用户名出现错误时的提示信息
			passwordErrorMsg:"", //当密码出现错误时的提示信息
		}
	},
	methods:{
		goBack(){
			this.$router.go(-1);
		},

		/* 注册按钮响应事件 */
		loginAction(){
			// if(this.checkForm()){
			// 	this.axiosLoginUser();
			// }
			this.checkForm() && this.axiosLoginUser()
		},
		/* 发送请求登录用户 */
		axiosLoginUser(){
			this.openLoading = true;
			axios({
				url:url.login,
				method:"post",
				data:{
					userName:this.username,
					password:this.password
				}
			}).then( (response) => {
				console.log(response);
				this.openLoading = false;
				Toast.success(response.data.message);
			}).catch((err) => {
				console.log(err);
				this.openLoading = false;
				Toast.fail("注册失败");
			});
		},
		/* 表单验证方法 */
		checkForm(){
			let isOk = true;
			if(this.username.length < 5){
				this.usernameErrorMsg = this.username.length === 0 ? "用户名不能为空！" : "用户名不能少于5位"
				isOk = false;
			}else{
				this.usernameErrorMsg = "";
			}
			if(this.password.length < 5){
				this.passwordErrorMsg = this.password.length === 0 ? "密码不能为空！" : "密码不能少于5位"
				isOk = false;
			}else{
				this.passwordErrorMsg = "";
			}
			return isOk;
		}
	}
}
</script>

<style scoped>
	.register-panel{
		width: 96%;
		border-radius: 5px;
		margin: 10rem auto;
		padding-bottom: 20rem;
	}
	.van-field-area{
		margin-bottom: 10px;
	}
</style>