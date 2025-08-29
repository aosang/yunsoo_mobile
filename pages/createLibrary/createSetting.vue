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
		<wd-textarea
			custom-textarea-container-class="commonInputWidth"
			custom-textarea-class="commonInput"
			placeholder="请输入标题"  
			clearable
			:maxlength="70"
			showWordLimit
			v-model="libraryForm.libraryTitle"
		/>
		  
			<!-- <wd-input
				custom-class="commonInputWidth"
				custom-input-class="commonInput"
				placeholder="请输入简介"  
				clearable
				:maxlength="70"
				showWordLimit
				v-model="libraryForm.libraryText"
			/>
			<wd-select-picker
				custom-class="custom_select"
				type="radio"
				:z-index="1000"
				:columns="libraryType"
				v-model="libraryForm.libraryTypeValue"
				label-key="value"
				value-key="value"
				use-default-slot
			>
				<wd-input
					custom-class="commonInputWidth"
					custom-input-class="commonInput"
					placeholder="请选择类型"  
					readonly
					v-model="libraryForm.libraryTypeValue"
				/>
			</wd-select-picker> -->
	</view>
</template>

<script setup>
import Navigation from '@/components/navigation_header.vue'
import { ref, nextTick, reactive, onMounted } from 'vue'

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
	// padding: 0 30rpx;
	// box-sizing: border-box;
	
	.commonInput {
		height: 20rpx;
		box-sizing: border-box;
	}
}
</style>
