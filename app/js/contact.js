function Contact() {
    var sz_inputs = document.getElementsByClassName('sz-formfield');
    for (var i = sz_inputs.length - 1; i >= 0; i--) {
        sz_inputs[i].addEventListener('focusout', function() {
            if (this.value) {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
        });
    }
}