<template>
	<Navigation />
	<wd-toast />
	<view class="library_list">
		<wd-navbar 
			title="知识库" 
			fixed 
			custom-class="custom" 
			left-arrow 
			left-text="返回" 
			right-text="新增"
			custom-style="color: #fff" 
			@click-left="goToBackEvent"
			@click-right="goToCreateLibrary"
		>
		</wd-navbar>
		<view class="library_box">
			<view class="library_loading" v-if="isLoading">
				<wd-loading></wd-loading>
			</view>
			<view class="empty_data" v-if="!isLoading && libraryData.length === 0">
				<wd-status-tip image="content" tip="暂无知识库" />
			</view>
			<block v-for="(item, index) in libraryData" :key="index">
				<wd-swipe-action class="library_item" >
					<view class="library_list_item" @click="goToLibraryDetails(item.created_id)">
						<view class="library_list_icon" v-show="item.type === '笔记本'">
							<image src="/static/images/library_icon/laptop.png" mode="widthFix"></image>
						</view>
						<view class="library_list_icon" v-show="item.type === '服务器'">
							<image src="/static/images/library_icon/service.png" mode="widthFix"></image>
						</view>
						<view class="library_list_icon" v-show="item.type === '电脑'">
							<image src="/static/images/library_icon/computer.png" mode="widthFix"></image>
						</view>
						<view class="library_list_icon" v-show="item.type === '路由器'">
							<image src="/static/images/library_icon/router.png" mode="widthFix"></image>
						</view>
						<view class="library_list_icon" v-show="item.type === '手机'">
							<image src="/static/images/library_icon/mobile.png" mode="widthFix"></image>
						</view>
						<view class="library_list_icon" v-show="item.type === '显示器'">
							<image src="/static/images/library_icon/monitor.png" mode="widthFix"></image>
						</view>
						<view class="library_list_icon" v-show="item.type === '鼠标/键盘'">
							<image src="/static/images/library_icon/mouse.png" mode="widthFix"></image>
						</view>
						<view class="library_list_icon" v-show="item.type === '打印机'">
							<image src="/static/images/library_icon/printer.png" mode="widthFix"></image>
						</view>
						<view class="library_list_icon" v-show="item.type === '交换机'">
							<image src="/static/images/library_icon/switch.png" mode="widthFix"></image>
						</view>
						<view class="library_list_icon" v-show="item.type === '其它'">
							<image src="/static/images/library_icon/others.png" mode="widthFix"></image>
						</view>
						<view class="library_list_line"></view>
						<view class="library_list_text">
							<text class="library_list_title">{{item.title}}</text>
							<text class="library_list_subtitle">{{item.description}}</text>
							<view class="library_list_info">
								<text class="library_list_time">{{item.created_time}}</text>
								<text class="library_list_author">{{item.author}}</text>
							</view>
						</view>
					</view>
					<template #right>
						<view class="library_action">
							<view 
								class="library_button"
								@click="deleteLibraryListData(item.created_id)"
							>
								删除
							</view>
						</view>
					</template>
				</wd-swipe-action>
			</block>
		</view>
	</view>
</template>

<script setup>
	import { requestMethods } from '@/request/request'
	import Navigation from '@/components/navigation_header.vue'
	import { onMounted, nextTick, ref } from "vue"
	import dayjs from 'dayjs'
	import { useToast } from '@/uni_modules/wot-design-uni'
	import { onPullDownRefresh } from '@dcloudio/uni-app'
	
	const libraryData = ref([])
	const isLoading = ref(true)
	const toast = useToast()
	
	// 获取知识库列表
	onMounted(() => {
		nextTick(() => {
			getLibraryListData()
		})
	})
	
	onPullDownRefresh(() => {
		getLibraryListData()
	})
	
	const getLibraryListData = async () => {
		let res = await requestMethods('/Library', 'GET')
		if(res.code === 200) {
			libraryData.value = res.data
			libraryData.value.forEach(item => {
				item.created_time = dayjs(item.created_time).format('YYYY-MM-DD')
			})
			isLoading.value = false
			uni.stopPullDownRefresh()
		}else {
			toast.error('获取数据失败')
			isLoading.value = false
			uni.stopPullDownRefresh()
		}
	}
	
	// 删除知识库
	const deleteLibraryListData = async () => {
		let res = await requestMethods('/deleteLibrary', 'POST', {
			
		})
	}
	
	const goToCreateLibrary = () => {
		uni.navigateTo({
			url: '/pages/createLibrary/createLibrary'
		})
	}
	
	const goToLibraryDetails = (lId) => {
		uni.navigateTo({
			url: `/pages/libraryDetails/libraryDetails?libraryId=${lId}`
		})
	}

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
			
			.library_loading {
				display: flex;
				padding-top: 200rpx;
				justify-content: center;
				align-items: center;
			}

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
							margin-top: 10rpx;
							align-items: center;
							vertical-align: middle;

							.library_list_time {
								font-size: 24rpx;
								color: #555;
								margin-right: 40rpx;
							}

							.library_list_author {
								font-size: 24rpx;
								color: #555;
								width: 200rpx;
								margin-top: -1px;
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