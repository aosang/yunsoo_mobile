<template>
	<Navigation />
	<wd-toast></wd-toast>
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
		<wd-divider class="workorder_name">
			<view style="display: block;">aosang2071</view>
		</wd-divider>
		<view class="workorder_form_item">
			<wd-select-picker
				label="选择设备" 
				v-model="value" 
				:columns="columns" 
				:z-index="1000"
				type="radio" 
				@change="handleChange"
				custom-class="custom_select"
				custom-label-class="custom_label"
				custom-value-class="custom_value"
				custom-content-class="custom_content"
				placeholder="请选择设备"
				clearable
			>
			</wd-select-picker>
		</view>
		<view class="workorder_form_item">
			<wd-select-picker
				label="设备类型" 
				v-model="value" 
				:columns="columns" 
				:z-index="1000"
				type="radio" 
				@change="handleChange"
				custom-class="custom_select"
				custom-label-class="custom_label"
				custom-value-class="custom_value"
				custom-content-class="custom_content"
				placeholder="请选择设备类型"
				clearable
			>
			</wd-select-picker>
		</view>
		<view class="workorder_form_item">
			<wd-select-picker
				label="设备品牌" 
				v-model="value" 
				:columns="columns" 
				:z-index="1000"
				type="radio" 
				@change="handleChange"
				custom-class="custom_select"
				custom-label-class="custom_label"
				custom-value-class="custom_value"
				custom-content-class="custom_content"
				placeholder="请选择设备品牌"
				clearable
			>
			</wd-select-picker>
		</view>
		<view class="workorder_form_item">
			<wd-select-picker
				label="当前状态" 
				v-model="value" 
				:columns="columns" 
				:z-index="1000"
				type="radio" 
				@change="handleChange"
				custom-class="custom_select"
				custom-label-class="custom_label"
				custom-value-class="custom_value"
				custom-content-class="custom_content"
				placeholder="请选择当前状态"
				clearable
			>
			</wd-select-picker>
		</view>
		<view class="workorder_form_item">
			<view class="workorder_form_time">
				<view>创建时间</view>
				<view class="workorder_form_value">{{ createTime }}</view>
			</view>
		</view>
		<view class="workorder_form_item">
			<view class="workorder_form_time">
				<view>更新时间</view>
				<view class="workorder_form_value">{{ createTime }}</view>
			</view>
		</view>
		<view class="created_textarea">
			<view class="created_textarea_label">问题描述：</view>
			<wd-textarea :adjust-position="false" placeholder="请填写评价" />
		</view>
	</view>
	<view style="width: 100%; height: 1000rpx;"></view>

</template>

<script setup lang="ts">
	import Navigation from '@/components/navigation_header.vue'
	import { useToast } from '@/uni_modules/wot-design-uni'
	const toast = useToast()
	import { ref } from 'vue'
	
	const backToWorkorderList = () => {
		uni.navigateBack()
	}
	
	const createWorkorderSubmit = () => {
		console.log('提交表单事件')
	}
	
	const columns = ref<Record<string, any>>([
	  {
	    value: '101',
	    label: '男装'
	  },
	  {
	    value: '102',
	    label: '奢侈品'
	  },
	  {
	    value: '103',
	    label: '女装'
	  }
	])
	const value = ref<string>('123')
	const createTime = ref<string>('2025-07-25 16:35')
	
	const handleChange = ({ value }) => {
	  toast.show('选择了' + value)
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
	
	.workorder_name {
		font-size: 36rpx;
		font-weight: 600;
		color: #2a6fff;
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
</style>
