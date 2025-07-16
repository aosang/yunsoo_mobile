<template>
	<view class="workorder_list">
		<wd-swipe-action style="box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);">
			<view class="workorder_list_item"></view>
			<template #right>
				<view class="action">
					<view class="button">删除</view>
				</view>
			</template>
		</wd-swipe-action>
	</view>
</template>

<script setup>
	import { onMounted } from 'vue';
	import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app'
	
	onLoad(() => {
		onPullDownRefresh(() => {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1500)
		})
	})
		
	// onMounted(() => {
		
	// })
</script>

<style lang="scss">
	.workorder_list {
		width: 680rpx;
		margin: 40rpx auto 0 auto;
		
		.workorder_list_item {
			width: 100%;
			height: 260rpx;
			background: #fff;
			border-radius: 10rpx;
		}
	}
	
	.action {
		width: 100%;
	  height: 100%;
	}
	.button {
	  display: inline-block;
	  padding: 0 11px;
	  height: 100%;
	  color: white;
	  line-height: 42px;
		background: #E2231A;
	}
</style>
