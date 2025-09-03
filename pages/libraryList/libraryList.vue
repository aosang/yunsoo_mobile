<template>
	<Navigation />
	<wd-toast />
	<!-- 筛选弹出框 -->
	<wd-action-sheet 
		v-model="filterShow" 
		:z-index="1000"
	>
		<view class="action_title">
			<view class="action_title_item">
				<wd-search 
					placeholder="关键字搜索" 
					hide-cancel 
					v-model="filterKey"
					custom-input-class="searchInput"
					custom-class="searchInputBox"
					 @change="getFilterKeyValue"
				/>
			</view>
			<view class="action_title_item">
				<view class="action_text">发布人</view>
				<wd-radio-group
					v-model="filterCreator" 
					cell 
					inline
					shape="button"
					@change="getFilterCreatorValue"
				>
				  <wd-radio value="1">全部</wd-radio>
				  <wd-radio value="2">只看自己</wd-radio>
				</wd-radio-group>
			</view>
			<view class="action_title_item">
				<view class="action_text">发布时间</view>
				<wd-radio-group
					v-model="filterTime" 
					cell 
					inline
					shape="button"
					@change="getFilterTimeValue"
				>
				  <wd-radio value="1">今天</wd-radio>
				  <wd-radio value="2">本周</wd-radio>
					<wd-radio value="3">本月</wd-radio>
					<wd-radio value="4">今年</wd-radio>
				</wd-radio-group>
			</view>
			
			<view class="action_title_item">
				<view class="action_text">发布类型</view>
				<wd-radio-group
					v-model="libraryTypeValue" 
					cell 
					shape="button"
					@change="getSelectTypeValue"
				>
					<wd-radio 
						v-for="item in libraryType" 
						:key="item.product_id"
						:value="item.value"
						checked-color="#2a6fff"
					>
						{{item.value}}
					</wd-radio>
				</wd-radio-group>
			</view>
			<!-- 按钮 -->
			<view class="action_button">
				<wd-button 
					type="info"
					custom-class="action_button_item"
					@click="closeFilterShow"
				>
					取消
				</wd-button>
				<wd-button 
					custom-class="action_button_item"
					type="warning"
					@click="resetFilterSearch"
				>
					重置
				</wd-button>
				<wd-button 
					custom-class="action_button_item"
					@click="getFilterLibraryData"
				>
					确认
				</wd-button>
			</view>
		</view>
	</wd-action-sheet>
	<wd-message-box :zIndex="1000" />
	<view class="library_list">
		<wd-navbar 
			title="知识库" 
			fixed 
			custom-class="custom" 
			custom-style="color: #fff" 
			@click-left="goToBackEvent"
		>
			<template #left v-if="isSuccess === '1'">
			  <wd-icon name="home" size="22" />
			</template>
			<template #left v-else>
			  <wd-icon name="arrow-left" size="24"></wd-icon>
				<text>返回</text>
			</template>
			<!-- 右侧栏 -->
			<template #right>
				<wd-icon 
					name="add" 
					size="18"
					@click="goToCreateLibrary(isSuccess)"
				>
				</wd-icon>
				<view class="right_line"></view>
				<wd-icon 
					name="search" 
					size="18"
					@click="filterLibraryListData"
				>
				</wd-icon>
			</template>
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
						<view class="library_list_icon" v-show="item.type === '键盘/鼠标'">
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
	import { useToast, useMessage } from '@/uni_modules/wot-design-uni'
	import { onPullDownRefresh, onLoad } from '@dcloudio/uni-app'
	const message = useMessage()
	const toast = useToast()
	import { userInfoStore } from '@/stores/userInfo'
	const userStore = userInfoStore()
	
	const libraryData = ref([])
	const libraryType = ref([])
	const isLoading = ref(true)
	const isSuccess = ref(null)
	const filterShow = ref(false)
	
	// 筛选
	const filterCreator = ref('')
	const filterTime = ref('')
	const filterKey = ref('')
	const libraryTypeValue = ref('')
	const filterCreatorText = ref('')
	
	onLoad((option) => {
		option.success? isSuccess.value = option.success : option.success = null
	})
	
	// 获取知识库列表
	onMounted(() => {
		uni.$on('refreshData', () => {
			getLibraryListData()
		})
		nextTick(() => {
			getLibraryListData()
			getLibraryTypeSelectData()
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
	const deleteLibraryListData = (id) => {
		message.confirm({
			title: '提示',
			msg: '要删除这个知识库吗',
		})
		.then(async () => {
			let res = await requestMethods('/deleteLibrary', 'POST', {
				libraryId: id
			})
			if(res.code === 200) {
				toast.show({
					msg: '知识库已删除',
					duration: 800,
					iconName: 'success',
					closed: () => {
						getLibraryListData()
					}
				})
			}else {
				toast.error('删除失败')
			}
		})
		.catch(() => {
			// console.log('取消')
		})
	}
	
	const goToCreateLibrary = () => {
		uni.navigateTo({
			url: '/pages/createLibrary/createSetting'
		})
	}
	
	const getLibraryTypeSelectData = async () => {
		try {
			let res = await requestMethods('/getLibraryType', 'GET')
			if (res && res.data) {
				libraryType.value = res.data
			}
		} catch (error) {
			console.error('获取知识库类型失败:', error)
			toast.error('获取知识库类型失败')
		}
	}
	
	// 筛选
	const filterLibraryListData = () => {
		filterShow.value = true
		getLibraryTypeSelectData()
	}
	
	const resetFilterSearch = () => {
		filterCreator.value = ''
		filterTime.value = ''
		libraryTypeValue.value = ''
		filterKey.value = ''
	}
	
	// 获取发布者
	const getFilterCreatorValue = (e) => {
		filterCreator.value = e.value || ''
		if(e.value === 1) {
			filterCreatorText.value = ''
		}else {
			filterCreatorText.value = userStore.userName
		}
	}
	
	// 获取时间
	const getFilterTimeValue = (e) => {
		filterTime.value = e.value || ''
	}
	
	// 获取类型
	const getSelectTypeValue = (e) => {
		libraryTypeValue.value = e.value || ''
	}
	
	// 获取关键字
	const getFilterKeyValue = (e) => {
		filterKey.value = e.value || ''
	}
	
	// 筛选数据
	const getFilterLibraryData = async () => {
		filterShow.value = true
		let res = await requestMethods('/searchLibrary', 'POST', {
			searchAuthor: filterCreatorText.value || '',
			searchTime: filterTime.value ||  '',
			searchType: libraryTypeValue.value || '',
			searchKeyword: filterKey.value || ''
		})
		filterShow.value = false
		try {
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
		}catch(err) {
			console.log(err);
		}
	}
		
	const closeFilterShow = () => {
		filterShow.value = false
	}
	
	const goToLibraryDetails = (lId) => {
		uni.navigateTo({
			url: `/pages/libraryDetails/libraryDetails?libraryId=${lId}`
		})
	}

	const goToBackEvent = () => {
		if(isSuccess) {
			uni.switchTab({
				url: '/pages/index/index',
			})
		}else {
			uni.navigateBack()
		}
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
		
		.right_line {
			width: 2rpx;
			height: 32rpx;
			background: #fff;
			margin: 0 20rpx;
		}

		.library_box {
			width: 700rpx;
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
	
	.action_title {
		width: 100%;
		padding-top: 16rpx;
		.action_title_item {
			width: 100%;
			margin-bottom: 8rpx;
			
			:deep() {
				.searchInput {
					height: 72rpx;
				}
			}
			
			.action_text {
				padding: 0 30rpx;
				height: 80rpx;
				line-height: 80rpx;
				box-sizing: border-box;
				color: #555;
				font-size: 30rpx;
				font-weight: 650;
				border-bottom: 2rpx solid #eee;
			}
		}
		
		.action_button {
			width: 100%;
			height: 110rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-top: 2rpx solid #ccc;
			:deep() {
				.action_button_item {
					width: 80rpx !important;
					margin: 0 10rpx;
				}
			}
		}
	}
	
</style>