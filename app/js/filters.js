var Filters = {
    areVisible: false,
    categories: document.getElementsByClassName('filter'),
    showTrigger: document.getElementById('filters-trigger'),
    init: function() {
        var pFilters = document.getElementById('proj-filters');
        if(!pFilters) return false;
        this.addEvents();
    },
    addEvents: function() {
        var _this = this;
        this.showTrigger.addEventListener('click', _this.toggleFilters.bind(this));
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
    }
}