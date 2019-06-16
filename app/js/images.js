var Scroll = function() {
    var scroll_y = window.scrollY;
    var figures = document.getElementsByTagName("figure");
    this.els = [];
    this.init = function() {
        for (var i = 0; i < figures.length; i++) {
            var _fig = new Figure(figures[i]);
            this.els.push(_fig);
        }
    }
    this.render = function() {
        scroll_y = window.scrollY + HalfHeight;
        for (var i = 0; i < this.els.length; i++) {
            this.els[i].render(scroll_y);
        }
    }
    this.init();
    return this;
}

var Figure = function(el) {
    var _self = this;
    this.el = el;
    this.scale = 1;
    this.height = el.getBoundingClientRect().height;
    this.img = this.el.children[0];
    this.center = this.el.offsetTop + (this.height / 2);
    this.max_scroll = this.center + (this.height);
    this.dist = 0;
    this.scrollY = 0;
    this.render = function(_y) {
        this.scrollY += (_y - this.scrollY) * 0.1;
        this.dist = this.scrollY - this.center;
        this.near = (1 - this.dist / this.max_scroll);
        this.scale = Math.max(0.5, this.near);
        var translateY = 100 - (this.scale * 100);
        this.img.style = "opacity: " + this.near + "; transform: translate3d(0px, " + translateY + "px, 0px) scale(" + this.scale + ");";
        if (window.scrollY > this.max_scroll) {
            this.scrollY = this.max_scroll;
        }
    }
    return this;
}