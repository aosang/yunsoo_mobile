<template>
	<Navigation />
	<view class="profile_box">
		<view class="profile_box_avatar">
			<wd-img
				round 
				:width="68" 
				:height="68" 
				:src="baseUrl" 
				:enable-preview="true" 
			/>
			<text>MilesWang</text>
		</view>
	</view>
	
	<view class="profile_info">
		<view class="profile_info_item">
			<view class="profile_name">
				<image src="/static/images/profile/profile_email.svg" mode="widthFix" />
				<text>电子邮箱</text>
			</view>
			<view class="profile_value">wangle2071@163.com</view>
		</view>
		<view class="profile_info_item">
			<view class="profile_name">
				<image src="/static/images/profile/profile_company.svg" mode="widthFix" />
				<text>公司名称</text>
			</view>
			<view class="profile_value">AAC</view>
		</view>
		<view class="profile_info_item">
			<view class="profile_name">
				<image src="/static/images/profile/profile_version.svg" mode="widthFix" />
				<text>软件版本</text>
			</view>
			<view class="profile_value">v1.0.0</view>
		</view>
		<wd-button size="large" custom-class="custom-logout">退出登录</wd-button>
	</view>
</template>

<script setup>
	import Navigation from '@/components/navigation_header.vue'
	const baseUrl = 'https://www.wangle.run/company_icon/public_image/pub_avatar.jpg'
	
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
