<template>
	<Navigation />
	<view class="created_setting">
		<wd-navbar 
			title="发布设置" 
			fixed 
			custom-class="custom" 
			left-text="返回"
			right-text="下一步"
			left-arrow
			:zIndex="10"
			@click-left="backToLibraryList"
			@click-right="goToLibraryEditorPage"
		>
		</wd-navbar>
	</view>
	<view class="created_input">
		<view class="created_input_item">
			<wd-textarea
				custom-textarea-container-class="commonInputWidth"
				custom-textarea-class="commonInput"
				placeholder="请输入标题"  
				clearable
				:maxlength="50"
				showWordLimit
				v-model="libraryForm.libraryTitle"
				auto-height
				placeholder-class="placeholderInput"
			/>
		</view>
		<view class="created_input_item">
			<wd-textarea
				custom-textarea-container-class="commonInputWidth"
				custom-textarea-class="commonInput"
				placeholder="请输入简介"  
				clearable
				:maxlength="50"
				showWordLimit
				v-model="libraryForm.libraryTitle"
				auto-height
				placeholder-class="placeholderInput"
			/>
		</view>
		<view class="created_type">
			<view class="created_type_title">选择文章类型</view>
			<wd-radio-group v-model="value" cell shape="button">
			  <wd-radio value="1">选项一</wd-radio>
			  <wd-radio value="2">选项二</wd-radio>
			  <wd-radio value="3">选项三</wd-radio>
			  <wd-radio value="4">选项四</wd-radio>
			  <wd-radio value="5">选项五</wd-radio>
			  <wd-radio value="6">选项六</wd-radio>
			  <wd-radio value="7">选项七</wd-radio>
			</wd-radio-group>
		</view>
	</view>
</template>

<script setup>
import Navigation from '@/components/navigation_header.vue'
import { ref, nextTick, reactive, onMounted } from 'vue'

const value = ref(1)
const libraryType = ref([])
const libraryForm = reactive({
	libraryId: '',
	libraryTitle: '',
	libraryText: '',
	libraryTypeValue: '',
	libraryTime: '',
	libraryAuthor: '',
	libraryHtml: ''
})

const backToLibraryList = () => {
	uni.navigateBack()
}

const goToLibraryEditorPage = () => {
	uni.navigateTo({
		url: '/pages/createLibrary/createLibrary'
	})
}
</script>

<style lang="scss">
html, body {
	background: #f3f3f3;
}
	
.created_setting {
	:deep() {
		width: 100%;
		margin: 40rpx auto 0 auto;
		.custom {
			background-color: #2a6fff;
			margin-top: 88rpx;
		}
	}
}

.created_input {
	width: 100%;
	margin-top: 172rpx;
	// box-sizing: border-box;
	
	.created_input_item {
		margin-bottom: 10rpx;
		
		.placeholderInput {
			font-size: 28rpx;
		}
	}
	
	:deep() {
		.commonInput {
			width: 100%;
		}
		
		.commonInputWidth {
			width: 680rpx;
			margin: 0 auto;
			box-sizing: border-box;
			font-size: 28rpx !important;
		}
	}
	
	.created_type {
		width: 100%;
		padding: 0 30rpx;
		background: #fff;
		box-sizing: border-box;
		
		.created_type_title {
			height: 72rpx;
			line-height: 72rpx;
			font-size: 28rpx;
			font-size: #555;
			border-bottom: 1px solid #eee;
		}
	}
}
</style>
