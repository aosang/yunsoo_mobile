<template>
	<Navigation />
	<view class="workorder_list">
		<wd-navbar title="我的工单" fixed custom-class="custom" right-text="添加">
		</wd-navbar>
	</view>

	<view class="workorder_tab">
		<wd-tabs 
			v-model="tabNum"  
			autoLineWidth 
			color="#2a6fff"
			sticky
			:offset-top="90"
			inactiveColor="#333"
			custom-class="custom-tabs"
		>
			<block v-for="item in tabText" :key="item.id">
				<wd-tab :title="item.text">
					<view class="workorder_box">
						<wd-swipe-action class="workorder_item">
							<view class="workorder_list_item">
								<view class="device_status">已完成</view>
								<view class="device_box">
									<text class="device_box_title">设备名称：</text>
									<text class="device_box_text">MacBook Air 14</text>
								</view>
								<view class="device_box">
									<text class="device_box_title">设备类型：</text>
									<text class="device_box_text">笔记本</text>
								</view>
								<view class="device_box">
									<text class="device_box_title">设备品牌：</text>
									<text class="device_box_text">苹果</text>
								</view>
								<view class="device_box">
									<text class="device_box_title">更新时间：</text>
									<text class="device_box_text">2025-07-10 16:39:23</text>
								</view>
								<view class="device_box">
									<text class="device_box_title">问题描述：</text>
									<text
										class="device_box_text">在页面的vue文件中，我们需要自己编写一个导航栏组件，通常放在页面顶部。在页面的vue文件中，我们需要自己编写一个导航栏组件，通常放在页面顶部。</text>
								</view>
							</view>
							<template #right>
								<view class="device_action">
									<view class="device_button">删除</view>
								</view>
							</template>
						</wd-swipe-action>
					</view>
				</wd-tab>
			</block>
		</wd-tabs>
	</view>

</template>

<script setup>
	import Navigation from '@/components/navigation_header.vue'
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import {
		onLoad,
		onPullDownRefresh
	} from '@dcloudio/uni-app'

	const tabNum = ref(0)
	const tabText = reactive([{
		id: 1,
		text: '全部'
	}, {
		id: 2,
		text: '已完成'
	}, {
		id: 3,
		text: '处理中'
	}, {
		id: 4,
		text: '待处理'
	}])

	onLoad(() => {
		onPullDownRefresh(() => {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1500)
		})
	})

	// onMounted(() => {

	// })
</script>

<style lang="scss">
	.workorder_tab {
		:deep() {
			.custom-tabs {
				margin-top: 128rpx;
			}
		}
	}
	
	.workorder_list {
		:deep() {
			width: 100%;
			margin: 40rpx auto 0 auto;
			.custom {
				background-color: #2a6fff;
				margin-top: 88rpx;
			}
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
		line-height: 300rpx;
	}

	.workorder_box {
		width: 680rpx;
		margin: 24rpx auto 0 auto;

		.workorder_item {
			box-shadow: 0 0 15rpx rgba(0, 0, 0, 0.2);
			margin-bottom: 30rpx;
			border-radius: 10rpx;
		}

		.workorder_list_item {
			position: relative;
			width: 100%;
			background: #fff;
			border-radius: 10rpx;
			padding: 24rpx;
			box-sizing: border-box;

			.device_status {
				position: absolute;
				top: 24rpx;
				right: 24rpx;
				width: 130rpx;
				padding: 6rpx 0;
				background: #34d19d;
				// background: #fa4350;
				// background: #f0883a;
				font-size: 28rpx;
				color: #fff;
				border-radius: 4rpx;
				text-align: center;
			}

			.device_box {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				margin-bottom: 12rpx;

				.device_box_title {
					color: #333;
				}

				.device_box_text {
					max-width: 460rpx;
					color: #555;
					align-items: center;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

			}
		}
	}
</style>