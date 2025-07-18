const baseUrl = 'http://192.168.8.5:3000'

export const requetsMethods = (url, method, data = {} ) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method: method,
			data: data,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
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
					reject(data)
				}
			},
			fail: (err) => {
				uni.showToast({
					title: '网络请求失败',
					icon: 'none'
				});
				reject(err);
			}
		})
	})
}
