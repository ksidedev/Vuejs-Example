var showHide = new Vue({
  	el: '#show-hide',
  	data: {
    	seen: true,
    	message: ''
  	},
  	methods: {
	    hide: function (index) {
      		this.seen = false
      		console.log(showHide.seen);
      		this.message = 'Well done'
	    }
	    // hiddenMessage: function (index) {
     //  		this.message = ''
	    // }
  	}
})
console.log(showHide.seen);