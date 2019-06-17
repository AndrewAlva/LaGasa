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


var ProjectPreloader = function() {
    var _self = this;
    this.el = null;
    this.alpha = 1;

    this.currentTitle = document.getElementById('currentTitle');
    this.currentX = getY(this.currentTitle);

    this.nextTitle = document.getElementById('nextTitle');
    this.nextX = this.nextTitle.getBoundingClientRect().top;
    this.nextString = this.nextTitle.innerText;
    // this.nextString = this.nextTitle.innerText.split(" ").join("_");
    this.chars = [];

    this.loaded = function(){}
    this.hide = function(){}
    this.show = function(callback){};

    this.splitString = function(){
        for (var i = 0; i < this.nextString.length; i++) {
            _self.chars.push(_self.nextString.charAt(i))
        }
    }

    this.createSpans = function(){
        var string = "";
        this.nextTitle.innerHTML = "";
        for (var i = 0; i < this.chars.length; i++) {
            var _space_class = this.chars[i] == " " ? "title-space" : "";
            string += "<span class='"+_space_class+"'>" + _self.chars[i] + "</span>";
        }
        this.nextTitle.innerHTML = string;
    }

    this.applyTransform = function(){
        var titlesDistance = this.nextX - this.currentX;
        // this.nextTitle.style = "transform: translate3d(0px, -" + titlesDistance + "px, 0px);";
        for (var i = 0; i < this.nextTitle.children.length; i++) {
            (function(i){
                setTimeout(function(){
                    _self.nextTitle.children[i].style = "transform: translate3d(0px, -" + titlesDistance + "px, 0px);";
                }, (i * 50));
            })(i);
        }
    }

    this.init = function(){
        console.log('currentX: ' + this.currentX);
        console.log('nextX: ' + this.nextX);
        this.splitString();
        this.createSpans();
        this.applyTransform();
    }
}