var app = new Vue({
	el: '#app',
	data: {
		talks: [],
		error: '',
		rawCSV: '',
		selectedTalk: null,
		talkToSelect: 0
	},
	methods: {
		selectTalk: function() {
			this.selectedTalk = this.talks.filter(function(t) {
				return t.id === this.talkToSelect;
			}.bind(this))[0];
		},
		format: function(text) {
			return text
				.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				.replace(/"/g, "&quot;")
				.replace(/'/g, "&#039;")
				.replace(/\n/g, "<br>");
		},
		parseCSV: function() {
			var result = Papa.parse(this.rawCSV, {
				header: true
			});
			if (result.errors.length) {
				this.error = JSON.stringify(result.errors);
			} else {
				this.error = "";
				this.talks = result.data;
			}
		}
	}
})