<template>
	<Navigation />
	<wd-toast />
	<view class="profile_box">
		<view class="profile_box_avatar">
			<wd-img
				round 
				:width="68" 
				:height="68" 
				:src="userInfo.userAvatarUrl? userInfo.userAvatarUrl : baseUrl " 
				:enable-preview="true" 
			/>
			<text>{{ userInfo.userMyName }}</text>
		</view>
	</view>
	
	<view class="profile_info">
		<view class="profile_info_item">
			<view class="profile_name">
				<image src="/static/images/profile/profile_email.svg" mode="widthFix" />
				<text>电子邮箱</text>
			</view>
			<view class="profile_value">{{ userInfo.userEmail }}</view>
		</view>
		<view class="profile_info_item">
			<view class="profile_name">
				<image src="/static/images/profile/profile_company.svg" mode="widthFix" />
				<text>公司名称</text>
			</view>
			<view class="profile_value">{{ userInfo.userCompany }}</view>
		</view>
		<view class="profile_info_item">
			<view class="profile_name">
				<image src="/static/images/profile/profile_time.svg" mode="widthFix" />
				<text>注册时间</text>
			</view>
			<view class="profile_value">{{ userInfo.userTime }}</view>
		</view>
		<view class="profile_info_item">
			<view class="profile_name">
				<image src="/static/images/profile/profile_version.svg" mode="widthFix" />
				<text>软件版本</text>
			</view>
			<view class="profile_value">v1.0.0</view>
		</view>
		<wd-button 
			size="large" 
			custom-class="custom-logout"
			@click="logoutHandler"
		>
			退出登录
		</wd-button>
	</view>
</template>

<script setup>
	import { reactive, ref, onMounted, nextTick } from 'vue'
	import Navigation from '@/components/navigation_header.vue'
	const baseUrl = 'https://www.wangle.run/company_icon/public_image/pub_avatar.jpg'
	import { useToast } from '@/uni_modules/wot-design-uni'
	const toast = useToast()
	import { requestMethods } from '@/request/request.js'
	import { onLoad } from '@dcloudio/uni-app'
	import { userInfoStore } from '@/stores/userInfo'
	const userStore = userInfoStore()
	
	const userInfo = reactive({
		userEmail: '',
		userCompany: '',
		userAvatarUrl: '',
		userMyName: '',
		userTime: ''
	})
		
	onMounted(() => {
		nextTick(() => {
			getProfileInfo()
		})
	})
	
	const getProfileInfo = async () => {
		let res = await requestMethods('/Profile', 'GET', {
			user_id: userStore.userId
		})
		
		if(res.code === 200) {
			userInfo.userEmail = res.data[0].email || '--'
			userInfo.userCompany = res.data[0].company || '--'
			userInfo.userAvatarUrl = res.data[0].avatar_url || '--'
			userInfo.userMyName = res.data[0].username || '--'
			userInfo.userTime = res.data[0].created_at || '--'
		}
	}

	const logoutHandler = async () => {
		let res = await requestMethods('/Logout', 'POST')
		if(res.code === 200) {
			toast.show({
				iconName: 'success',
				msg: '已退出!',
				duration: 600,
				closed: () => {
					userStore.clearUser()
					uni.reLaunch({
						url: '/pages/login/login'
					})
				}
			})
		}else {
			toast.error('退出异常!')
		}
	}
</script>

<style lang="scss">
	.profile_box {
		width: 100%;
		height: 350rpx;
		background: #2a6fff;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.profile_box_avatar {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-top: 80rpx;
			
			text {
				margin-top: 20rpx;
				font-size: 30rpx;
				color: #fff;
			}
		}
	}
	
	.profile_info {
		:deep() {
			.custom-logout {
				display: block;
				width: 680rpx;
				background: #2a6fff !important;
				margin: 40rpx auto 0 auto;
			}
		}
		
		.profile_info_item {
			display: flex;
			padding: 30rpx;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #eee;
			
			.profile_value {
				font-size: 28rpx;
				color: #333;
			}
			
			.profile_name {
				display: flex;
				align-items: center;
				
				text {
					color: #333;
					font-size: 28rpx;
					margin-left: 10rpx;
				}
				
				image {
					display: block;
					width: 40rpx;
				}
			}
		}
	}
</style>
