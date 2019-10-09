var Parallax = function(){
	// Select elements that will be affected
	var objs = document.getElementsByClassName('parallax');
	this.floatingObjs = [];

	this.init = function(){
		for (var i = 0; i < objs.length; i++) {
		// for (var i = 4; i < 5; i++) {
			var _floating = new Floater(objs[i]);
			this.floatingObjs.push(_floating);
		}

		console.log(this.floatingObjs)
	}
	this.render = function(){
		if (window.innerWidth >= 992) {
			for (var i = 0; i < this.floatingObjs.length; i++) {
				this.floatingObjs[i].render();
			}
		}
	}

	this.init();
	return this;
}

var Floater = function(el){
	var _self = this;
	this.el = el;

	// Get their position according to viewport scroll position
	this.top = this.el.getBoundingClientRect().top;
	
	// Get its height
	this.height = this.el.getBoundingClientRect().height;

	this.yDist = 0;
	// this.maxDist = 300; // pixels
	this.maxDist = 15; // vw
	this.cof = 0.1;
	this.intensity = this.el.getAttribute("parallax-intensity");

	
	this.displacing = function(){
		// Detect if they are inside the viewport
		// If so, calculate scroll displacement
		if (this.top + this.height > 0 && this.top < window.innerHeight) {
			// Scroll displacement proportion
			var dist = window.innerHeight - this.top ;
			var distRatio = dist / (window.innerHeight + this.height);

			// this.yDist += (dist - this.yDist) * this.cof;
			// this.yDist += ((distRatio * this.maxDist) - this.yDist) * this.cof;

			// coordinated with css transition ease-out
			this.yDist = (distRatio * this.maxDist) * this.intensity;

			this.el.style = "transform: translate3d(0px, " + this.yDist + "vw, 0px);";

			
			// console.log(this.yDist);
		}
	}

	this.update = function() {
		// Constantly check object position according to top of the screen
		this.top = this.el.getBoundingClientRect().top;
		this.displacing();
	}



	this.render = function() {
		this.update();
	}

	return this;
}