<template>
	<Navigation />
	<wd-toast />
	<view class="login">
		<image src="/static/images/common/system_logo_white.png" mode="widthFix" />
	</view>
	
	<!-- form -->
	<view class="login_form">
		<view class="login_form_item">
			<view class="login_form_label">电子邮箱</view>
			<wd-input 
				custom-input-class="commonInput"
				placeholder="请输入邮箱"  
				v-model="loginFormText.email"
				clearable
			/>
		</view>
		<view class="login_form_item">
			<view class="login_form_label">登录密码</view>
			<wd-input 
				custom-input-class="commonInput"
				placeholder="请输入密码" 
				v-model="loginFormText.password"
				clearable
				show-password
			/>
		</view>
		<wd-button 
			size="large" 
			custom-class="custom-submit" 
			@click="handleCheckForm"
		>
			立即登录
		</wd-button>
	</view>
</template>

<script setup>
	import { reactive, ref, onMounted } from 'vue';
	import Navigation from '@/components/navigation_header.vue'
	import { useToast } from '@/uni_modules/wot-design-uni'
	const toast = useToast()
	import { requestMethods } from '@/request/request'
	import { userInfoStore } from '@/stores/userInfo'
	const userStore = userInfoStore()
	
	const loginFormText = reactive({
		email: '',
		password: ''
	})
	
	const isError = ref(false)
	
	const handleCheckForm = async () => {
		let emailReg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
		if(!loginFormText.email || !emailReg.test(loginFormText.email)) {
			toast.error('请输入正确邮箱')
		}else if(!loginFormText.password) {
			toast.error('密码错误')
		} else {
			let res = await requestMethods('/Login', 'POST', loginFormText)
			if(res.code === 200) {
				toast.show({
					iconName: 'success',
					msg: '登录成功',
					duration: 600,
					closed: () => {
						let { access_token, expires_at } = res.data.session
						let { id } = res.data.session.user
						let { username } = res.data.session.user.user_metadata
						
						userStore.setUser(access_token, expires_at, id, username)
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}
				})
			}else if(res.code === 400) {
				toast.error('邮箱或密码错误')
			}
		}
	}
</script>

<style lang="scss">
	.login {
		width: 100%;
		background: #2a6fff;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			display: block;
			width: 100%;
			margin: 70rpx auto 0 auto;
		}
	}
	
	.login_form {
		width: 660rpx;
		margin: 60rpx auto 0 auto;
		
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
				display: block;
				box-shadow: none;
				font-size: 28rpx;
				border-bottom: 1px solid #eee;
			}
		}
	}
</style>