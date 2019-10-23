var Cascading = {
	els: [],

	init: function(){
		this.els = document.getElementsByClassName('mbrt-cascade firstload');
		this.animate();

		// console.log("cascade_animation.js init()")
	},

	animate: function(){
		for (var i = 0; i < this.els.length; i++) {
			this.els[i].classList.add('animate')
		}
	}
}