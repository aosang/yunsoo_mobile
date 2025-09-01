import { defineStore } from "pinia"

export const libraryFormStore = defineStore('libraryData', {
	state: () => ({
		libraryId: '',
		libraryTitle: '',
		libraryText: '',
		libraryTypeValue: '',
		libraryTime: '',
		libraryAuthor: '',
		libraryHtml: ''
	}),
	
	actions: {
		setLibrary({
			libraryId,
			libraryTitle, 
			libraryText, 
			libraryTypeValue, 
			libraryTime,
			libraryAuthor,
			libraryHtml
		}) {
			this.libraryId = libraryId
			this.libraryTitle = libraryTitle
			this.libraryText = libraryText
			this.libraryTypeValue = libraryTypeValue
			this.libraryTime = libraryTime
			this.libraryAuthor = libraryAuthor
			this.libraryHtml = libraryHtml
		},
		
		clearLibrary() {
			this.libraryId = ''
			this.libraryTitle = ''
			this.libraryText = ''
			this.libraryTypeValue = ''
			this.libraryTime = ''
			this.libraryAuthor = ''
			this.libraryHtml = ''
		}
	},
	persist: {
		enabled: true
	}
})