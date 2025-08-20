<template>
	<Navigation />
	<view class="created_library">
		<wd-navbar 
			title="创建知识库" 
			fixed 
			custom-class="custom" 
			left-text="返回"
			left-arrow
			:zIndex="10"
			@click-left="backToLibraryList"
		>
		</wd-navbar>
	</view>
	<view class="container">
		<view class="page-body">
			<view class='wrapper'>
				<view class="editor-wrapper">
					<editor 
						id="editor" 
						class="ql-container" 
						placeholder="输入您要分享的内容..." 
						show-img-size 
						show-img-toolbar 
						show-img-resize
						@statuschange="onStatusChange" 
						:read-only="readOnly" 
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
						:class="formats.bold ? 'ql-active' : ''" 
						class="iconfont icon-zitijiacu" 
						data-name="bold"
					>
					</view>
					<view 
						:class="formats.underline ? 'ql-active' : ''" 
						class="iconfont icon-zitixiahuaxian"
						data-name="underline">
					</view>
					<view 
						:class="formats.list === 'ordered' ? 'ql-active' : ''" 
						class="iconfont icon-youxupailie"
						data-name="list" data-value="ordered">
					</view>
					<view class="iconfont icon-charutupian" @tap="insertImage"></view>
					<view class="iconfont icon-shanchu" @tap="clearEditor"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import Navigation from '@/components/navigation_header.vue'

const readOnly = ref(false)
const formats = ref({})
const editorCtx = ref(null)

const readOnlyChange = () => {
	readOnly.value = !readOnly.value
}

const onEditorReady = () => {
	// #ifdef APP-PLUS || MP-WEIXIN || H5
	uni.createSelectorQuery().select('#editor').context((res) => {
		editorCtx.value = res.context
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

const getLibraryText = (e) => {
	// console.log(e)
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
			editorCtx.value.insertImage({
				src: res.tempFilePaths[0],
				alt: '图像',
				success: function() {
					uni.showToast({
						title: '图片添加成功',
						icon: 'success'
					})
				},
				fail: function(err) {
					uni.showToast({
						title: '图片添加失败',
						icon: 'none'
					})
				}
			})
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

const format = (e) => {
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

const onStatusChange = (e) => {
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
		margin-top: 200rpx;
	}

	.wrapper {
		height: 100%;
	}

	.editor-wrapper {
		height: calc(100vh - var(--window-top) - var(--status-bar-height) - 140px);
		background: #fff;
	}

	.iconfont {
		display: inline-block;
		padding: 24rpx 48rpx;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 36rpx;
		box-sizing: border-box;
	}

	.toolbar {
		width: 100%;
		position: absolute;
		bottom: 0;
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
		border-top: 1px solid #ccc;
		background: #eee;
	}

	.ql-container {
		box-sizing: border-box;
		padding: 24rpx 30rpx;
		width: 100%;
		min-height: 40vh;
		height: 100%;
		font-size: 28rpx;
		line-height: 1.5;
	}

	.ql-active {
		color: #06c;
	}
</style>