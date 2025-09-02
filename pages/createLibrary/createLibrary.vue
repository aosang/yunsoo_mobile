<template>
	<Navigation />
	<wd-toast />
	<view></view>
	<view v-show="isPreview">
		<view class="created_library">
			<wd-navbar 
				title="编辑知识库内容" 
				fixed 
				custom-class="custom" 
				left-text="返回"
				right-text="预览"
				left-arrow
				:zIndex="10"
				@click-left="backToLibraryList"
				@click-right="submitLibraryFormEvent"
			>
			</wd-navbar>
		</view>
		<view class="container">
			<view class="page-body">
				<view class='wrapper'>
					 <sp-editor
					 :toolbar-config="{
						 keys: ['bold', 'underline', 'listOrdered', 'listBullet', 'image', 'undo', 'redo', 'clear'],
						 iconSize: '18px'
						}"
						placeholder="想要分享的内容"
						@input="inputContentHtml"
						@upinImage="upinImage"
						@init="initEditor"
					>
					</sp-editor>
				</view>
			</view>
		</view>
	</view>
	<!-- 预览 -->
	<view class="preview_box" v-show="!isPreview">
		<wd-skeleton
			:loading="isSkeleton"
			:custom-style="{ marginTop: '20px' }" 
			:row-col="imageGroup" 
		/>
		<view v-show="!isSkeleton">
			<view class="preview_title">{{libraryStore.libraryTitle}}</view>
			<view class="preview_info">
				<text>{{libraryStore.libraryAuthor}}</text>
				<text>{{dayjs(libraryStore.libraryTime).format('YYYY-MM-DD')}}</text>
				<text>{{libraryStore.libraryTypeValue}}</text>
			</view>
			<view class="preview_line"></view>
			<view class="preview_html" v-html="libraryStore.libraryHtml"></view>
			<!-- 底部tab -->
			<view class="preview_tab">
				<wd-button 
					custom-class="custom-radius" 
					type="warning"
					icon="time-filled"
					@click="backToEditLibrary"
				>
					再修改一下
				</wd-button>
				<wd-button 
					custom-class="custom-radius"
					icon="check-circle-filled"
					@click="addLibraryFormData"
				>
					发布到知识库
				</wd-button>
			</view>
		</view>
	</view>
	
</template>

<script setup>
import dayjs from 'dayjs'
import { onLoad } from '@dcloudio/uni-app'
import { ref, nextTick, reactive, onMounted, toRaw } from 'vue'
import Navigation from '@/components/navigation_header.vue'
import { getTimenumber } from '@/request/formatTime'
import { requestMethods, uploadMethods } from '@/request/request'
import { useToast } from '@/uni_modules/wot-design-uni'
const toast = useToast()
import { userInfoStore } from "@/stores/userInfo"
const userStore = userInfoStore()
import { libraryFormStore } from "@/stores/libraryForm"
const libraryStore = libraryFormStore()

const imageGroup = [1, 1, { width: '200px' }, { height: '170px' }, 1, 1, 1, 1, { width: '200px' }]
const isSkeleton = ref(true)
const editorIns = ref(null)
const formats = ref({})
const editorCtx = ref(null)
const libraryType = ref([])
const isPreview = ref(true)
const statusNumber = ref(1)

onMounted(() => {
	// console.log(libraryStore.$state, null, 2)
})

const inputContentHtml = (e) => {
	if (e && e.html) {
		libraryStore.libraryHtml = e.html
	}
}

// 上传图片
const upinImage = async (tempFiles, editorCtx) => {
	if (!tempFiles || !tempFiles[0] || !editorCtx) {
		toast.error('图片上传参数错误')
		return
	}
	try {
		const res = await uploadMethods('/uploadLibraryImage', tempFiles[0].path)
		if (res.data.url) {
			editorCtx.insertImage({
				src: res.data.url,
				width: '90%',
				success() {
					uni.showToast({
						icon: 'none',
						title: '图片上传成功'
					})
				}
			})
		} else {
			uni.showToast({
				icon: 'none',
				title: '上传返回异常'
			})
		}
	} catch (err) {
		console.error('图片上传失败', err)
		uni.showToast({
			icon: 'none',
			title: '图片上传失败'
		})
	}
}

const initEditor = (editor) => {
	if (editor) {
		editorIns.value = editor
		// 保存编辑器实例后，可以在此处获取后端数据，并赋值给编辑器初始化内容
		preRender()
	}
}

const preRender = () => {
	if (editorIns.value && editorIns.value.setContents) {
		setTimeout(() => {
			// 异步获取后端数据后，初始化编辑器内容
			try {
				editorIns.value.setContents({
					html: libraryStore.libraryHtml || ''
					// html: ''
				})
			} catch (error) {
				console.error('编辑器内容设置失败:', error)
			}
		}, 1000)
	}
}

// 确认提交知识库表单
const submitLibraryFormEvent = () => {
	if(!libraryStore.libraryHtml) {
		toast.info('请填写知识库内容')
	}else{
		setTimeout(() => {
			isSkeleton.value = false
		}, 1000)
		isPreview.value = false
		uni.pageScrollTo({
			duration: 0,
			scrollTop: 0
		})
	}
}

const backToEditLibrary = () => {
	isPreview.value = true
}

const addLibraryFormData = async () => {
	try {
		let res = await requestMethods('/addLibrary', 'POST', libraryStore)
		if(res.code === 200) {
			toast.show({
				iconName: 'success',
				msg: '新增知识库成功',
				duration: 800,
				closed: () => {
					uni.navigateTo({
						url: '/pages/libraryList/libraryList?success=' + statusNumber.value,
						success() {
							uni.$emit('refreshData')
							libraryStore.clearLibrary()
						}
					})
				}
			})
		}else {
			toast.error('新增知识库失败')
		}
	} catch (error) {
		console.error('提交知识库失败:', error)
		toast.error('提交知识库失败')
	}
}

const backToLibraryList = () => {
	uni.navigateBack()
}
</script>

<style lang="scss">
	@import "@/static/css/editor-icon.css";
	
	html, body {
		background: #f3f3f3;
	}
	
	.created_library {
		:deep() {
			width: 100%;
			margin: 40rpx auto 0 auto;
			.custom {
				background-color: #2a6fff;
				margin-top: 88rpx;
			}
		}
	}

	.page-body {
		height: calc(100vh - var(--window-top) - var(--status-bar-height));
		margin-top: 172rpx;
		
		.commonInput {
			width: 100%;
			display: block;
			font-size: 28rpx;
			margin: 0 auto;
		}
		
		.commonInputWidth {
			width: 100%;
			padding: 6rpx 30rpx;
			margin-bottom: 10rpx;
			box-sizing: border-box;
		}
	
		.custom_select {
			font-size: 28rpx;
			
			.custom_select_value {
				font-size: 28rpx;
				padding: 0 30rpx;
			}
		}
	}

	.wrapper {
		position: fixed;
		top: 172rpx;
		left: 0;
		width: 100%;
		height: 100%;
		// margin-top: 20rpx;
	}

	.editor-wrapper {
		height: calc(100vh - var(--window-top) - var(--status-bar-height) - 140px);
		background: #fff;
	}

	.iconfont {
		display: inline-block;
		padding: 24rpx 42rpx;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 36rpx;
		box-sizing: border-box;
	}

	.toolbar {
		width: 100%;
		position: fixed;
		bottom: 0;
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
		border-top: 1px solid #ccc;
	}

	.ql-container {
		box-sizing: border-box;
		padding: 24rpx 24rpx;
		width: 100%;
		max-height: 1200rpx;
		// height: 100%;
		font-size: 28rpx;
		line-height: 1.5;
	}

	.ql-active {
		color: #06c;
	}
	
	.active_style {
		color: #808080;
	}
	
	// 预览样式
	.preview_box {
		width: 100%;
		height: 100%;
		padding: 30rpx;
		margin-top: 60rpx;
		box-sizing: border-box;
		background: #fff;
		
		.preview_title {
			font-size: 32rpx;
			font-weight: 650;
			color: #555;
		}
		
		.preview_info {
			display: flex;
			align-items: center;
			line-height: 48rpx;
			text {
				display: block;
				font-size: 26rpx;
				color: #515567;
				margin: 12rpx 30rpx 0 0;
			}
		}
		
		.preview_line {
			width: 100%;
			height: 2rpx;
			background: #eee;
			margin: 12rpx 0;
		}
		
		.preview_html {
			font-size: 28rpx;
			color: #555;
			
			img {
				width: 100%;
				margin: 6rpx auto;
			}
		}
	}
	
	.preview_tab{
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		bottom: 20rpx;
		left: 0;
		width: 100%;
		height: 110rpx;
		background: #eee;
		border-top: 2rpx solid #cecece;
		padding: 0 100rpx;
		box-sizing: border-box;
		background: #fff;
		
		:deep() {
			.custom-radius {
				border-radius: 20rpx !important;
			}
		}
	}
	
</style>