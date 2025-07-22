import { defineStore } from "pinia"

export const userInfoStore = defineStore('user', {
	state: () => ({
		userInfo: {}
	}),
	actions: {
		setUser(data) {
			this.userInfo = data.userInfo
		},
		clearUser() {
			this.userInfo = null
		}
	},
	persist: true, //开启持久化存储
})