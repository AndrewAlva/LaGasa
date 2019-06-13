// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
document.addEventListener('DOMContentLoaded', function() {
    // Labels & input bottom line states
	// Add/remove class to ".sz-formfield" to change behavior of its own label and bottom line
		var sz_inputs = document.getElementsByClassName('sz-formfield');

		for (var i = sz_inputs.length - 1; i >= 0; i--) {
			sz_inputs[i].addEventListener('focusout', function(){
				if (this.value){
					this.classList.add('filled');
				} else {
					this.classList.remove('filled');
				}
			});
		}

	// Filters show/hide functionality
		var Filters = {};
		var pFilters = document.getElementById('proj-filters');
		if (pFilters) {
			Filters = {
				areVisible: true,
				categories: document.getElementsByClassName('filter'),
				showTrigger: document.getElementById('filters-trigger'),

				showListener: function(){
					var _this = this;
					this.showTrigger.addEventListener('click', function(){
						_this.toggleFilters();
					});
				},
				toggleFilters: function(){
					if(this.areVisible){
						this.hideFilters();
					} else {
						this.showFilters();
					}
				},

				hideFilters: function(){
					var _this = this;
					for (var i = this.categories.length - 1; i >= 0; i--) {
						_this.categories[i].classList.remove('show');
					}

					this.areVisible = false;
				},
				showFilters: function(){
					var _this = this;
					for (var i = this.categories.length - 1; i >= 0; i--) {
						(function(i){
							setTimeout(function(){
								_this.categories[i].classList.add('show');
							}, i * 120);
						})(i);
					}
					this.areVisible = true;
				},



				init: function(){
					this.showListener();
				}
			}

			Filters.init();
		}


	// Opened menu
	// Projects cover shifter init
		var pShifter = document.getElementById('projects-shifter');
		if (pShifter){
			mb_ImgShifter = new FollowObject({
				"obj": document.getElementById('projects-shifter')
			});
			mb_ImgShifter.init();
			menuAnimate();
		}
});


// Trigger functions after page is completely loaded
window.onload = function() {
    // Do something, remove preloader perhaps
    console.log("Page fully loaded.");
    console.log("Initialize.js");
}


