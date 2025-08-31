// const baseUrl = 'http://192.168.8.5:3000'
const baseUrl = 'http://192.168.8.63:3000'
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