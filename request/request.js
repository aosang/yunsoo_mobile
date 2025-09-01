const baseUrl = 'http://192.168.8.5:3000'
// const baseUrl = 'http://192.168.8.63:3000'
// const baseUrl = 'http://5dzb8cgi.beesnat.com'
import { userInfoStore } from "@/stores/userInfo"

export const requestMethods = (url, method, data = {}) => {
	const userStore = userInfoStore()
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method: method,
			data: data,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'authorization': userStore.token? userStore.token : null
			},
			// 请求响应
			success: (res) => {
				const { statusCode, data } = res
				if (statusCode === 200) {
					resolve(data)
				} else {
					uni.showToast({
						title: data?.message || '请求失败',
						icon: 'none'
					})
					uni.reLaunch({
						url: '/pages/login/login'
					})
					reject(data)
				}
			},
			fail: (err) => {
				uni.showToast({
					title: '网络请求失败',
					icon: 'none'
				})
				reject(err)
			}
		})
	})
}

export const uploadMethods  = (url, filePath, formData = {}) => {
	const userStore = userInfoStore()
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: baseUrl + url,
			filePath,
			name: 'file',
			formData,
			header: {
				'authorization': userStore.token? userStore.token : null
			},
			// 请求响应
			success: (res) => {
				try {
					const data = JSON.parse(res.data) // 上传接口返回的 data 通常是字符串，要 parse
					resolve(data)
				} catch (e) {
					console.error('上传返回解析失败', res.data)
					reject(new Error('上传返回格式异常'))
				}
			},
			fail: (err) => {
				uni.showToast({
					title: '文件上传失败',
					icon: 'none'
				})
				reject(err)
			}
		})
	})
}