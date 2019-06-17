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
    this.el = document.getElementById('case-preloader');
    this.alpha = 1;

    this.currentTitle = document.getElementById('currentTitle');
    this.currentX = getY(this.currentTitle);

    this.nextTitle = document.getElementById('nextTitle');
    this.nextX = this.nextTitle.getBoundingClientRect().top;
    this.nextString = this.nextTitle.innerText;
    // this.nextString = this.nextTitle.innerText.split(" ").join("_");
    this.chars = [];
    this.charsDelay = 20;

    this.splitString = function(string, charsArray){
        for (var i = 0; i < string.length; i++) {
            charsArray.push(string.charAt(i))
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
        setTimeout(function(){
            for (var i = 0; i < this.nextTitle.children.length; i++) {
                (function(i){
                    setTimeout(function(){
                        _self.nextTitle.children[i].style = "transform: translate3d(0px, -" + titlesDistance + "px, 0px);";
                    }, (i * _self.charsDelay));

                    if (i == _self.nextTitle.children.length - 1) {
                        setTimeout(function(){
                            _self.hide();
                        }, 1000 + (i * _self.charsDelay))
                    }
                })(i);
            }
        }, 500);
    }


    this.loaded = function(){
        this.hide();
    }
    this.hide = function(){
        new TWEEN.Tween(_self).to({
            alpha: 0
        }, 600).onUpdate(function() {
            _self.el.style = "opacity: " + _self.alpha
        }).onComplete(function() {
            _self.el.style = "display: none";
        }).start();
    }
    this.show = function(callback){
        new TWEEN.Tween(_self).to({
            alpha: 1
        }, 300).onUpdate(function() {
            _self.el.style = "opacity: " + _self.alpha
        }).onComplete(function() {
            if (callback) callback();
        }).start();
    };

    this.init = function(){
        this.splitString(this.nextString, this.chars);
        this.createSpans();
        this.applyTransform();
    }
}