<template>
	<Navigation />
	<view class="device_list">
		<wd-navbar
			title="设备管理" 
			fixed 
			custom-class="custom"
			left-arrow
			left-text="返回"
			custom-style="color: #fff"
		>
		</wd-navbar>
	</view>
	<view class="device_box">
		<wd-card 
			type="rectangle" 
			custom-class="device_card"
			custom-title-class="device_title"
		>
		  <template #title>
		    <view class="device_top">
					<view class="device_top_brand">
						<image src="https://www.wangle.run/company_icon/aliyun.svg" mode="widthFix"></image>
						<view class="device_top_text">阿里云服务器</view>
					</view>
					<view class="device_top_text">2025/09/05 17:27</view>
		    </view>
		  </template>
			<view>ahaahaha</view>
		</wd-card>
	</view>
</template>

<script setup>
	import Navigation from '@/components/navigation_header.vue';
</script>

<style lang="scss">
html, body {
	background: #eee;
}
.device_list {
	width: 100%;
	:deep() {
		.custom {
			background-color: #2a6fff;
			margin-top: 88rpx;
		}
	}
}

.device_box {
	width: 700rpx;
	margin: 200rpx auto 0 auto;
	box-sizing: border-box;
	
	:deep() {
		.device_card {
			border-radius: 10rpx !important;
		}
		
		.device_title {
			padding: 20rpx 0;
		}
	}
	
	.device_top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		.device_top_brand {
			display: flex;
			align-items: center;
			
			.device_top_text {
				font-size: 28rpx;
				color: #555;
			}
		}
		
		image {
			width: 40rpx;
			margin-right: 12rpx;
		}
	}
}
</style>
