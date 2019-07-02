var Info = {
	isActive: false,
	trigger: document.getElementById('case-info-trigger'),
	wrap: document.getElementById('case-info-wrap'),

	init: function(){
		this.triggerListener();
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
	}
}