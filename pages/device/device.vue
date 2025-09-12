<template>
	<Navigation />
	<wd-toast />
	<wd-message-box />
	<view class="device_list">
		<wd-navbar
			title="设备管理" 
			fixed 
			custom-class="custom"
			custom-style="color: #fff"
			:zIndex="10"
		>
			<!-- 右侧栏 -->
			<template #right>
				<wd-icon
					name="add" 
					size="18"
					@click="submitDeviceFormEvent"
				>
				</wd-icon>
				<view class="right_line"></view>
				<wd-icon 
					name="search" 
					size="18"
				>
				</wd-icon>
			</template>
		</wd-navbar>
	</view>
	<view class="device_box">
		<view class="device_loading" v-if="isLoading">
			<wd-loading v-if="isLoading" />
		</view>
		
		<view class="empty_data" v-if="!isLoading && deviceData.length === 0" >
			<wd-status-tip image="content" tip="暂无IT设备" />
		</view>
		<block 
			v-for="device in deviceData" 
			:key="device.id" v-else
		>
			<wd-swipe-action
				v-model="isAction"
				class="device_box_item"
				@click="siwperClickEvent($event, device.id)"
			>
				<wd-card 
					type="rectangle" 
					custom-class="device_card"
					custom-title-class="device_title"
					custom-content-class="device_content"
					@click="goToDeviceDetails(device.id)"
				>
					<template #title>
						<view class="device_top">
							<view class="device_top_time">
								创建时间：{{device.product_time}}
							</view>
							<view class="device_top_brand">
								<image 
									:src="device.product_logo || 'https://www.wangle.run/company_icon/public_image/assets_logo_transation.png'" 
									mode="widthFix" 
								/>
								<view class="device_top_text">
									{{device.product_brand}}
								</view>
							</view>
						</view>
					</template>
					<view class="device_content_text">
						<view class="device_content_item">设备名称：{{device.product_name}}</view>
						<view class="device_content_item">设备类型：{{device.product_type}}</view>
					</view>
				</wd-card>
				<template #right>
					<view class="device_action">
						<view 
							class="device_button" 
							@click="deleteDevice(device.id)"
						>
							删除
						</view>
					</view>
				</template>
			</wd-swipe-action>
		</block>
	</view>
</template>

<script setup>
	import Navigation from '@/components/navigation_header.vue'
	import { onMounted, ref, nextTick } from 'vue'
	import { requestMethods } from '@/request/request'
	import { onPullDownRefresh } from '@dcloudio/uni-app'
	import dayjs from 'dayjs'
	import { useToast, useMessage } from '@/uni_modules/wot-design-uni'
	const toast = useToast()
	const message = useMessage()
	
	const deviceData = ref([])
	const isLoading = ref(true)
	const imgLogo = ref('')
	const isAction = ref('close')
	
	onMounted(() => {
		uni.$on('refreshData', () => {
			getDeviceListData()
		})
		
		nextTick(() => {
			getDeviceListData()
			getBrandData()
		})
	})
	
	onPullDownRefresh(() => {
		getDeviceListData()
	})
	
	const getDeviceListData = async () => {
		let res = await requestMethods('/Device', 'GET')
		if(res.code === 200) {
			deviceData.value = res.data
			isLoading.value = false
			uni.stopPullDownRefresh()
		}
	}
	
	const deleteDevice = async (delId) => {
		message.confirm({
			title: '提示',
			msg: '确认要删除此设备吗',
		})
		.then(async () => {
			let res = await requestMethods('/DeleteDevice', 'POST', {
				deviceId: delId
			})
			if(res.code === 200) {
				toast.show({
					msg: '设备已删除',
					duration: 800,
					iconName: 'success',
					closed: () => {
						getDeviceListData()
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
	
	const submitDeviceFormEvent = () => {
		uni.navigateTo({
			url: '/pages/device/createDevice',
		})
	}
	
	const siwperClickEvent = (event, id) => {
		if(event.value === 'inside') {
			return
		}else {
			deleteDevice(id)
		}
	}
	
	const goToDeviceDetails = (id) => {
		if(isAction.value === 'close') {
			uni.navigateTo({
				url: '/pages/device/deviceDetails?detailsId=' + id
			})
		}
	}
	
</script>

<style lang="scss">
html, body {
	background: #eee;
}

.right_line {
	width: 2rpx;
	height: 44rpx;
	background: rgba(255, 255, 255, 0.55);
	margin: 0 30rpx;
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
	
	.device_loading {
		display: flex;
		padding-top: 200rpx;
		justify-content: center;
		align-items: center;
	}
	
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
			width: 70rpx;
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
