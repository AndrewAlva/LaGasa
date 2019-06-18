var Preloader = {
    el: document.getElementById("preloader"),
    alpha: 1,
    loaded: function() {
        Preloader.hide();
    },
    off: function() {
        Preloader.el.style = "display: none";
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
    this.currentString = this.currentTitle.innerText;
    this.currentChars = [];

    this.nextTitle = document.getElementById('nextTitle');
    this.nextX = this.nextTitle.getBoundingClientRect().top;
    this.nextString = this.nextTitle.innerText;
    // this.nextString = this.nextTitle.innerText.split(" ").join("_");
    this.nextChars = [];
    this.charsDelay = 12;

    this.splitString = function(string, charsArray) {
        for (var i = 0; i < string.length; i++) {
            charsArray.push(string.charAt(i))
        }
    }

    this.createSpans = function(target, charsArray) {
        var string = "";
        target.innerHTML = "";
        for (var i = 0; i < charsArray.length; i++) {
            var _space_class = charsArray[i] == " " ? "title-space" : "";
            string += "<span class='" + _space_class + "'>" + charsArray[i] + "</span>";
        }
        target.innerHTML = string;
    }

    this.applyTransform = function(target) {
        var titlesDistance = this.nextX - this.currentX;
        // this.nextTitle.style = "transform: translate3d(0px, -" + titlesDistance + "px, 0px);";
        setTimeout(function() {
            for (var i = 0; i < target.children.length; i++) {
                (function(i) {
                    setTimeout(function() {
                        target.children[i].classList.add("transition");
                        target.children[i].style = "transform: translate3d(0px, -" + titlesDistance + "px, 0px);";
                    }, (i * _self.charsDelay));

                    if (i == target.children.length - 1) {
                        setTimeout(function() {
                            _self.hide();
                        }, 1000 + (i * _self.charsDelay))
                    }
                })(i);
            }
        }, 500);
    }
    this.loaded = function() {
        this.hide();
    }
    this.hide = function() {
        toTop(50);
        new TWEEN.Tween(_self).to({
            alpha: 0
        }, 600).onUpdate(function() {
            _self.el.style = "opacity: " + _self.alpha
        }).onComplete(function() {
            _self.el.style = "display: none";
        }).start();
    }
    this.show = function(text, callback) {
        this.currentChars = [];
        this.splitString(text, this.currentChars);
        this.createSpans(this.nextTitle, this.currentChars);
        new TWEEN.Tween(_self).to({
            alpha: 1
        }, 300).onUpdate(function() {
            _self.el.style = "opacity: " + _self.alpha
        }).onComplete(function() {
            if (callback) callback();
        }).start();
    };

    this.init = function() {
        Preloader.off(); // Oculta el preloader default
        this.splitString(this.currentString, this.currentChars);
        this.createSpans(this.currentTitle, this.currentChars);

        this.splitString(this.nextString, this.nextChars);
        this.createSpans(this.nextTitle, this.nextChars);
        this.applyTransform(this.nextTitle);
    }
}