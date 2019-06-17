// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
document.addEventListener('DOMContentLoaded', function() {
    // Labels & input bottom line states
    // Add/remove class to ".sz-formfield" to change behavior of its own label and bottom line
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

    // Filters show/hide functionality
    var Filters = {};
    var pFilters = document.getElementById('proj-filters');
    if (pFilters) {
        Filters = {
            areVisible: false,
            categories: document.getElementsByClassName('filter'),
            showTrigger: document.getElementById('filters-trigger'),
            showListener: function() {
                var _this = this;
                this.showTrigger.addEventListener('click', function() {
                    _this.toggleFilters();
                });
            },
            toggleFilters: function() {
                if (this.areVisible) {
                    this.hideFilters();
                } else {
                    this.showFilters();
                }
            },

            hideFilters: function() {
                var _this = this;
                for (var i = this.categories.length - 1; i >= 0; i--) {
                    _this.categories[i].classList.remove('show');
                }

                this.areVisible = false;
            },
            showFilters: function() {
                var _this = this;
                for (var i = this.categories.length - 1; i >= 0; i--) {
                    (function(i) {
                        setTimeout(function() {
                            _this.categories[i].classList.add('show');
                        }, i * 120);
                    })(i);
                }
                this.areVisible = true;
            },



            init: function() {
                this.showListener();
            }
        }

        Filters.init();
    }


    // Opened menu
    Menu.init();
    // Projects cover shifter init
    var pShifter = document.getElementById('projects-shifter');
    if (pShifter) {
        var mb_ImgShifter = new FollowObject({
            "obj": document.getElementById('projects-shifter')
        });
        RAF.add(mb_ImgShifter);
    }

    App.init();
});

var App = {
    scroll: null,
    init: function() {
        RAF.init();
        App.addEvents();
        Bio();
        if(window.location.href.indexOf('intro.html') > 0){
            var cursor = new Cursor();
            RAF.add(cursor);
        }
    },
    addEvents: function() {
        var elements = document.getElementsByClassName("change-page");
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            el.addEventListener("click", App.changePage, false);
        }
    },
    changePage: function(e) {
        e.preventDefault();
        var href = e.target.getAttribute("href");
        Preloader.show(function() {
            window.location.href = href;
        });
    }
}

// Trigger functions after page is completely loaded
window.onload = function() {
    // scroll
    // DEBE ejecutarse aquí:
    // después de terminar de cargar todas las imágenes
    var scroll = new Scroll();
    RAF.add(scroll);
    Preloader.loaded();
    
    var pPreload = new ProjectPreloader();
    pPreload.init();
}