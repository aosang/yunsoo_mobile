<template>
	<Navigation />
	<wd-toast />
	<view class="create_device">
		<wd-navbar
			title="新增设备"
			fixed
			custom-class="custom"
			custom-style="color: #fff"
			left-arrow
			left-text="返回"
			right-text="确认"
			@click-left="backToDeviceList"
			@click-right="createDeviceSubmit"
		>
		</wd-navbar>
		<view class="createDevice_form">
			<wd-notice-bar
				text="除备注信息外，其它均为必填项。设备数量大于0且不能为小数，设备价格大于0。" 
				prefix="warn-bold"
				:scrollable="false"
				class="notice-bar"
				wrapable 
			>
			</wd-notice-bar>
			<wd-divider class="device_user">
				<view style="display: block">{{ deviceForm.device_user }}</view>
			</wd-divider>
			<view class="createDevice_form_item">
				<wd-input
					v-model="deviceForm.device_name"
					placeholder="填写设备名称"
					custom-input-class="device_name"
					custom-class="device_input"
					placeholderClass="device_placeholder"
					clearable
					:maxlength="50"
					show-word-limit
					no-border
				>
				</wd-input>
			</view>
			<view class="createDevice_form_item">
				<wd-input
					v-model="deviceForm.device_price"
					placeholder="设备单价(CNY)"
					custom-input-class="device_name"
					custom-class="device_input"
					placeholderClass="device_placeholder"
					clearable
					type="digit"
					no-border
				>
				</wd-input>
			</view>
			<view class="createDevice_form_item">
				<wd-input
					v-model="deviceForm.device_number"
					placeholder="设备数量"
					custom-input-class="device_name"
					custom-class="device_input"
					placeholderClass="device_placeholder"
					clearable
					type="digit"
					no-border
				>
				</wd-input>
			</view>
			<view class="createDevice_form_item createDevice_form_items">
				<wd-select-picker
					v-model="deviceForm.device_type"
					placeholder="选择设备类型"
					type="radio"
					:columns="deviceType"
					label-key="value"
					value-key="value"
					clearable
					@confirm="selectDeviceType"
					@clear="clearTypeData"
				>
				</wd-select-picker>
			</view>
			<view class="createDevice_form_item createDevice_form_items" v-show="isBrand">
				<wd-select-picker
					v-model="deviceForm.device_brand"
					placeholder="选择设备品牌"
					type="radio"
					:columns="deviceBrand"
					label-key="value"
					value-key="value"
					clearable
					@confirm="selectDeviceBrand"
				>
				</wd-select-picker>
			</view>
			<view class="device_textarea">
				<view class="device_textarea_label">备注信息</view>
				<wd-textarea
					:adjust-position="false"
					:maxlength="120"
					v-model="deviceForm.device_remark"
					placeholder="填写备注"
					custom-textarea-class="custom-desc"
					clearable 
					show-word-limit
					placeholderClass="device_text"
				/>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { reactive, ref, onMounted, nextTick } from 'vue';
	import Navigation from '@/components/navigation_header.vue'
	import { useToast } from '@/uni_modules/wot-design-uni'
	const toast = useToast()
	import { requestMethods } from '@/request/request'
	import { getTimenumber } from '@/request/formatTime'
	import { userInfoStore } from '@/stores/userInfo'
	const userStore = userInfoStore()
	
	const deviceType = ref([])
	const deviceBrand = ref([])
	const isBrand = ref(false)
	const deviceForm = reactive({
		device_time: '',
		device_update: '',
		device_user: '',
		device_name: '',
		device_type: '',
		device_brand: '',
		device_price: '',
		device_number: '',
		device_remark: '',
		device_logo: '',
	})
	
	onMounted(() => {
		deviceForm.device_user = userStore.userName || ''
		nextTick(() => {
			getDeviceTypeData()
		})
	})
	
	// 获取设备类型
	const getDeviceTypeData = async () => {
		let res = await requestMethods('/DeviceType', 'GET')
		if(res.code === 200) {
			deviceType.value = res.data
		}else {
			toast.error('获取数据失败')
		}
	}
	
	const clearTypeData = () => {
		isBrand.value = false
	}
	
	const selectDeviceType = async (e) => {
		let res = await requestMethods('/DeviceBrand', 'GET', {
			deviceTypeText: e.selectedItems.key
		})
		if(res.code === 200) {
			isBrand.value = true
			deviceBrand.value = res.data[0].product_brand_cn
		}else {
			toast.error('获取数据失败')
		}
	}
	
	const selectDeviceBrand = async (e) => {
		deviceForm.device_brand = e.value
		deviceForm.device_logo = e.selectedItems.logo_url
	}
	
	const createDeviceSubmit = async () => {
		let { device_name, device_type, device_brand, device_price, device_number } = deviceForm
		deviceForm.device_time = getTimenumber()[1]
		deviceForm.device_update = getTimenumber()[1]
		let deviceNum = /^[1-9]\d*$/
		let devicePrice = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
		if(!device_name) {
			toast.error('请填写正确的设备名称')
		}else if(!devicePrice.test(device_price) || !device_price) {
			toast.error('请填写正确的价格')
		}else if(!deviceNum.test(device_price) || !device_number) {
			toast.error('请填写正确的设备数量')
		}else if(!device_type) {
			toast.error('请选择设备类型')
		}else if(!device_brand) {
			toast.error('请选择设备品牌')
		}else{
			let res = await requestMethods('/AddDevice', 'POST', deviceForm)
			if(res.code === 200) {
				toast.show({
					iconName: 'success',
					msg: '新增设备成功',
					duration: 800,
					closed: () => {
						uni.switchTab({
							url: '/pages/device/device' 
						})
						uni.$emit('refreshData')
					}
				})
			}else {
				toast.error('新增设备失败')
				console.log(res)
			}
		}
	}
	
	const backToDeviceList = () => {
		uni.navigateBack()
	}
</script>

<style lang="scss">
	html, body {
		background: #f3f3f3;
	}
	
	.create_device {
		width: 100%;
		:deep() {
			.custom {
				background-color: #2a6fff;
				margin-top: 88rpx;
			}
		}
		
		.createDevice_form {
			width: 100%;
			margin-top: 180rpx;
			
			.notice-bar {
				font-size: 26rpx;
			}
			
			.device_user {
				font-size: 32rpx;
				font-weight: 600;
				color: #2a6fff;
				background: #fff;
				height: 96rpx;
				margin: 0 0 20rpx 0;
			}
			
			.createDevice_form_item {
				background: #fff;
				margin-bottom: 4rpx;
				padding: 0 28rpx;
				box-sizing: border-box;
				height: 86rpx;
				line-height: 86rpx;
				font-size: 28rpx;
				color: #555;
				
				.device_unit {
					color: #555;
					font-size: 30rpx;
				}
				
				:deep() {
					.device_name {
						width: 100%;
						height: 86rpx !important;
					}
				}
				
				.device_placeholder {
					color: #c3c3c3;
				}
			}
			.createDevice_form_items {
				padding: 0;
			}
		}
	}
	
	.device_textarea {
		margin-top: 24rpx;
		background: #fff;
		
		.device_textarea_label {
			padding: 28rpx 28rpx 0 28rpx;
			color: #333;
			font-size: 28rpx;
		}
		:deep() {
			.custom-desc {
				max-height: 140rpx;
				box-sizing: border-box;
				font-size: 28rpx;
			}
		}
		
		.device_text {
			color: #c3c3c3;
		}
	}
</style>
