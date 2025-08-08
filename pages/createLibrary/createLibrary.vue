<template>
	<view class="container">
		<view class="page-body">
			<view class='wrapper'>
				<view class="editor-wrapper">
					<editor 
						id="editor" 
						class="ql-container" 
						placeholder="开始输入..." 
						show-img-size 
						show-img-toolbar 
						show-img-resize
						@statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady">
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
					<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian"
						data-name="underline">
					</view>
					<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie"
						data-name="list" data-value="ordered">
					</view>
					<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie" data-name="list"
						data-value="bullet">
					</view>
					<view class="iconfont icon-charutupian" @tap="insertImage"></view>
					<view class="iconfont icon-shanchu" @tap="clear"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				readOnly: false,
				formats: {}
			}
		},
		onLoad() {
			// #ifndef MP-BAIDU
			uni.loadFontFace({
				family: 'Pacifico',
				source: 'url("https://sungd.github.io/Pacifico.ttf")'
			})
			// #endif
		},
		methods: {
			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				// #ifdef APP-PLUS || MP-WEIXIN || H5
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
				// #endif
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {name, value } = e.target.dataset
				if (!name) return
				this.editorCtx.format(name, value)
			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				uni.showModal({
					title: '清空编辑器',
					content: '确定清空编辑器全部内容？',
					success: res => {
						if (res.confirm) {
							this.editorCtx.clear({
								success: function(res) {
									console.log("clear success")
								}
							})
						}
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.editorCtx.insertImage({
							src: res.tempFilePaths[0],
							alt: '图像',
							success: function() {
								console.log('insert image success')
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	@import "@/static/css/editor-icon.css";

	.page-body {
		height: calc(100vh - var(--window-top) - var(--status-bar-height));
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