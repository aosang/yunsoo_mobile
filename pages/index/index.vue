<template>
	<Navigation />
	<view class="content">
		<view class="home_bg">
			<view class="home_info">
				<text>Yunsoo云梳</text>
				<text>{{ userName || '--'}}</text>
			</view>
		</view>
		<view class="home_bg_banner">
			<image 
				src="https://www.wangle.run/yunsoo_wrap/yunsoo_banner.png" 
				mode="widthFix"
			/>
		</view>
		<!-- nav -->
		<view class="home_nav">
			<wd-row>
				<wd-col :span="6">
					<view class="home_nav_item home_nav_inventory">
						<image 
							src="/static/images/nav_icon/receive.svg" 
							mode="widthFix"
						>
						</image>
					</view>
					<text class="home_nav_text">库存管理</text>
				</wd-col>
				<wd-col :span="6">
					<view class="home_nav_item home_nav_inspection">
						<image src="/static/images/nav_icon/checklist.svg" mode="widthFix">
						</image>
					</view>
					<text class="home_nav_text">巡检记录</text>
				</wd-col>
				<wd-col :span="6" @click="goToLibrary">
					<view class="home_nav_item home_nav_library">
						<image src="/static/images/nav_icon/book.svg" mode="widthFix">
						</image>
					</view>
					<text class="home_nav_text">知识库</text>
				</wd-col>
				<wd-col :span="6">
					<view class="home_nav_item home_nav_user">
						<image src="/static/images/nav_icon/people.svg" mode="widthFix"></image>
					</view>
					<text class="home_nav_text">人员管理</text>
				</wd-col>
			</wd-row>
		</view>
		<!-- 工单信息 -->
		<view class="home_nav_title">
			<view class="home_nav_subtitle">工单信息</view>
			<view class="home_workorder">
				<view class="home_workorder_item home_workorder_count">
					<image src="/static/images/workorder/workorder_total.svg" mode="widthFix"></image>
					<view class="home_workorder_text">
						<text class="home_workorder_num">1000</text>
						<text class="home_workorder_info">工单总计</text>
					</view>
				</view>
				<view class="home_workorder_item home_workorder_finish">
					<image src="/static/images/workorder/workorder_finish.svg" mode="widthFix"></image>
					<view class="home_workorder_text">
						<text class="home_workorder_num">1000</text>
						<text class="home_workorder_info">已完成</text>
					</view>
				</view>
				<view class="home_workorder_item home_workorder_process">
					<image src="/static/images/workorder/workorder_process.svg" mode="widthFix"></image>
					<view class="home_workorder_text">
						<text class="home_workorder_num">1000</text>
						<text class="home_workorder_info">处理中</text>
					</view>
				</view>
				<view class="home_workorder_item home_workorder_wait">
					<image src="/static/images/workorder/workorder_wait.svg" mode="widthFix"></image>
					<view class="home_workorder_text">
						<text class="home_workorder_num">1000</text>
						<text class="home_workorder_info">待处理</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 资产信息 -->
		<view class="home_nav_title">
			<view class="home_nav_subtitle">资产信息</view>
			<view class="home_assets_total">
				<view class="assets_total">
					<text>CNY 1000</text>
					<text>资产总计</text>
				</view>
				<view class="assets_total">
					<text>CNY 1000</text>
					<text>数量总计</text>
				</view>
			</view>
			<view class="home_assets">
				<view class="home_assets_item">
					<view class="home_assets_title">
						<image src="/static/images/device_icon/computer.svg" mode="widthFix" />
						<text>电脑：</text>
					</view>
					<text class="assets_num">1000</text>
				</view>
				<view class="home_assets_item">
					<view class="home_assets_title">
						<image src="/static/images/device_icon/service.svg" mode="widthFix" />
						<text>服务器：</text>
					</view>
					<text class="assets_num">1000</text>
				</view>
				<view class="home_assets_item">
					<view class="home_assets_title">
						<image src="/static/images/device_icon/mouse.svg" mode="widthFix" />
						<text>鼠标：</text>
					</view>
					<text class="assets_num">1000</text>
				</view>
				<view class="home_assets_item">
					<view class="home_assets_title">
						<image src="/static/images/device_icon/switch.svg" mode="widthFix" />
						<text>交换机：</text>
					</view>
					<text class="assets_num">1000</text>
				</view>
				<view class="home_assets_item">
					<view class="home_assets_title">
						<image src="/static/images/device_icon/router.svg" mode="widthFix" />
						<text>路由器：</text>
					</view>
					<text class="assets_num">1000</text>
				</view>
				<view class="home_assets_item">
					<view class="home_assets_title">
						<image src="/static/images/device_icon/monitor.svg" mode="widthFix" />
						<text>显示器：</text>
					</view>
					<text class="assets_num">1000</text>
				</view>
				<view class="home_assets_item">
					<view class="home_assets_title">
						<image src="/static/images/device_icon/mobile.svg" mode="widthFix" />
						<text>手机：</text>
					</view>
					<text class="assets_num">1000</text>
				</view>
				<view class="home_assets_item">
					<view class="home_assets_title">
						<image src="/static/images/device_icon/laptop.svg" mode="widthFix" />
						<text>笔记本：</text>
					</view>
					<text class="assets_num">1000</text>
				</view>
				<view class="home_assets_item">
					<view class="home_assets_title">
						<image src="/static/images/device_icon/printer.svg" mode="widthFix" />
						<text>打印机：</text>
					</view>
					<text class="assets_num">1000</text>
				</view>
				<view class="home_assets_item">
					<view class="home_assets_title">
						<image src="/static/images/device_icon/other.svg" mode="widthFix" />
						<text>其它：</text>
					</view>
					<text class="assets_num">1000</text>
				</view>
			</view>
		</view>
	</view>

</template>

<script setup>
	import Navigation from '@/components/navigation_header.vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { ref, onMounted } from 'vue'
	import { requestMethods } from '@/request/request.js'
	import { useToast } from '@/uni_modules/wot-design-uni'
	const toast = useToast()
	import { userInfoStore } from '@/stores/userInfo'
	const userStore = userInfoStore()
	
	const userName = ref('')
	
	onLoad(() => {
		// console.log(userStore.token);
		if(!userStore.token || isTokenExpired(userStore.tokenTime)) {
			uni.showToast({
				title: '请重新登录',
				duration: 1500,
				icon: 'none'
			})
			uni.redirectTo({
				url: '/pages/login/login'
			})
		}
		
		// 获取用户昵称
		userName.value = userStore.userName || '--'
	})

	// 判断token是否过期
	const isTokenExpired = (time) => {
		const now = Math.floor(Date.now() / 1000)
		return time <= now
	}
	
	const goToLibrary = () => {
		uni.navigateTo({
			url: '/pages/library/library'
		})
	}
</script>

<style lang="scss">
	.content {
		width: 100%;
		position: relative
	}
	
	.home_bg {
		position: fixed;
		top: 80rpx;
		left: 0;
		width: 100%;
		height: 72rpx;
		background-color: #2a6fff;
		z-index: 10;

		.home_info {
			padding: 0 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #fff;
			font-size: 30rpx;
		}
	}
	
	.home_bg_banner {
		position: relative;
		width: 100%;
		height: 180rpx;
		margin: 152rpx auto 0 auto;
		background: #2a6fff;
	
		image {
			display: block;
			width: 700rpx;
			border-radius: 10rpx;
			margin: 0 auto;
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
		}
	}

	.home_nav {
		width: 700rpx;
		margin: 120rpx auto 40rpx auto;

		.home_nav_item {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
			background: #2a6fff;
			margin: 0 auto;
			text-align: center;
			line-height: 118rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 52rpx;
				height: 52rpx;
			}
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
		margin: 0 auto;

		.home_nav_subtitle {
			text-align: left;
			font-size: 28rpx;
			color: #000;
			margin-bottom: 24rpx;
		}
		
		.home_assets_total {
			display: flex;
			align-items: center;
			width: 700rpx;
			height: 140rpx;
			margin: 0 auto;
			background: #2a6fff;
			border-radius: 10rpx;
			margin-bottom: 24rpx;
			
			.assets_total {
				width: 48%;
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #fff;
				font-size: 28rpx;
			}
			
			.assets_total:first-child {
				border-right: 1px solid rgba(255, 255, 255, 0.5);
			}
		}

		.home_workorder {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-bottom: 28rpx;

			.home_workorder_item {
				width: 48%;
				height: 160rpx;
				background: #07b0f8;
				margin-bottom: 24rpx;
				border-radius: 20rpx;
				display: flex;
				align-items: center;
				padding: 0 32rpx;
				box-sizing: border-box;
				justify-content: space-between;

				.home_workorder_text {
					display: flex;
					flex-direction: column;
					color: #fff;
					font-size: 30rpx;

					.home_workorder_num {
						font-size: 30rpx;
					}

					.home_workorder_info {
						font-size: 28rpx;
					}
				}

				image {
					display: block;
					width: 92rpx;
					height: 92rpx;
				}
			}

			.home_workorder_count {
				background: linear-gradient(#4878ff, #5e89fe)
			}

			.home_workorder_finish {
				background: linear-gradient(#14e2af, #02dd9c)
			}

			.home_workorder_process {
				background: linear-gradient(#fe6f89, #ff9a96)
			}

			.home_workorder_wait {
				background: linear-gradient(#fea926, #ffb631)
			}
		}
	}

	.home_assets {
		width: 700rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-bottom: 40rpx;

		.home_assets_item {
			display: flex;
			align-items: center;
			width: 48.5%;
			height: 90rpx;
			box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.2);
			margin-bottom: 20rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			
			.assets_num {
				font-size: 28rpx;
				color: #333;
				margin-top: 4rpx;
				font-weight: 500;
			}
			
			.home_assets_title {
				display: flex;
				align-items: center;
				image {
					width: 28rpx;
				}
				text {
					font-size: 28rpx;
					color: #333;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>