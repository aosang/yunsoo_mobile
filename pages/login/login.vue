<template>
	<Navigation />
	<view class="login">
		<image src="/static/images/common/system_logo_white.png" mode="widthFix" />
	</view>
	<!-- form -->
	<view class="login_form">
		<view class="login_form_item">
			<view class="login_form_label">电子邮箱</view>
			<wd-input 
				class="commonInput" 
				placeholder="请输入邮箱"  
				v-model="loginFormText.email"
				clearable
			/>
		</view>
		<view class="login_form_item">
			<view class="login_form_label">登录密码</view>
			<wd-input 
				class="commonInput" 
				placeholder="请输入密码" 
				v-model="loginFormText.password"
				clearable
			/>
		</view>
		<wd-button size="large" custom-class="custom-submit" @click="handleCheckForm">立即登录</wd-button>
	</view>
</template>

<script setup>
	import { reactive, ref } from 'vue';
	import Navigation from '@/components/navigation_header.vue'
	
	const loginFormText = reactive({
		email: '',
		password: ''
	})
	
	const isError = ref(false)
	
	const handleCheckForm = () => {
		if(!loginFormText.email || !loginFormText.password) {
			console.log('表单错误')
		}else {
			console.log('表单通过')
		}
	}
</script>

<style lang="scss">
	.login {
		width: 100%;
		height: 260rpx;
		background: #2a6fff;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			display: block;
			width: 350rpx;
			margin: 70rpx auto 0 auto;
		}
	}
	
	.login_form {
		width: 660rpx;
		margin: 70rpx auto 0 auto;
		
		:deep() {
			.custom-submit {
				width: 100%;
				margin-top: 30rpx;
				background: #2a6fff !important;
			}
		}
		
		.login_form_item {
			margin-bottom: 30rpx;
			.login_form_label {
				font-size: 28rpx;
				color: #333;
				margin-bottom: 10rpx;
			}
			
			.commonInput {
				height: 80rpx;
				box-shadow: none;
			}
		}
	}
</style>