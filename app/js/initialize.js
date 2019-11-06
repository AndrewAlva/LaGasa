window.onpageshow = function (event) {
    if (event.persisted) {
        window.location.reload();
    }
};

// If users have never visited the site and are first getting to the home ('/' || '/index.html')
// if( (window.location.href.indexOf('index.html') > 0 || window.location.href.indexOf('foreword.html') > 0 || window.location.pathname == '/') && localStorage.getItem("LaGasaVisited") == undefined) {

// If users have never visited the website, redirect them to 'foreword'.
if(localStorage.getItem("LaGasaVisited10") == undefined) {
    localStorage.setItem("LaGasaVisited10", true);
    window.location = window.location.origin + "/foreword.html";
}





// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
var App = {
    scroll: null,
    preloader: null,
    init: function() {
        deviceDetector.init();
        
        // Cascade animation trigger
        if (window.location.href.indexOf("foreword") > 0) {
            Cascading.init(false);
        } else {
            Cascading.init(true);
        }


        RAF.init();
        Contact();
        Bio();
        Filters.init();
        Menu.init();

        // Projects cover shifter init
        var pShifter = document.getElementById('projects-shifter');
        if (pShifter) {
            var mb_ImgShifter = new FollowObject({
                "obj": document.getElementById('projects-shifter')
            });
            RAF.add(mb_ImgShifter);
        }

        // Custom Cursor for foreword.html and "close" projects
        if (deviceDetector.device == "desktop") {
            if(window.location.href.indexOf('foreword.html') > 0) {
                var cursor = new Cursor();
                RAF.add(cursor);

            } else if (window.location.href.indexOf('index.html') < 0 && window.location.href.indexOf('bio.html') < 0 && window.location.href.indexOf('contact.html') < 0 && window.location.pathname != "/" && document.getElementsByClassName('case-wrap')[0] != undefined){
                var _grid = document.getElementsByClassName('content-grid')[0];
                var _gridData = _grid.getBoundingClientRect();
                var _cursorX = _gridData.left + _gridData.width - parseFloat(window.getComputedStyle(_grid, null).getPropertyValue('padding-right'));
                var _cursorRadius = 50;
                _cursorX -= _cursorRadius;

                var _caseWrap = document.getElementsByClassName('case-wrap')[0];
                var _caseWrapData = _caseWrap.getBoundingClientRect();
                var _cursorY = _caseWrapData.y;

                var _senseLimit;
                if (window.innerWidth >= 1441) {
                    _senseLimit = 140;
                } else if (window.innerWidth >= 1200){
                    _senseLimit = 120;
                } else if (window.innerWidth >= 992){
                    _senseLimit = 100;
                } else {
                    _senseLimit = 20;
                }

                var cursor = new Cursor({
                    string: "CLOSE",
                    fontFamily: "Saol",
                    fontSize: 18,
                    mouse_y: _cursorY + 18,
                    mouse_x: _cursorX,
                    maxRadius: _cursorRadius,
                    links: (document.getElementsByClassName('cases-page')[0]).getElementsByTagName('a'),
                    senseArea: true,
                    senseLimit: _senseLimit
                });

                RAF.add(cursor);
            }
        }

        Info.init();
        App.addEvents();
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

        // Si es proyecto abre el otro  preloader
        if (href.indexOf("?project") > 0) {
            App.preloader.show(e.target.getAttribute("data-text"), function() {
                window.location.href = href;
            });
        } else {
            Preloader.show(function() {
                window.location.href = href;
            });
        }
    }
}
if (window.location.search.indexOf("project") > 0) {
    window["nextTitle"].classList.remove("hide");
}

document.addEventListener('DOMContentLoaded', App.init);

// Trigger functions after page is completely loaded
window.onload = function() {

    // parallax
    // DEBE ejecutarse aquí: después de terminar de cargar todas las imágenes
    var parallax = new Parallax();
    RAF.add(parallax);

    // General inview animation, linked with "Cascading" system
    var inviewObjects = document.getElementsByClassName('mbrt-cascade');
    for (var i = 0; i < inviewObjects.length; i++) {
        var inview = InView(inviewObjects[i], function(isInView, data) {
            if ((this.el.getBoundingClientRect().top - window.innerHeight) > 0) {
                this.el.classList.remove('animate');
            } else {
                this.el.classList.add('animate');
            }
        })
    }


    App.preloader = new ProjectPreloader();
    if (window.location.search.indexOf("project") > 0) {
        App.preloader.init();
    } else {
        Preloader.loaded();
    }

}