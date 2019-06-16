var Texts_Mask = {
	ups: document.getElementsByClassName("up-in"),


	showUps: function(){
		for (var i = 0; i < this.ups.length; i++) {
			var _this = this;

			(function(i){
				setTimeout(function(){
					_this.ups[i].classList.add("active");
				}, (i * 150));
			})(i);
		}
	},


	init: function(){
		this.showUps()
	}
}

Texts_Mask.init();