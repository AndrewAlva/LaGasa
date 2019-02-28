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
});


// Trigger functions after page is completely loaded
window.onload = function() {
    // Do something, remove preloader perhaps
    console.log("Page fully loaded.");
    console.log("Initialize.js");
}