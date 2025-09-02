<template>
	<Navigation />
	<wd-toast />
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
				v-model="libraryForm.libraryText"
				auto-height
				placeholder-class="placeholderInput"
			/>
		</view>
		<view class="created_type">
			<view class="created_type_title">选择文章类型</view>
			<wd-radio-group 
				v-model="libraryTypeValue" 
				cell 
				shape="button"
				@change="getSelectLibraryValue"
			>
				<wd-radio 
					v-for="item in libraryType" 
					:key="item.product_id"
					:value="item.value"
					checked-color="#2a6fff"
				>
					{{item.value}}
				</wd-radio>
			</wd-radio-group>
		</view>
	</view>
</template>

<script setup>
import Navigation from '@/components/navigation_header.vue'
import { ref, nextTick, reactive, onMounted } from 'vue'
import { requestMethods } from '@/request/request'
import { useToast } from '@/uni_modules/wot-design-uni'
import { getTimenumber } from '@/request/formatTime'
const toast = useToast()
import { libraryFormStore } from "@/stores/libraryForm.js"
const libraryStore = libraryFormStore()
import { userInfoStore } from "@/stores/userInfo"
const userStore = userInfoStore()

const libraryTypeValue = ref('')
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

onMounted(() => {
	nextTick(() => {
		getLibraryTypeSelectData()
	})
})

const getLibraryTypeSelectData = async () => {
	try {
		let res = await requestMethods('/getLibraryType', 'GET')
		if (res && res.data) {
			libraryType.value = res.data
		}
	} catch (error) {
		console.error('获取知识库类型失败:', error)
		toast.error('获取知识库类型失败')
	}
}

const getSelectLibraryValue = (e) => {
	libraryForm.libraryTypeValue = e.value
}

const goToLibraryEditorPage = () => {
	let { libraryTitle, libraryText, libraryTypeValue} = libraryForm
	if(!libraryTitle) {
		toast.info('请填写知识库标题')
	}else if(!libraryText) {
		toast.info('请填写知识库简介')
	}else if(!libraryTypeValue) {
		toast.info('请选择知识库类型')
	}else{
		libraryForm.libraryTime = getTimenumber()[1]
		libraryForm.libraryAuthor = userStore.userName
		libraryForm.libraryId = userStore.userId
		
		libraryStore.setLibrary(libraryForm)
		uni.navigateTo({
			url: '/pages/createLibrary/createLibrary'
		})
	}
}

const backToLibraryList = () => {
	uni.navigateBack()
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
	margin-top: 180rpx;
	// box-sizing: border-box;
	
	.created_input_item {
		margin-bottom: 10rpx;
		
		.placeholderInput {
			font-size: 28rpx !important;
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
		background: #fff;
		box-sizing: border-box;
		
		.created_type_title {
			height: 80rpx;
			line-height: 80rpx;
			font-size: 28rpx;
			font-size: #555;
			border-bottom: 1px solid #eee;
			padding: 0 30rpx;
		}
	}
}
</style>
