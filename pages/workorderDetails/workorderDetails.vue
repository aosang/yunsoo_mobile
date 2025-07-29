<template>
	<Navigation/>
	<view class="workorder_details">
		<wd-navbar
			title="工单详情" 
			fixed 
			custom-class="custom"
			left-arrow
			left-text="返回"
			right-text="确认编辑"
			custom-style="color: #fff"
			@click-left="backToWorkorderList"
		>
		</wd-navbar>
	</view>
	<view class="workorder_details_form">
		<view class="workorder_form_item">
			<view class="workorder_form_time">
				<view>设备名称</view>
				<view class="workorder_form_value"></view>
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
				<view class="workorder_form_value"></view>
			</view>
		</view>
		<view class="workorder_form_item">
			<view class="workorder_form_time">
				<view>设备品牌</view>
				<view class="workorder_form_value"></view>
			</view>
		</view>
		<view class="workorder_form_item">
			<view class="workorder_form_time">
				<view>创建时间</view>
				<view class="workorder_form_value"></view>
			</view>
		</view>
		<view class="workorder_form_item">
			<view class="workorder_form_time">
				<view>更新时间</view>
				<view class="workorder_form_value"></view>
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
</template>

<script setup lang="ts">
	import Navigation from '@/components/navigation_header.vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { requestMethods } from '@/request/request'
	import { reactive, ref } from 'vue'
	
	const workorderStatus = ref<Record<string, any>> ([])
	const workorderEditForm = reactive({
		created_status: '',
		created_text: ''
	})

	onLoad((options) => {
		getWorkorderDatailsData(options.workId)
	})
	
	const confirmSelectStatus = (event: any) => {
		
	}
	
	// 获取工单详情数据
	const getWorkorderDatailsData = async (id) => {
		let res = await requestMethods('/GetWorkorderDetail', 'GET', {
			workDetailId: id
		})
		// console.log(res)
	}
	
	const backToWorkorderList = () => {
		uni.navigateBack()
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
			font-size: 30rpx;
		}
		.custom_value {
			font-size: 30rpx;
		}
		.custom_select {
			height: 88rpx;
			border-bottom: 1px solid #eee;
		}
	}
	.workorder_form_time {
		height: 88rpx;
		font-size: 30rpx;
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
		font-size: 30rpx;
	}
	:deep() {
		.custom-desc {
			max-height: 140rpx;
			box-sizing: border-box;
		}
	}
}
</style>
