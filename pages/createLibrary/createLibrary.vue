<template>
	<Navigation />
	<view class="created_library">
		<wd-navbar 
			title="创建知识库" 
			fixed 
			custom-class="custom" 
			left-text="返回"
			right-text="确认"
			left-arrow
			:zIndex="10"
			@click-left="backToLibraryList"
			@click-right="submitLibraryFormEvent"
		>
		</wd-navbar>
	</view>
	<view class="container">
		<view class="page-body">
		
			<wd-cell-group>
			  <wd-input
			  	custom-class="commonInputWidth"
			  	custom-input-class="commonInput"
			  	placeholder="请输入标题"  
			  	clearable
			  	:maxlength="70"
			  	showWordLimit
			  />
				<wd-input
					custom-class="commonInputWidth"
					custom-input-class="commonInput"
					placeholder="请输入描述"  
					clearable
					:maxlength="70"
					showWordLimit
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
				</wd-select-picker>
			</wd-cell-group>
			
			<view class='wrapper'>
				<view class="editor-wrapper">
					<editor 
						id="editor" 
						class="ql-container" 
						placeholder="输入您要分享的内容..." 
						show-img-size 
						show-img-toolbar 
						show-img-resize
						:read-only="readOnly"
						@statuschange="onStatusChange" 
						@ready="onEditorReady"
						@blur="getLibraryText"
					>
					</editor>
				</view>

				<!-- 工具栏 -->
				<view 
					class='toolbar' 
					@tap="format" 
					style="height: 88rpx; 
					overflow-y: auto"
				>
					<view 
						:class="formats.bold? 'ql-active' : ''" 
						class="iconfont icon-zitijiacu" 
						data-name="bold"
					>
					</view>
					<view
						:class="formats.underline ? 'ql-active' : ''" 
						class="iconfont icon-zitixiahuaxian"
						data-name="underline"
					>
					</view>
					<view 
						:class="formats.list === 'bullet' ? 'ql-active' : ''" 
						class="iconfont icon-wuxupailie"
						data-name="list" 
						data-value="bullet"
					>
					</view>
					<view 
						:class="formats.list === 'ordered' ? 'ql-active' : ''" 
						class="iconfont icon-youxupailie"
						data-name="list" 
						data-value="ordered"
					>
					</view>
					<view class="iconfont icon-undo" @tap="undo"></view>
					<view class="iconfont icon-redo" @tap="redo"></view>
					<view class="iconfont icon-charutupian" @tap="insertImage"></view>
					<view class="iconfont icon-shanchu" @tap="clearEditor"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref, onMounted, nextTick, reactive } from 'vue'
import Navigation from '@/components/navigation_header.vue'
import { requestMethods } from '@/request/request'
import { getTimenumber } from '@/request/formatTime'
import { userInfoStore } from "@/stores/userInfo"
const userStore = userInfoStore()

const readOnly = ref(false)
const formats = ref<Record<string, any>>({})
const editorCtx = ref(null)
const imgUrl = ref('')
const libraryType = ref<Record<string, any>>([])

const libraryForm = reactive({
	libraryTitle: '',
	libraryText: '',
	libraryTypeValue: '',
	libraryTime: '',
	libraryHtml: ''
})

onMounted(() => {
	nextTick(() => {
		getLibraryTypeSelectData()
	})
})

// 获取知识库类型
const getLibraryTypeSelectData = async () => {
	let res = await requestMethods('/getLibraryType', 'GET')
	libraryType.value = res.data
}

const readOnlyChange = () => {
	readOnly.value = !readOnly.value
}

const onEditorReady = () => {
	// #ifdef APP-PLUS || MP-WEIXIN || H5
	uni.createSelectorQuery().select('#editor').context((res) => {
		editorCtx.value = res
	}).exec()
	// #endif
}

const clearEditor = () => {
	if (!editorCtx.value) {
		uni.showToast({
			title: '编辑器未准备好',
			icon: 'none'
		})
		return
	}
	
	uni.showModal({
		title: '清空编辑器',
		content: '确定清空编辑器全部内容？',
		success: res => {
			if (res.confirm) {
				editorCtx.value.clear()
				uni.showToast({
					title: '编辑器已清空',
					icon: 'success'
				})
			}
		}
	})
}

const getLibraryText = (e: any) => {
	libraryForm.libraryHtml = e.detail.html
}

const submitLibraryFormEvent = () => {
	let {libraryHtml, libraryTypeValue, libraryText, libraryTitle} = libraryForm
}

const insertImage = () => {
	if (!editorCtx.value) {
		uni.showToast({
			title: '编辑器未准备好',
			icon: 'none'
		})
		return
	}
	
	uni.chooseImage({
		count: 1,
		success: (res) => {
			const filePath = res.tempFilePaths[0];
			const file = res.tempFiles[0]; // 获取文件类型
			uni.getImageInfo({
				src: filePath,
				success: () => {
					upLoadImageEvent(filePath, file);
				},
				fail: () => {
					// 如果失败，表示不是有效的图片文件
					uni.showToast({
						title: '请选择有效的图片文件',
						icon: 'none'
					});
				}
			})
		}
	})
}

const upLoadImageEvent = (path: string, file: any) => {
	uni.uploadFile({
		url: 'http://192.168.8.5:3000/uploadLibraryImage',
		filePath: path,
		name: 'file',
		header: {
			'authorization': userStore.token? userStore.token : null
		},
		formData: {
			'file': file
		},
		success: (upload) => {
			let jsonData = JSON.parse(upload.data)
			if(jsonData.code === 402) {
				uni.redirectTo({
					url: '/pages/login/login'
				})
			}else {
				imgUrl.value = jsonData.data.url
				editorCtx.value.insertImage({
					src: imgUrl.value,
					alt: '知识库图片',
					fail: function() {
						uni.showToast({
							title: '图片添加失败',
							icon: 'none'
						})
					},
				})
			}
		}
	})
}

const undo = () => {
	if (!editorCtx.value) {
		uni.showToast({
			title: '编辑器未准备好',
			icon: 'none'
		})
		return
	}
	editorCtx.value.undo()
}

const redo = () => {
	if (!editorCtx.value) {
		uni.showToast({
			title: '编辑器未准备好',
			icon: 'none'
		})
		return
	}
	editorCtx.value.redo()
}

const format = (e: any) => {
	if (!editorCtx.value) {
		uni.showToast({
			title: '编辑器未准备好',
			icon: 'none'
		})
		return
	}
	
	let { name, value } = e.target.dataset
	if (!name) return
	editorCtx.value.format(name, value)
}

const onStatusChange = (e: any) => {
	const newFormats = e.detail
	formats.value = newFormats
	// console.log(e.detail);
}

const backToLibraryList = () => {
	uni.navigateBack()
}
</script>

<style lang="scss">
	@import "@/static/css/editor-icon.css";
	
	html, body {
		height: 100vh;
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
		// height: calc(100vh - var(--window-top) - var(--status-bar-height));
		margin-top: 188rpx;
		
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
		height: 100%;
		margin-top: 20rpx;
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
		min-height: 40vh;
		height: 100%;
		font-size: 28rpx;
		line-height: 1.5;
	}

	.ql-active {
		color: #06c;
	}
	
	.active_style {
		color: #808080;
	}

</style>