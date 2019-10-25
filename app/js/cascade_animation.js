var Cascading = {
	els: [],

	init: function(aladdinHome){
		this.els = document.getElementsByClassName('mbrt-cascade firstload');
		this.animate(aladdinHome);

		// console.log("cascade_animation.js init()")
	},

	animate: function(aladdinHome){
		for (var i = 0; i < this.els.length; i++) {
			this.els[i].classList.add('animate')
		}
		this.aladdin(aladdinHome);
	},

	// .mbrt-cascade(class="#{dataCascade.titleFirstLoad}" data-cascade="fade-up" data-cascade-delay="#{dataCascade.titleDelay}" data-cascade-delay-mobile="#{dataCascade.titleDelayMob}")
	aladdin: function(aladdinHome){
		var _self = this;

		var _aladdinTitles = document.getElementsByClassName('cascade-aladdin');

		for (var i = 0; i < _aladdinTitles.length; i++) {
			var _copy = _aladdinTitles[i].innerText;
			var _aladdinChars = [];

			_self.splitString(_copy, _aladdinChars);
			if (i != 0) {
				_self.createSpans(_aladdinTitles[i], _aladdinChars, false, aladdinHome);
			} else {
				_self.createSpans(_aladdinTitles[i], _aladdinChars, true, aladdinHome);
			}
		}
	},

	splitString: function(string, charsArray) {
        for (var i = 0; i < string.length; i++) {
            charsArray.push(string.charAt(i))
        }
    },

    createSpans: function(target, charsArray, firstload, aladdinHome) {
    	var firstloadflag = firstload;
        var string = "";
        target.innerHTML = "";
        for (var i = 0; i < charsArray.length; i++) {
            var _space_class = charsArray[i] == " " ? "virtual-title-space" : "";

            if (!aladdinHome) {
            	string += "<span class='mbrt-cascade firstload " + _space_class + "' data-cascade='aladdin' data-aladdin-delay='" + (i+10) + "' data-aladdin-delay-mobile='" + (i+3) + "'>" + charsArray[i] + "</span>";
            } else if (!firstloadflag) {
            	string += "<span class='mbrt-cascade " + _space_class + "' data-cascade='aladdin' data-aladdin-delay='" + i + "' data-aladdin-delay-mobile='" + i + "'>" + charsArray[i] + "</span>";
            } else {
            	string += "<span class='mbrt-cascade firstload " + _space_class + "' data-cascade='aladdin' data-aladdin-delay='" + (i) + "' data-aladdin-delay-mobile='" + (i+1) + "'>" + charsArray[i] + "</span>";
            }
        }
        target.innerHTML = string;
    }
}




