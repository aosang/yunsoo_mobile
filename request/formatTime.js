import dayjs from 'dayjs'
export const formatTime = () => {
	const now = Date.now()
	const times = dayjs(now).format('YYYY-MM-DD HH:mm:ss')
	return times
}

export const getTimenumber = () => {
	let number = Math.floor(Math.random() * (99 - 10 + 1)) + 10
	
	let date = new Date()
	let y = date.getFullYear()
	let m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
	let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
	let mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
	let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
	
	let timeNumber = y + '' + m + '' + d + '' + h + '' + mm + '' + s + number
	let currentTime = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
	return [timeNumber, currentTime]
}