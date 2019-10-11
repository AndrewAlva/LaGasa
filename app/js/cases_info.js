var Info = {
	isActive: false,
	trigger: document.getElementById('case-info-trigger'),
	wrap: document.getElementById('case-info-wrap'),
	animatables: document.getElementsByClassName('js-cascade'),

	init: function(){
		if (this.trigger) {
			this.triggerListener();
		}

		if(this.animatables){
			this.enableAnimation();
		}
	},

	toggleActive: function(){
		if (this.isActive){
			this.isActive = false;
			this.hide();
		} else {
			this.isActive = true;
			this.show();
		}
	},

	show: function(){
		this.turnOn();
	},

	hide: function(){
		this.turnOff();
	},

	turnOn: function(){
		this.trigger.classList.add('opened');
		this.wrap.classList.add('opened')
	},

	turnOff: function(){
		this.trigger.classList.remove('opened');
		this.wrap.classList.remove('opened')
	},

	triggerListener: function(){
		var _self = this;
		this.trigger.addEventListener('click', function(){
			_self.toggleActive();
		})
	},

	enableAnimation: function(){
		for (var i = 0; i < this.animatables.length; i++) {
			var _classString = "js-cascade-" + i;
			this.animatables[i].classList.add(_classString);
		}
	}
}