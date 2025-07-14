<template>
	<view class="content">
		<Navigation />
		<view class="home_bg">
			<view class="home_info">
				<text>Yunsoo云梳</text>
				<text>xiaole2071</text>
			</view>
			<view class="home_bg_banner">
				<image src="https://www.wangle.run/yunsoo_wrap/yunsoo_banner.png" mode="widthFix">
				</image>
			</view>
		</view>
		<!-- nav -->
		<view class="home_nav">
			<wd-row>
				<wd-col :span="6">
					<view class="home_nav_item home_nav_inventory" >
						<wd-icon name="a-controlplatform" size="32px" color="#fff"></wd-icon>
					</view>
					<text class="home_nav_text">库存管理</text>
				</wd-col>
				<wd-col :span="6">
					<view class="home_nav_item home_nav_inspection">
						<wd-icon name="check-circle" size="32px" color="#fff"></wd-icon>
					</view>
					<text class="home_nav_text">巡检记录</text>
				</wd-col>
				<wd-col :span="6">
					<view class="home_nav_item home_nav_library">
						<wd-icon name="folder" size="32px" color="#fff"></wd-icon>
					</view>
					<text class="home_nav_text">知识库</text>
				</wd-col>
				<wd-col :span="6">
					<view class="home_nav_item home_nav_user">
						<wd-icon name="usergroup" size="32px" color="#fff"></wd-icon>
					</view>
					<text class="home_nav_text">人员管理</text>
				</wd-col>
			</wd-row>
		</view>
		<!-- 工单信息 -->
		<view class="home_nav_title">
			<view class="home_nav_subtitle">工单信息</view>
			<view class="home_workorder">
				<view class="home_workorder_item"></view>
				<view class="home_workorder_item"></view>
				<view class="home_workorder_item"></view>
				<view class="home_workorder_item"></view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import Navigation from '@/components/navigation_header.vue'
	import {
		ref,
		onMounted
	} from 'vue'

	onMounted(() => {
		// getMyData()
	})

	const myData = ref([])

	// const getMyData = () => {
	// 	uni.request({
	// 		url: 'http://192.168.8.5:3000/message',
	// 		method: 'GET',
	// 		success: (res) => {
	// 			myData.value = res.data
	// 			// console.log(res)
	// 		}
	// 	})
	// }
</script>

<style lang="scss">
	.home_bg {
		width: 100%;
		height: 240rpx;
		background-color: #2a6fff;

		.home_info {
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #fff;
			font-size: 30rpx;
		}

		.home_bg_banner {
			width: 700rpx;
			margin: 0 auto;

			image {
				width: 100%;
				border-radius: 10rpx;
				margin-top: 30rpx;
				box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
			}
		}
	}
	
	.home_nav {
		width: 700rpx;
		margin: 130rpx auto 0 auto;
		
		.home_nav_item {
			width: 118rpx;
			height: 118rpx;
			border-radius: 100%;
			background: #2a6fff;
			margin: 0 auto;
			text-align: center;
			line-height: 118rpx;
		}
		
		.home_nav_text {
			display: block;
			font-size: 28rpx;
			color: #555;
			text-align: center;
			margin-top: 6rpx;
		}
		
		.home_nav_inventory {
			background: linear-gradient(#07b0f8, #43d7fd);
		}
		
		.home_nav_inspection {
			background: linear-gradient(#8e69fc, #a98df3);
		}
		
		.home_nav_library {
			background: linear-gradient(#f9b31a, #ffe12e);
		}
		
		.home_nav_user {
			background: linear-gradient(#fe8312, #ffb302);
		}
	}
	
	.home_nav_title {
		width: 700rpx;
		margin: 50rpx auto 0 auto;
		
		.home_nav_subtitle {
			text-align: left;
			font-size: 28rpx;
			color: #000;
			margin-bottom: 24rpx;
		}
		
		.home_workorder {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			
			.home_workorder_item {
				width: 48%;
				height: 180rpx;
				background: #07b0f8;
				margin-bottom: 24rpx;
				border-radius: 20rpx;
			}
			
			.home_workorder_count {
				
			}
		}
	}
</style>