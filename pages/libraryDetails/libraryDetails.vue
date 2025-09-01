<template>
	<Navigation />
	<view class="library_navigation">
		<wd-navbar
			title="知识库详情" 
			fixed 
			custom-class="custom"
			left-arrow
			left-text="返回"
			:zIndex="10"
			@click-left="backToLibraryList"
		>
		</wd-navbar>
	</view>
	<view class="library_details">
		<view class="library_title">
			{{libraryForm.title}}
		</view>
		<view class="library_info">
			<text class="library_time">
				{{dayjs(libraryForm.created_time).format('YYYY-MM-DD')}}
			</text>
			<text class="library_author">
				{{libraryForm.author}}
			</text>
			<text class="library_type">
				{{libraryForm.type}}
			</text>
		</view>
		<view class="library_line"></view>
		<view
			class="library_html"
			v-html="libraryForm.content">
		</view>
	</view>
</template>

<script setup>
	import Navigation from '@/components/navigation_header.vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { requestMethods } from '@/request/request'
	import { reactive } from 'vue'
	import dayjs from 'dayjs'
	
	const libraryForm = reactive({
		created_time: '',
		author: '',
		title: '',
		content: '',
		type: ''
	})
	
	onLoad(options => {
		getLibraryDetailsData(options.libraryId)
	})
	
	const getLibraryDetailsData = async (id) => {
		let res = await requestMethods('/LibraryDetail', 'GET', {
			libraryId: id
		})
		if(res.code === 200) {
			libraryForm.created_time = res.data[0].created_time
			libraryForm.author = res.data[0].author
			libraryForm.title = res.data[0].title
			libraryForm.type = res.data[0].type
			libraryForm.content = res.data[0].content
		}
	}
	
	const backToLibraryList = () => {
		uni.navigateBack()
	}
</script>

<style lang="scss">
.library_navigation {
	:deep() {
		width: 100%;
		margin: 40rpx auto 0 auto;
		.custom {
			background-color: #2a6fff;
			margin-top: 88rpx;
		}
	}
}

.library_details {
	width: 680rpx;
	margin: 200rpx auto 0 auto;
	
	.library_line {
		width: 680rpx;
		height: 2rpx;
		background: #eee;
		margin: 12rpx 0;
	}
	
	.library_info {
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
	
	.library_title {
		color: #555;
		font-size: 32rpx;
		font-weight: 650;
	}
	
	.library_html {
		font-size: 28rpx;
		line-height: 48rpx;
		color: #333;
		margin-top: 20rpx;
		
		img {
			display: block !important;
			width: 100% !important;
			margin: 8rpx 0;
		}
	}
}
</style>