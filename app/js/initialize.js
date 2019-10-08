// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
var App = {
    scroll: null,
    preloader: null,
    init: function() {
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

        // Custom Cursor for intro.html and "close" projects
        if (window.innerWidth >= 992) {
            if(window.location.href.indexOf('intro.html') > 0) {
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

                var cursor = new Cursor({
                    string: "CLOSE",
                    fontFamily: "Saol",
                    fontSize: 18,
                    mouse_y: _cursorY + 18,
                    mouse_x: _cursorX,
                    maxRadius: _cursorRadius,
                    links: (document.getElementsByClassName('cases-page')[0]).getElementsByTagName('a')
                });

                RAF.add(cursor);
            }
        }

        Info.init();
        App.addEvents();
    },
    addEvents: function() {
        // inView('.inview')
        //     .on('enter', function(el) {
        //         el.classList.add('in-view');
        //     })
        //     .on('exit', function(el) {
        //         el.classList.remove('in-view');
        //     });

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
    // scroll
    // DEBE ejecutarse aquí:
    // después de terminar de cargar todas las imágenes
    // var scroll = new Scroll();
    // RAF.add(scroll);


    // inview animation for translate and opacity
    var inviewObjects = document.getElementsByClassName('iv-up');
    for (var i = 0; i < inviewObjects.length; i++) {
        var inview = InView(inviewObjects[i], function(isInView, data) {
            // if (isInView) {}
            if ((this.el.getBoundingClientRect().top - window.innerHeight) > 0) {
                // console.log("hidden");
                this.el.classList.remove('iv-active');
            } else {
                // console.log("show")
                this.el.classList.add('iv-active');
            }
        })
    }

    // inview animation for scaleY, translate and opacity
    var inviewObjects = document.getElementsByClassName('iv-stretch');
    for (var i = 0; i < inviewObjects.length; i++) {
        var inview = InView(inviewObjects[i], function(isInView, data) {
            // if (isInView) {}
            if ((this.el.getBoundingClientRect().top - window.innerHeight) > 0) {
                // console.log("hidden");
                this.el.classList.remove('iv-active');
            } else {
                // console.log("show")
                this.el.classList.add('iv-active');
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