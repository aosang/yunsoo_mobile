<template>
	<Navigation />
	<view class="device_list">
		<wd-navbar
			title="设备管理" 
			fixed 
			custom-class="custom"
			custom-style="color: #fff"
		>
		</wd-navbar>
	</view>
	<view class="device_box">
		<!-- <view class="empty_data">
			<wd-status-tip image="content" tip="暂无IT设备" />
		</view> -->
		<block v-for="device in deviceData" :key="device.id">
			<wd-swipe-action class="device_box_item">
				<wd-card 
					type="rectangle" 
					custom-class="device_card"
					custom-title-class="device_title"
					custom-content-class="device_content"
				>
					<template #title>
						<view class="device_top">
							<view class="device_top_brand">
								<image src="https://www.wangle.run/company_icon/aliyun.svg" mode="widthFix" />
								<view class="device_top_text">{{device.product_brand}}</view>
							</view>
							<view class="device_top_time">创建时间：{{dayjs(device.product_time).format('YY/MM/DD hh:mm:ss')}}</view>
						</view>
					</template>
					<view class="device_content_text">
						<view class="device_content_item">设备名称：{{device.value}}</view>
						<view class="device_content_item">设备类型：{{device.product_type}}</view>
					</view>
				</wd-card>
				<template #right>
					<view class="device_action">
						<view class="device_button">删除</view>
					</view>
				</template>
			</wd-swipe-action>
		</block>
	</view>
</template>

<script setup>
	import Navigation from '@/components/navigation_header.vue'
	import { onMounted, ref } from 'vue'
	import { requestMethods } from '@/request/request'
	import dayjs from 'dayjs'
	
	const deviceData = ref([])
	
	onMounted(() => {
		getDeviceListData()
	})
	
	const getDeviceListData = async () => {
		let res = await requestMethods('/Device', 'GET')
		if(res.code === 200) {
			deviceData.value = res.data
		}
	}
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
	
	.device_box_item {
		margin-bottom: 4rpx;
	}
	
	:deep() {
		.device_card {
			border-radius: 10rpx !important;
		}
		
		.device_title {
			padding: 20rpx 0;
		}
		
		.device_content {
			padding: 20rpx 0 !important;
		}
	}
	
	.device_action {
		display: block;
		width: 100%;
		height: 100%;
	}
	
	.device_button {
		padding: 0 24rpx;
		height: 100%;
		color: #fff;
		background: #fa4350;
		font-size: 28rpx;
		line-height: 220rpx;
	}
	
	.device_top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #555;
		
		.device_top_brand {
			display: flex;
			align-items: center;
			
			.device_top_text {
				font-size: 28rpx;
			}
			
			.device_top_time {
				font-size: 26rpx;
			}
		}
		
		image {
			width: 40rpx;
			margin-right: 12rpx;
		}
	}
	
	.device_content_text {
		color: #555;
		font-size: 28rpx;
		.device_content_item {
			margin-bottom: 10rpx;
		}
	}
}
</style>
