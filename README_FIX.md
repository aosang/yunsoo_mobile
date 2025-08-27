# Vue3 初始化问题修复说明

## 问题描述
项目出现 `Uncaught TypeError: Cannot read property '$' of undefined at uni-app-view.umd.js:7` 错误，表明Vue实例未正确初始化。

## 问题根源
1. **Vue版本不一致**：`package.json`声明使用Vue3，但`main.js`中同时包含Vue2和Vue3的代码
2. **条件编译问题**：条件编译指令可能导致Vue实例初始化异常
3. **Vue2适配器残留**：存在`uni.promisify.adaptor.js`等Vue2项目文件
4. **导入错误**：`onMounted`等Vue3生命周期钩子错误地从`@dcloudio/uni-app`导入

## 修复内容

### 1. 修复 main.js
- 移除所有Vue2相关代码和条件编译指令
- 只保留Vue3的`createSSRApp`初始化逻辑
- 确保Pinia状态管理正确配置

### 2. 更新 App.vue
- 将Options API改为Composition API
- 使用`<script setup>`语法
- 正确导入uni-app生命周期钩子

### 3. 优化 createLibrary.vue
- 添加错误处理和参数验证
- 修复Vue3兼容性问题
- 使用`uni.$emit`替代`this.$emit`
- 添加try-catch错误处理
- **修复导入错误**：`onMounted`从Vue导入，`onLoad`从uni-app导入

### 4. 清理项目文件
- 删除`uni.promisify.adaptor.js`（Vue2适配器）
- 确保所有组件使用Vue3语法

### 5. 创建测试页面
- 添加`test.vue`页面验证Vue3正确初始化
- 测试响应式数据和生命周期钩子

## 技术要点

### Vue3 特性
- 使用Composition API (`<script setup>`)
- 使用`ref`、`reactive`等响应式API
- 使用Pinia进行状态管理

### uni-app 兼容性
- 确保使用正确的生命周期钩子
- 使用`uni.$emit`进行事件通信
- 避免使用Vue2特定的API

### 正确的导入方式
```javascript
// ✅ 正确：Vue3生命周期钩子从Vue导入
import { ref, onMounted, onUnmounted } from 'vue'

// ✅ 正确：uni-app生命周期钩子从uni-app导入
import { onLoad, onShow, onHide } from '@dcloudio/uni-app'

// ❌ 错误：Vue3钩子从uni-app导入
import { onMounted } from '@dcloudio/uni-app'
```

## 验证方法
1. 访问测试页面 `/pages/test/test`
2. 检查控制台是否有Vue3相关日志
3. 验证响应式数据是否正常工作
4. 确认没有Vue2相关的错误信息
5. 检查导入语句是否正确

## 注意事项
- 确保所有新组件都使用Vue3语法
- 避免混用Vue2和Vue3的API
- 使用Pinia替代Vuex进行状态管理
- 定期检查依赖包的Vue3兼容性
- **重要**：Vue3生命周期钩子必须从`vue`包导入，uni-app钩子从`@dcloudio/uni-app`导入

## 常见错误及解决方案

### 错误1：导入错误
```
"onMounted" is not exported by "@dcloudio/uni-app"
```
**解决方案**：将`onMounted`从`vue`包导入，而不是从`@dcloudio/uni-app`导入

### 错误2：Vue实例未初始化
```
Cannot read property '$' of undefined
```
**解决方案**：确保`main.js`只包含Vue3代码，移除所有Vue2相关代码

### 错误3：条件编译问题
**解决方案**：移除所有条件编译指令，统一使用Vue3语法
