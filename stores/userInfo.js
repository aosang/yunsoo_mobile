import { defineStore } from "pinia"

export const userInfoStore = defineStore('user', {
	state: () => ({
		id: 'user',
		token: '',
		tokenTime: 0,
		userId: ''
	}),
	actions: {
		setUser(token, time, userid) {
			this.token = token
			this.tokenTime = time //token有效期
			this.userId = userid
		},
		clearUser() {
			this.token = ''
			this.tokeTime = 0
			this.userId = ''
		}
	},
	persist: {
		enabled: true
	}
})