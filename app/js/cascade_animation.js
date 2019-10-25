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
		this.aladdin();
	},

	// .mbrt-cascade(class="#{dataCascade.titleFirstLoad}" data-cascade="fade-up" data-cascade-delay="#{dataCascade.titleDelay}" data-cascade-delay-mobile="#{dataCascade.titleDelayMob}")
	aladdin: function(){
		var _self = this;

		var _aladdinTitles = document.getElementsByClassName('cascade-aladdin');

		for (var i = 0; i < _aladdinTitles.length; i++) {
			var _copy = _aladdinTitles[i].innerText;
			var _aladdinChars = [];

			_self.splitString(_copy, _aladdinChars);
			if (i != 0) {
				_self.createSpans(_aladdinTitles[i], _aladdinChars);
			} else {
				_self.createSpans(_aladdinTitles[i], _aladdinChars, true);
			}
		}
	},

	splitString: function(string, charsArray) {
        for (var i = 0; i < string.length; i++) {
            charsArray.push(string.charAt(i))
        }
    },

    createSpans: function(target, charsArray, firstload) {
    	var firstloadflag = firstload;
        var string = "";
        target.innerHTML = "";
        for (var i = 0; i < charsArray.length; i++) {
            var _space_class = charsArray[i] == " " ? "home-title-space" : "";
            if (!firstloadflag) {
            	string += "<span class='mbrt-cascade " + _space_class + "' data-cascade='aladdin' data-aladdin-delay='" + i + "' data-aladdin-delay-mobile='" + i + "'>" + charsArray[i] + "</span>";
            } else {
            	string += "<span class='mbrt-cascade firstload " + _space_class + "' data-cascade='aladdin' data-aladdin-delay='" + (i+3) + "' data-aladdin-delay-mobile='" + (i+1) + "'>" + charsArray[i] + "</span>";
            }
        }
        target.innerHTML = string;
    }
}




