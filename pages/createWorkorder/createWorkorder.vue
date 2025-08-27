<template>
	<Navigation />
	<wd-toast />
	<view class="create_workorder">
		<wd-navbar
			title="创建工单" 
			fixed 
			custom-class="custom"
			left-arrow
			left-text="返回"
			right-text="提交"
			custom-style="color: #fff"
			@click-left="backToWorkorderList"
			@click-right="createWorkorderSubmit"
		>
		</wd-navbar>
	</view>
	
	<view class="workorder_form">
		<wd-notice-bar 
			text="除备注信息外，其它均为必填项" 
			prefix="warn-bold"
			:scrollable="false"
			class="notice-bar"
		>
		</wd-notice-bar>
		<wd-divider class="workorder_name">
			<view style="display: block;">{{userStore.userName || '--'}}</view>
		</wd-divider>
		<view class="workorder_form_item">
			<wd-select-picker
				label="选择设备" 
				v-model="workorderForm.created_product" 
				:columns="workorderDevice"
				:z-index="1000"
				type="radio" 
				label-key="value"
				value-key="value"
				custom-class="custom_select"
				custom-label-class="custom_label"
				custom-value-class="custom_value"
				custom-content-class="custom_content"
				placeholder="请选择设备"
				clearable
				@confirm="confirmSelectDevice"
			>
			</wd-select-picker>
		</view>
		<view class="workorder_form_item" v-if="workorderForm.created_product">
			<view class="workorder_form_time">
				<view>设备类型</view>
				<view class="workorder_form_value">{{ workorderForm.created_type }}</view>
			</view>
		</view>
		<view class="workorder_form_item" v-if="workorderForm.created_product">
			<view class="workorder_form_time">
				<view>设备品牌</view>
				<view class="workorder_form_value">{{ workorderForm.created_brand }}</view>
			</view>
		</view>
		<view class="workorder_form_item">
			<wd-select-picker
				label="当前状态" 
				v-model="workorderForm.created_status" 
				:columns="workorderStatus" 
				:z-index="1000"
				type="radio" 
				label-key="value"
				value-key="value"
				custom-class="custom_select"
				custom-label-class="custom_label"
				custom-value-class="custom_value"
				custom-content-class="custom_content"
				placeholder="请选择当前状态"
				clearable
				@confirm="confirmSelectStatus"
			>
			</wd-select-picker>
		</view>
		<view class="workorder_form_item">
			<view class="workorder_form_time">
				<view>创建时间</view>
				<view class="workorder_form_value">{{ workorderForm.created_time }}</view>
			</view>
		</view>
		<view class="workorder_form_item">
			<view class="workorder_form_time">
				<view>更新时间</view>
				<view class="workorder_form_value">{{ workorderForm.created_update }}</view>
			</view>
		</view>
	</view>
	<!-- 问题描述 -->
	<view class="created_textarea">
		<view class="created_textarea_label">问题描述</view>
		<wd-textarea
			:adjust-position="false"
			:maxlength="260"
			v-model="workorderForm.created_text"
			placeholder="填写问题描述"
			custom-textarea-class="custom-desc"
			clearable 
			show-word-limit
		/>
	</view>
	<!-- 解决方案 -->
	<view class="created_textarea" v-if="workorderForm.created_status === '已解决'">
		<view class="created_textarea_label">解决方案</view>
		<wd-textarea
			:adjust-position="false"
			:maxlength="260"
			v-model="workorderForm.created_solved"
			placeholder="填写解决方案"
			custom-textarea-class="custom-desc"
			clearable 
			show-word-limit
		/>
	</view>
	<!-- 备注 -->
	<view class="created_textarea">
		<view class="created_textarea_label">备注信息</view>
		<wd-textarea
			:adjust-position="false"
			:maxlength="120"
			v-model="workorderForm.created_remark"
			placeholder="填写备注"
			custom-textarea-class="custom-desc"
			clearable 
			show-word-limit
		/>
	</view>
	<view 
		class="whiteBox" 
		style="height: 500rpx;"
	>
	</view>
</template>

<script setup lang="ts">
	import Navigation from '@/components/navigation_header.vue'
	import { useToast } from '@/uni_modules/wot-design-uni'
	const toast = useToast()
	import { ref, onMounted, nextTick, reactive } from 'vue'
	import { requestMethods } from '@/request/request'
	import { workOrderFormProps } from '@/utils/dataType.js'
	import { userInfoStore } from "@/stores/userInfo"
	const userStore = userInfoStore()
	import dayjs from 'dayjs'
	import { formatTime, getTimenumber } from '@/request/formatTime'
	
	onMounted(() => {
		workorderForm.id = userStore.userId
		workorderForm.created_name = userStore.userName
		workorderForm.created_time = formatTime()
		workorderForm.created_update = formatTime()
		workorderForm.created_id = getTimenumber()[0]
			
		nextTick(() => {
			getWorkorderDevice()
			getWorkorderStatus()
		})
	})
	
	const backToWorkorderList = () => {
		uni.navigateBack()
	}
	
	const createWorkorderSubmit = () => {
		const {created_product, created_solved, created_status, created_text} = workorderForm
		if(!created_product || !created_status || !created_text) {
			toast.error('请填写完整信息')
		}else if(created_status === '已解决' && !created_solved) {
			toast.error('请填写完整信息')
		}
		else {
			addWorkorderform()
		}
	}
	
	const workorderForm = reactive<workOrderFormProps>({
		id: '',
		created_id: '',
		created_product:'',
		created_name: '',
		created_time: '',
		created_update: '',
		created_solved: '',
		created_type: '',
		created_brand: '',
		created_status:'',
		created_text:'',
		created_remark:''
	})
	const workorderDevice = ref<Record<string, any>>([])
	const workorderStatus = ref<Record<string, any>>([])
	const device = ref<string>('')
	const createTime = ref<string>('2025-07-25 16:35')
	const isScroll = ref<boolean>(false)
	
	const confirmSelectDevice = (event: any) => {
		workorderForm.created_product = event.selectedItems.product_name
		workorderForm.created_type = event.selectedItems.product_type
		workorderForm.created_brand = event.selectedItems.product_brand
	}
	
	const confirmSelectStatus = (event: any) => {
		workorderForm.created_status = event.value
	}
	
	const getWorkorderDevice = async () => {
		let res = await requestMethods('/GetDevice', 'GET')
		workorderDevice.value = res.data
	}
	
	const getWorkorderStatus = async () => {
		let res = await requestMethods('/GetStatus', 'GET')
		workorderStatus.value = res.data
	}
	
	// 新增工单
	const addWorkorderform = async () => {
		let res = await requestMethods('/AddWorkorder', 'POST', workorderForm)
		if(res.code === 200) {
			toast.show({
				iconName: 'success',
				msg: '新增工单成功',
				duration: 800,
				closed: () => {
					uni.switchTab({
						url: '/pages/workorder/workorder' 
					})
					uni.$emit('refreshData')
				}
			})
		}else {
			toast.error('新增工单失败')
			console.log(res)
		}
	}

</script>

<style lang="scss" >
html, body {
	height: 100vh;
	background: #f3f3f3;
}

.create_workorder {
	width: 100%;
	:deep() {
		.custom {
			background-color: #2a6fff;
			margin-top: 88rpx;
		}
	}
}

.workorder_form {
	background: #fff;
	padding-top: 190rpx;
	
	.notice-bar {
		font-size: 28rpx;
	}
	
	:deep() {
		.custom_label {
			font-size: 28rpx;
			margin-top: 4rpx;
		}
		.custom_value {
			font-size: 28rpx;
			margin-top: 4rpx;
		}
		.custom_select {
			height: 90rpx;
			border-bottom: 1px solid #eee;
		}
	}
	
	.workorder_name {
		font-size: 32rpx;
		font-weight: 600;
		color: #2a6fff;
	}
	
	.workorder_form_time {
		height: 90rpx;
		font-size: 28rpx;
		color: #333;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		border-bottom: 1px solid #eee;
		
		.workorder_form_value {
			margin-left: 138rpx;
		}
	}
}

.created_textarea {
	margin-top: 24rpx;
	background: #fff;
	
	.created_textarea_label {
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
}
</style>
