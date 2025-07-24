<template>
	<Navigation />
	<view class="create_workorder">
		<wd-navbar
			title="创建工单" 
			fixed 
			custom-class="custom"
			left-arrow
			left-text="返回"
			custom-style="color: #fff"
		>
		</wd-navbar>
	</view>
</template>

<script setup>
	import Navigation from '@/components/navigation_header.vue'
</script>

<style lang="scss">
.create_workorder {
	width: 100%;
	:deep() {
		.custom {
			background-color: #2a6fff;
			margin-top: 88rpx;
		}
	}
}
</style>
