<template>
	<Navigation />
	<view class="library_list">
		<wd-navbar title="知识库" fixed custom-class="custom" left-arrow left-text="返回" right-text="新增"
			custom-style="color: #fff" @click-left="goToBackEvent">
		</wd-navbar>

		<view class="library_box">
			<!-- <view class="empty_data">
				<wd-status-tip image="content" tip="暂无知识库" />
			</view> -->
			<wd-swipe-action class="library_item">
				<view class="library_list_item">
					<view class="library_list_icon">
						<image src="/static/images/library_icon/laptop.png" mode="widthFix">
						</image>
					</view>
					<view class="library_list_line"></view>
					<view class="library_list_text">
						<text class="library_list_title">调用zustand进行持久化存储，减少接口请求</text>
						<text class="library_list_subtitle">优化侧边栏宽度，适配高分辨率和低分辨率</text>
						<view class="library_list_info">
							<text>2025-08-08</text>
							<text class="library_list_author">xiaole2071</text>
						</view>
					</view>
				</view>
				<template #right>
					<view class="library_action">
						<view class="library_button">删除</view>
					</view>
				</template>
			</wd-swipe-action>
		</view>
	</view>
</template>

<script setup>
	import Navigation from '@/components/navigation_header.vue'

	const goToBackEvent = () => {
		uni.navigateBack()
	}
</script>

<style lang="scss">
	html,
	body {
		height: 100vh;
		background: #f3f3f3;
	}

	.library_list {
		width: 100%;

		:deep() {
			.custom {
				background-color: #2a6fff;
				margin-top: 88rpx;
			}
		}

		.library_box {
			width: 680rpx;
			margin: 200rpx auto 0 auto;
			color: #000;

			.library_item {
				box-shadow: 0 0 15rpx rgba(0, 0, 0, 0.2);
				margin-bottom: 30rpx;
				border-radius: 10rpx;
				
				.library_action {
					display: block;
					width: 100%;
					height: 100%;
				}
				
				.library_button {
					padding: 0 24rpx;
					height: 100%;
					color: #fff;
					background: #fa4350;
					font-size: 28rpx;
					line-height: 164rpx;
				}

				.library_list_item {
					display: flex;
					position: relative;
					width: 100%;
					background: #fff;
					border-radius: 10rpx;
					padding: 24rpx;
					box-sizing: border-box;
					align-items: center;

					.library_list_line {
						width: 2rpx;
						height: 90rpx;
						background: #eee;
						margin: 0 30rpx;
					}

					.library_list_icon {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 80rpx;
						height: 80rpx;
						background: #4d80f0;
						border-radius: 100%;

						image {
							width: 36rpx;
							height: 36rpx;
						}
					}

					.library_list_text {
						.library_list_title {
							display: block;
							width: 400rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							font-size: 28rpx;
							font-weight: 700;
							color: #333;
						}

						.library_list_subtitle {
							display: block;
							width: 400rpx;
							font-size: 24rpx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							color: rgba(0, 0, 0, 0.65);
						}

						.library_list_info {
							display: flex;
							margin-top: 8rpx;

							text {
								font-size: 24rpx;
								color: #555;
								margin-right: 40rpx;
							}

							.library_list_author {
								display: block;
								width: 260rpx;
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
							}
						}
					}
				}
			}
		}
	}
</style>