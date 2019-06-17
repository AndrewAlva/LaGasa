// Menu open/close functionality
var Menu = {
    opened: false,
    menuBtn: null,
    container: null,
    wrapper: null,
    alphaContainer: 0,
    init: function() {
        this.wrapper = document.getElementById('main-menu');
        this.container = document.getElementById('menu-container');
        this.menuBtn = document.getElementById('menu-trigger');
        this.addEvents();
    },
    addEvents: function() {
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', function() {
                if (Menu.opened) {
                    Menu.opened = Menu.close();
                } else {
                    Menu.opened = Menu.open();
                }
            });
        }
    },
    open: function() {
        Menu.wrapper.classList.add('opened');
        var els = document.getElementsByClassName("mask-menu");
        for (var i = 0, l = els.length; i < l; ++i) {
            Menu.setActive(els[i], i * 60 + 150);
        }
        var els = document.getElementsByClassName("menu-link");
        for (var i = 0, l = els.length; i < l; ++i) {
            Menu.setActive(els[i], i * 35 + 450);
        }
        var els = document.getElementsByClassName("section-link");
        for (var i = 0, l = els.length; i < l; ++i) {
            Menu.setActive(els[i], i * 35 + 450);
        }
        return true;
    },
    close: function() {
        Menu.wrapper.classList.remove('opened');
        var els = document.getElementsByClassName("mask-menu");
        for (var i = 0, l = els.length; i < l; ++i) {
            els[i].classList.remove('active');
        }
        var els = document.getElementsByClassName("menu-link");
        for (var i = 0, l = els.length; i < l; ++i) {
            els[i].classList.remove('active');
        }
        var els = document.getElementsByClassName("section-link");
        for (var i = 0, l = els.length; i < l; ++i) {
            els[i].classList.remove('active');
        }
        return false;
    },
    setActive: function(el, delay) {
        setTimeout(function() {
            el.classList.add('active');
        }, delay);
    }
}

// Opened menu
// Projects cover shifter
var mousePosition = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}

var FollowObject = function(args) {
    if (!args) args = {};

    this.obj = args.obj;
    this.imgCanvas = this.obj.querySelector('.imgs-wrap');
    this.imgTriggers = this.obj.querySelectorAll('.title');
    this.imgs = this.imgCanvas.querySelectorAll('img');
    this.pos = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };
    this.cof = 0.04;
    this.activeX = args.activeX || false;
    this.activeY = args.activeY || true;
    this.scrollCancel = args.scrollCancel || false;

    this.updatePosition = function(_x, _y) {
        this.pos.x += (_x - this.pos.x) * this.cof;
        this.pos.y += (_y - this.pos.y) * this.cof;
    };

    this.displaceImgs = function() {
        var _displacement;
        if (!this.activeX) {
            _displacement = "translate(0px, " + this.pos.y + "px)";
        } else {
            _displacement = "translate(" + this.pos.x + "px, " + this.pos.y + "px)";
        }

        this.applyTransform(_displacement);
    };

    this.applyTransform = function(style) {
        this.imgCanvas.style.webkitTransform = style;
        this.imgCanvas.style.MozTransform = style;
        this.imgCanvas.style.msTransform = style;
        this.imgCanvas.style.OTransform = style;
        this.imgCanvas.style.transform = style;
    };

    this.setupListeners = function() {
        this.mouseoverListener();
        this.mouseoutListener();

        if (this.scrollCancel) {
            this.mouseScroll();
        }
    };

    this.mouseoverListener = function() {
        var _this = this;

        for (var i = 0; i < this.imgTriggers.length; i++) {
            _this.imgTriggers[i].addEventListener('mouseover', function() {
                _this.hideImgs() /* Not necessary, codepen display hack */
                _this.showImg(_this.getImgId(this))
            });
        }
    };
    this.mouseoutListener = function() {
        var _this = this;

        for (var i = 0; i < this.imgTriggers.length; i++) {
            _this.imgTriggers[i].addEventListener('mouseout', function() {
                _this.hideImgs()
            });
        }
    };
    this.mouseScroll = function() {
        var _this = this;

        window.addEventListener('scroll', function() {
            _this.hideImgs()
        });
    };

    this.getImgId = function(target) {
        return target.getAttribute("data-id");
    }

    this.hideImgs = function() {
        var _this = this;
        for (var i = 0; i < this.imgs.length; i++) {
            _this.imgs[i].classList.remove('active');
        }
    }
    this.showImg = function(imgIndex) {
        this.imgs[imgIndex].classList.add('active');
    }


    this.init = function() {
        this.setupListeners();
        this.displaceImgs();
    };
    this.render = function() {
        this.updatePosition(mousePosition.x, mousePosition.y);
        this.displaceImgs();
    }
    this.init();
    return this;
}

window.addEventListener('mousemove', function(e) {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
});