<template>
  <view class="test-container">
    <view class="test-title">Vue3 测试页面</view>
    <view class="test-content">
      <text>当前计数: {{ count }}</text>
      <wd-button @click="increment">增加</wd-button>
      <wd-button @click="decrement">减少</wd-button>
    </view>
    <view class="test-info">
      <text>Vue版本: {{ vueVersion }}</text>
      <text>当前时间: {{ currentTime }}</text>
      <text>响应式数据测试: {{ reactiveData.message }}</text>
    </view>
    <view class="test-actions">
      <wd-button @click="updateReactiveData">更新响应式数据</wd-button>
      <wd-button @click="testComputed">测试计算属性</wd-button>
    </view>
    <view class="test-output">
      <text>计算属性结果: {{ computedValue }}</text>
      <text>测试状态: {{ testStatus }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const count = ref(0)
const vueVersion = ref('3.x')
const currentTime = ref('')
const testStatus = ref('初始化中...')
let timer = null

// 响应式对象测试
const reactiveData = reactive({
  message: 'Hello Vue3!',
  count: 0
})

// 计算属性测试
const computedValue = computed(() => {
  return `计数: ${count.value}, 响应式计数: ${reactiveData.count}`
})

onLoad(() => {
  console.log('✅ 测试页面加载 - onLoad')
  testStatus.value = '页面已加载'
})

onMounted(() => {
  console.log('✅ 测试页面挂载 - onMounted')
  testStatus.value = '页面已挂载'
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  console.log('✅ 测试页面卸载 - onUnmounted')
  testStatus.value = '页面已卸载'
  if (timer) {
    clearInterval(timer)
  }
})

const updateTime = () => {
  currentTime.value = new Date().toLocaleString()
}

const increment = () => {
  count.value++
  console.log('✅ 计数增加:', count.value)
}

const decrement = () => {
  count.value--
  console.log('✅ 计数减少:', count.value)
}

const updateReactiveData = () => {
  reactiveData.count++
  reactiveData.message = `更新于 ${new Date().toLocaleTimeString()}`
  console.log('✅ 响应式数据已更新')
}

const testComputed = () => {
  console.log('✅ 计算属性值:', computedValue.value)
  testStatus.value = '计算属性测试完成'
}
</script>

<style lang="scss" scoped>
.test-container {
  padding: 40rpx;
  
  .test-title {
    font-size: 36rpx;
    font-weight: bold;
    text-align: center;
    margin-bottom: 40rpx;
    color: #2a6fff;
  }
  
  .test-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20rpx;
    margin-bottom: 40rpx;
    
    text {
      font-size: 32rpx;
      margin-bottom: 20rpx;
    }
  }
  
  .test-info {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    margin-bottom: 40rpx;
    
    text {
      font-size: 28rpx;
      color: #666;
    }
  }
  
  .test-actions {
    display: flex;
    gap: 20rpx;
    margin-bottom: 40rpx;
    justify-content: center;
  }
  
  .test-output {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    
    text {
      font-size: 26rpx;
      color: #888;
      background: #f5f5f5;
      padding: 20rpx;
      border-radius: 10rpx;
    }
  }
}
</style>
