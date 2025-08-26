<template>
	<Navigation />
	<wd-toast />
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
					v-model="libraryForm.libraryTitle"
			  />
				<wd-input
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
				</wd-select-picker>
			</wd-cell-group>
			
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
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, onMounted, nextTick, reactive } from 'vue'
import Navigation from '@/components/navigation_header.vue'
import { requestMethods } from '@/request/request'
import { getTimenumber } from '@/request/formatTime'
import { useToast } from '@/uni_modules/wot-design-uni'
const toast = useToast()
import { userInfoStore } from "@/stores/userInfo"
const userStore = userInfoStore()

const editorIns = ref(null)
const formats = ref({})
const editorCtx = ref(null)
const imgUrl = ref('')
const libraryType = ref([])

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

const inputContentHtml = (e) => {
	libraryForm.libraryHtml = e.html
}

// 上传图片
const upinImage = (tempFiles, editorCtx) => {
	uni.uploadFile({
		url: 'http://192.168.8.5:3000/uploadLibraryImage',
		filePath: tempFiles[0].path,
		name: 'file',
		header: {
			'authorization': userStore.token? userStore.token : null
		},
		formData: {
			'file': tempFiles
		},
		success: (upload) => {
			let jsonData = JSON.parse(upload.data)
			imgUrl.value = jsonData.data.url
			editorCtx.insertImage({
				src: imgUrl.value,
				width: '90%', // 默认不建议铺满宽度100%，预留一点空隙以便用户编辑
				success: function () {
					uni.showToast({
						icon: 'none',
						title: '图片上传成功'
					})
				}
			})
		}
	})
}

const initEditor = (editor) => {
  editorIns.value = editor // 保存编辑器实例
  // 保存编辑器实例后，可以在此处获取后端数据，并赋值给编辑器初始化内容
  preRender()
}

const preRender = () => {
  setTimeout(() => {
    // 异步获取后端数据后，初始化编辑器内容
    editorIns.value.setContents({
      html: ``
    })
  }, 1000)
}

// 确认提交知识库表单
const submitLibraryFormEvent = () => {
	let { libraryTitle, libraryText, libraryTypeValue, libraryHtml } = libraryForm
	if(!libraryTitle) {
		toast.info('请填写知识库标题')
	}else if(!libraryText) {
		toast.info('请填写知识库简介')
	}else if(!libraryTypeValue) {
		toast.info('请选择知识库类型')
	}else if(!libraryHtml) {
		toast.info('请填写知识库内容')
	}else{
		toast.info('验证通过')
	}
}

// const overMax = (e) => {
//   // 若设置了最大字数限制，可在此处触发超出限制的回调
//   console.log('==== overMax :', e)
// }

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