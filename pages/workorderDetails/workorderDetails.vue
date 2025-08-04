<template>
	<Navigation/>
	<wd-toast />
	<view class="workorder_details">
		<wd-navbar
			title="工单详情" 
			fixed 
			custom-class="custom"
			left-arrow
			left-text="返回"
			right-text="确认更新"
			custom-style="color: #fff"
			@click-left="backToWorkorderList"
			@click-right="updateWorkorderData"
		>
		</wd-navbar>
	</view>
	<view class="workorder_details_form">
		<view class="workorder_form_item">
			<view class="workorder_form_time">
				<view>设备名称</view>
				<view class="workorder_form_value">{{workorderEditForm.created_product}}</view>
			</view>
		</view>
		<view class="workorder_form_item">
			<wd-select-picker
				label="当前状态" 
				v-model="workorderEditForm.created_status" 
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
				<view>设备类型</view>
				<view class="workorder_form_value">{{workorderEditForm.created_type}}</view>
			</view>
		</view>
		<view class="workorder_form_item">
			<view class="workorder_form_time">
				<view>设备品牌</view>
				<view class="workorder_form_value">{{workorderEditForm.created_brand}}</view>
			</view>
		</view>
		<view class="workorder_form_item">
			<view class="workorder_form_time">
				<view>创建时间</view>
				<view class="workorder_form_value">{{workorderEditForm.created_time}}</view>
			</view>
		</view>
		<view class="workorder_form_item">
			<view class="workorder_form_time">
				<view>更新时间</view>
				<view class="workorder_form_value">{{workorderEditForm.created_update}}</view>
			</view>
		</view>
	</view>
	<!-- 问题描述 -->
	<view class="created_textarea">
		<view class="created_textarea_label">问题描述</view>
		<wd-textarea
			:adjust-position="false"
			:maxlength="260"
			v-model="workorderEditForm.created_text"
			placeholder="填写问题描述"
			custom-textarea-class="custom-desc"
			clearable 
			show-word-limit
		/>
	</view>
	<view 
		class="created_textarea" 
		v-if="workorderEditForm.created_status === '已解决'"
	>
		<view class="created_textarea_label">解决方案</view>
		<wd-textarea
			:adjust-position="false"
			:maxlength="260"
			v-model="workorderEditForm.created_solved"
			placeholder="填写解决方案"
			custom-textarea-class="custom-desc"
			clearable 
			show-word-limit
		/>
	</view>
	<view class="created_textarea">
		<view class="created_textarea_label">备注信息</view>
		<wd-textarea
			:adjust-position="false"
			:maxlength="120"
			v-model="workorderEditForm.created_remark"
			placeholder="填写备注"
			custom-textarea-class="custom-desc"
			clearable 
			show-word-limit
		/>
	</view>

	<view
		class="whiteBox" 
		style="height: 500rpx;"
		v-show="isScroll"
	>
	</view>
</template>

<script setup lang="ts">
	import Navigation from '@/components/navigation_header.vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { requestMethods } from '@/request/request'
	import { reactive, ref, onMounted, nextTick, watch } from 'vue'
	import { useToast } from '@/uni_modules/wot-design-uni'
	const toast = useToast()
	import { formatTime } from '@/request/formatTime'
	
	const workorderStatus = ref<Record<string, any>> ([])
	const updateId = ref('')
	const isUpdate = ref<boolean>(false)
	const isScroll = ref<boolean>(false)
	const workorderEditForm = reactive({
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

	onLoad((options) => {
		getWorkorderDatailsData(options.workId)
		workorderEditForm.created_id = options.workId
	})
	
	onMounted(() => {
		nextTick(() => {
			getWorkorderStatus()
		})
	})
	
	const confirmSelectStatus = (event: any) => {
		workorderEditForm.created_status = event.value
		if(event.value !== '已解决') {
			workorderEditForm.created_solved = ''
		}
	}
	
	const handlerChange = (event: any) => {
		const height:number = event.height
		if(height > 0) {
			isScroll.value = true
			setTimeout(() => {
				uni.createSelectorQuery().select('.whiteBox').boundingClientRect((rect:any) => {
					uni.pageScrollTo({
						scrollTop: rect.top,
						duration: 50,
					})
				}).exec()
			}, 100)
		}else if( height === 0) {
			isScroll.value = false
			setTimeout(() => {
				uni.createSelectorQuery().select('.workorder_details_form').boundingClientRect((rect:any) => {
					uni.pageScrollTo({
						scrollTop: rect.top,
						duration: 50,
					})
				}).exec()
			}, 100)
		}
	}
	
	const getWorkorderStatus = async () => {
		let res = await requestMethods('/GetStatus', 'GET')
		workorderStatus.value = res.data
	}
	
	// 获取工单详情数据
	const getWorkorderDatailsData = async (id: string) => {
		let res = await requestMethods('/GetWorkorderDetail', 'GET', {
			workDetailId: id
		})
		if(res.code === 200) {
			workorderEditForm.created_product = res.data[0].created_product
			workorderEditForm.created_status = res.data[0].created_status
			workorderEditForm.created_type = res.data[0].created_type
			workorderEditForm.created_brand = res.data[0].created_brand
			workorderEditForm.created_time = res.data[0].created_time
			workorderEditForm.created_update = formatTime()
			workorderEditForm.created_text = res.data[0].created_text
			workorderEditForm.created_solved = res.data[0].created_solved
			workorderEditForm.created_remark = res.data[0].created_remark
			
			uni.setStorageSync('saveData', res.data[0])
		}else {
			toast.error('获取数据失败')
		}
	}
	
	const updateWorkorderData = async () => {
		const {created_text, created_solved, created_status} = workorderEditForm
		if(!created_text || !created_status) {
			toast.error('请填写完整信息')
		}else if(created_status === '已解决' && !created_solved) {
			toast.error('请填写完整信息')
		}else {
			if(checkUpdateValue()) {
				let res = await requestMethods('/UpdateWorkorder', 'POST', workorderEditForm)
				if(res.code === 200) {
					toast.show({
						iconName: 'success',
						msg: '更新成功',
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
		}
	}
	
	const checkUpdateValue = () => {
		let saveData = uni.getStorageSync('saveData')
		const {created_status, created_text, created_solved, created_remark} = workorderEditForm
		
		if(saveData.created_status === created_status && saveData.created_text === created_text && saveData.created_solved === created_solved && saveData.created_remark === created_remark) {
			toast.show('内容未修改，请修改后提交')
			return isUpdate.value = false
		}else {
			return isUpdate.value = true
		}
	}
	
	const backToWorkorderList = () => {
		uni.navigateBack({
			success: () => {
				workorderEditForm.created_remark = ''
			}
		})
	}
	
</script>

<style lang="scss">
html, body {
	height: 100vh;
	background: #f3f3f3;
}	
	
.workorder_details {
	width: 100%;
	:deep() {
		.custom {
			background-color: #2a6fff;
			margin-top: 88rpx;
		}
	}
}

.workorder_details_form {
	background: #fff;
	padding-top: 190rpx;
	
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
			font-size: 28rpx;
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
