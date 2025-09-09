<template>
	<Navigation />
	<wd-toast />
	<wd-message-box :zIndex="1000" />
	<view class="workorder_list">
		<wd-navbar 
			title="我的工单" 
			fixed 
			custom-class="custom" 
			right-text="添加"
			@click-right="goToCreateWorkorder"
			:zIndex="10"
		>
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
			@click="changeGetWorkorderList"
		>
			<block v-for="item in tabText" :key="item.id">
				<wd-tab :title="item.text">
					<view class="workorder_box">
						<view class="empty_data" v-if="!isLoading && workOrderListData.length === 0">
							<wd-status-tip image="content" tip="暂无工单" />
						</view>
						<wd-swipe-action
							v-if="!isLoading && workOrderListData.length !== 0"
							class="workorder_item"
							v-for="item in workOrderListData"
							:key="item.created_id"
						>
							<view 
								class="workorder_list_item"
								@click="goToWorkorderDetails(item.created_id)"
							>
								<view 
									class="device_status" 
									:class="item.created_status === '已解决'? 'device_finish' : ''"
									v-if="item.created_status === '已解决'"
								>
									已解决
								</view>
								<view
									class="device_status" 
									:class="item.created_status === '待处理'? 'device_wait' : ''"
									v-if="item.created_status === '待处理'"
								>
									待处理
								</view>
								<view
									class="device_status" 
									:class="item.created_status === '处理中'? 'device_process' : ''"
									v-if="item.created_status === '处理中'"
								>
									处理中
								</view>
								<view class="device_box">
									<text class="device_box_title">设备名称：</text>
									<text class="device_box_text">{{item.created_product}}</text>
								</view>
								<view class="device_box">
									<text class="device_box_title">设备类型：</text>
									<text class="device_box_text">{{item.created_type}}</text>
								</view>
								<view class="device_box">
									<text class="device_box_title">设备品牌：</text>
									<text class="device_box_text">{{item.created_brand}}</text>
								</view>
								<view class="device_box">
									<text class="device_box_title">更新时间：</text>
									<text class="device_box_text">{{item.created_update}}</text>
								</view>
								<view class="device_box">
									<text class="device_box_title">问题描述：</text>
									<text class="device_box_text">{{item.created_text}}</text>
								</view>
							</view>
							<template #right>
								<view class="device_action">
									<view 
										class="device_button" 
										@click="deleteWorkorderData(item.created_id)"
									>
										删除
									</view>
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
	import { nextTick, onMounted, reactive, ref, watch } from 'vue';
	import { onPullDownRefresh } from '@dcloudio/uni-app'
	import { requestMethods } from '@/request/request.js'
	import { useToast, useMessage } from '@/uni_modules/wot-design-uni'
	const toast = useToast()
	const message = useMessage()
	import { userInfoStore } from '@/stores/userInfo';
	const userStore = userInfoStore()

	const tabNum = ref(0)
	const isLoading = ref(true)
	
	const workOrderListData = ref([])
	let userId = ref('')
	const tabText = reactive([{
		id: 1,
		text: '全部'
	}, {
		id: 2,
		text: '已解决'
	}, {
		id: 3,
		text: '处理中'
	}, {
		id: 4,
		text: '待处理'
	}])
	
	onMounted(() => {
		// 新增工单成功后自动刷新数据
		uni.$on('refreshData', () => {
			getWorkorderData(userStore.userId ,tabNum.value)
		})
		nextTick(() => {
			getWorkorderData(userStore.userId ,tabNum.value)
		})		
	})
	
	onPullDownRefresh(() => {
		getWorkorderData(userStore.userId ,tabNum.value)
	})
	
	const changeGetWorkorderList = () => {
		if(!isLoading.value) {
			getWorkorderData(userStore.userId, tabNum.value)
		}
	}
	
	const getWorkorderData = async (id, num) => {
		let res = await requestMethods('/GetWorkorder', 'GET', {
			userId: id,
			tabId: num
		})
		if(res.code === 200) {
			workOrderListData.value = res.data || []
			isLoading.value = false
			uni.stopPullDownRefresh()
		}else {
			toast.error('获取数据失败')
			isLoading.value = false
			uni.stopPullDownRefresh()
		}
	}
	
	// 跳转工单详情页
	const goToWorkorderDetails = (id) => {
		uni.navigateTo({
			url: `/pages/workorderDetails/workorderDetails?workId=${id}`
		})
	}
	
	// 删除工单
	const deleteWorkorderData = (id) => {
		message.confirm({
			title: '提示',
			msg: '确认要删除此工单吗',
		})
		.then(async () => {
			let res = await requestMethods('/DeleteWorkorder', 'POST', {
				delId: id
			})
			if(res.code === 200) {
				toast.show({
					msg: '工单已删除',
					duration: 800,
					iconName: 'success',
					closed: () => {
						getWorkorderData(userStore.userId, tabNum.value)
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
	
	const goToCreateWorkorder = () => {
		uni.navigateTo({
			url: '/pages/createWorkorder/createWorkorder'
		})
	}	
</script>

<style lang="scss">
	.workorder_tab {
		:deep() {
			.custom-tabs {
				margin-top: 128rpx;
			}
		}
		
		.workorder_loading {
			display: flex;
			padding-top: 200rpx;
			justify-content: center;
			align-items: center;
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
				// background: #34d19d;
				// background: #fa4350;
				// background: #f0883a;
				font-size: 28rpx;
				color: #fff;
				border-radius: 4rpx;
				text-align: center;
			}
			
			.device_wait {
				background: #f0883a;
			}
			
			.device_finish {
				background: #34d19d;
			}
			
			.device_process {
				background: #fa4350;
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