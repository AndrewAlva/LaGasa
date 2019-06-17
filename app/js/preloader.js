var Preloader = {
    el: null,
    alpha: 1,
    loaded: function() {
        Preloader.el = document.getElementById("preloader");
        Preloader.hide();
    },
    hide: function() {
        toTop(300);
        new TWEEN.Tween(Preloader).to({
            alpha: 0
        }, 600).onUpdate(function() {
            Preloader.el.style = "opacity: " + Preloader.alpha
        }).onComplete(function() {
            Preloader.el.style = "display: none";
        }).start();
    },
    show: function(callback) {
        toTop(600);
        // Preloader.el.style = "display: none; opacity: 0;";
        new TWEEN.Tween(Preloader).to({
            alpha: 1
        }, 300).onUpdate(function() {
            Preloader.el.style = "opacity: " + Preloader.alpha
        }).onComplete(function() {
            if (callback) callback();
        }).start();
    }
}


var PreloaderProjects = function() {
    this.el = null;
    this.alpha = 1;

    this.currentTitle = document.getElementById('currentTitle');
    this.currentX = this.currentTitle.getBoundingClientRect().top;

    this.nextTitle = document.getElementById('nextTitle');
    this.nextX = this.nextTitle.getBoundingClientRect().top;

    this.loaded = function(){}
    this.hide = function(){}
    this.show = function(callback){};

    this.applyTransform = function(){
        var titlesDistance = this.nextX - this.currentX;
        this.nextTitle.style = "transform: translate3d(0px, " + titlesDistance + "px, 0px);";
    }

    this.init = function(){}
}