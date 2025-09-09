<template>
	<Navigation />
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
		>
		</wd-navbar>
		<view class="createDevice_form">
			<wd-notice-bar
				text="除备注信息外，其它均为必填项" 
				prefix="warn-bold"
				:scrollable="false"
				class="notice-bar"
			>
			</wd-notice-bar>
			<wd-divider class="device_user">
				<view style="display: block">aosang2071</view>
			</wd-divider>
			<view class="createDevice_form_item">
				<view class="createdDevice_time">创建时间：2025-09-09 15:56</view>
			</view>
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
				>
				</wd-select-picker>
			</view>
			<view class="createDevice_form_item createDevice_form_items">
				<wd-select-picker
					v-model="deviceForm.device_brand"
					placeholder="选择设备品牌"
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
				/>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { reactive } from 'vue';
	import Navigation from '@/components/navigation_header.vue'
	
	const deviceForm = reactive({
		id: '',
		device_name: '',
		device_type: '',
		device_brand: '',
		device_price: '',
		device_number: '',
		device_remark: ''
	})
	
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
				font-size: 28rpx;
			}
			
			.device_user {
				font-size: 32rpx;
				font-weight: 600;
				color: #2a6fff;
				background: #fff;
				height: 88rpx;
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
	}
</style>
