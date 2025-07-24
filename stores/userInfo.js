import { defineStore } from "pinia"

export const userInfoStore = defineStore('user', {
	state: () => ({
		id: 'user',
		token: '',
		tokenTime: 0,
		userId: '',
		userName: ''
	}),
	actions: {
		setUser(token, time, userid, name) {
			this.token = token
			this.tokenTime = time //token有效期
			this.userId = userid
			this.userName = name
		},
		clearUser() {
			this.token = ''
			this.tokenTime = 0
			this.userId = ''
			this.userName = ''
		}
	},
	persist: {
		enabled: true
	}
})