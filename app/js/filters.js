var Filters = {
    areVisible: false,
    categories: document.getElementsByClassName('filter'),
    showTrigger: document.getElementById('filters-trigger'),
    wrap: document.getElementById('proj-filters'),
    projects: document.getElementById('filtered-projects'),
    preloader: document.getElementById('proj-preloader'),
    enabled: true,
    brandingProjects: document.getElementsByClassName("project-cover branding"),

    scrollPos: 0,

    init: function() {
        var pFilters = document.getElementById('proj-filters');
        if(!pFilters) return false;
        this.addEvents();
    },

    addEvents: function() {
        var _this = this;
        this.showTrigger.addEventListener('click', _this.toggleFilters.bind(this));

        window.addEventListener('scroll', throttle( function(){
            if(_this.detectScrollDirection(window.pageYOffset) === "down") {
                _this.hideBar();
            } else {
                _this.showBar();
            }

            _this.scrollPos = window.pageYOffset;
        }, 200 ));

        this.filterListener();
    },

    toggleFilters: function() {
        if (this.areVisible) {
            return this.hideFilters();
        } else {
            return this.showFilters();
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

    showBar: function() {
        this.wrap.classList.remove('hide')
    },
    hideBar: function() {
        this.wrap.classList.add('hide')
    },

    detectScrollDirection: function(newScrollPosition) {
        var _this = this;
        if (newScrollPosition > _this.scrollPos){
            return "down"
        } else {
            return "up"
        }
    },

    setFilter: function(filterName) {
        this.projects.classList.remove('books-only');
        this.projects.classList.remove('branding-only');

        this.projects.classList.add(filterName);
    },

    filterListener: function() {
        var _this = this;

        for (var i = 0; i < this.categories.length; i++) {
            this.categories[i].addEventListener("click", function(e){
                e.preventDefault();

                if (_this.enabled) {
                    _this.fadeOutCovers();
                    _this.enabled = false;

                    var _filterName = this.getAttribute("projects-filter");
                    _this.updateActiveFilter(this);

                    // Show branding projects to prevent inview bugs
                    for (var i = 0; i < _this.brandingProjects.length; i++) {
                        _this.brandingProjects[i].firstElementChild.firstElementChild.firstElementChild.classList.add('iv-active');
                    }

                    setTimeout(function(){
                        _this.setFilter(_filterName);
                        toTop();
                        
                        setTimeout(function(){
                            _this.fadeInCovers();
                            _this.enabled = true;
                        }, 600)
                    }, 600);
                }
            })
        }
    },

    updateActiveFilter: function(target) {
        for (var i = 0; i < this.categories.length; i++) {
            this.categories[i].classList.remove('active');
        }

        target.classList.add('active');
    },

    fadeOutCovers: function() {
        this.preloader.classList.add('show');
    },

    fadeInCovers: function() {
        this.preloader.classList.remove('show');
    }
}


