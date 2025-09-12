<template>
	<Navigation />
	<view class="device_details">
		<wd-navbar
			title="设备详情" 
			fixed
			left-arrow
			left-text="返回"
			custom-class="custom" 
			:zIndex="10"
			@click-left="backToDeviceList"
		>
		</wd-navbar>
		<view class="device_box">
			<view class="device_box_item">
				<wd-cell-group :title="deviceName" border>
				  <wd-cell title="设备类型" :value="deviceType"></wd-cell>
				  <wd-cell title="设备品牌">
						<view class="deviceBrandImage">
							<image :src="deviceLogo" mode="widthFix" />
							<view>{{deviceBrand}}</view>
						</view>
					</wd-cell>
					<wd-cell title="设备单价" :value="deviceUnit"></wd-cell>
					<wd-cell title="设备数量" :value="deviceNum"></wd-cell>
					<wd-cell title="设备总价" :value="deviceNum"></wd-cell>
				</wd-cell-group>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted, nextTick } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import Navigation from '@/components/navigation_header.vue'
	import { requestMethods } from '@/request/request'
	import { useToast } from '@/uni_modules/wot-design-uni'
	const toast = useToast()

	const deviceId = ref('')
	const deviceName = ref('')
	const deviceType = ref('')
	const deviceBrand = ref('')
	const deviceTime = ref('')
	const deviceNum = ref('')
	const deviceUnit = ref('')
	const deviceTotal = ref('')
	const deviceLogo = ref('')
	
	
	
	onLoad(option => {
		deviceId.value = option.detailsId || ''
	})
	
	onMounted(() => {
		nextTick(() => {
			getDeviceDetailsData(deviceId.value)
		})
	})
	
	const getDeviceDetailsData = async (id) => {
		let res= await requestMethods('/GetDeviceDetail', 'POST', {
			deviceId: id
		})
		if(res.code === 200) {
			deviceName.value = res.data[0].product_name || ''
			deviceType.value = res.data[0].product_type || ''
			deviceBrand.value = res.data[0].product_brand || ''
			deviceLogo.value = res.data[0].product_logo || ''
			deviceNum.value = res.data[0].product_number || ''
			deviceUnit.value = res.data[0].product_unitprice
		}else {
			toast.error('获取数据失败')
			console.log(res.data)
		}
	}
	
	const backToDeviceList = () => {
		uni.navigateBack()
	}
</script>

<style lang="scss">
html, body {
	height: 100vh;
	background: #f3f3f3;
}
	
.device_details {
	width: 100%;
	:deep() {
		.custom {
			background-color: #2a6fff;
			margin-top: 88rpx;
		}
	}
}

.device_box {
	margin-top: 180rpx;
	
	.deviceBrandImage {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		image {
			display: block;
			width: 60rpx;
		}
	}
}
</style>
