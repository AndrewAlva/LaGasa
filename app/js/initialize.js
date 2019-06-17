// Trigger functions when the initial HTML document
// has been completely loaded and parsed,
// without waiting for stylesheets, images, and
// subframes to finish loading
var App = {
    scroll: null,
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
        if (window.location.href.indexOf('intro.html') > 0) {
            var cursor = new Cursor();
            RAF.add(cursor);
        }
        App.addEvents();
    },
    addEvents: function() {
        inView('.inview')
            .on('enter', function(el) {
                el.classList.add('in-view');
            })
            .on('exit', function(el) {
                el.classList.remove('in-view');
            });
        var elements = document.getElementsByClassName("change-page");
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            el.addEventListener("click", App.changePage, false);
        }
    },
    changePage: function(e) {
        e.preventDefault();
        var href = e.target.getAttribute("href");
        Preloader.show(function() {
            window.location.href = href;
        });
    }
}

document.addEventListener('DOMContentLoaded', App.init);

// Trigger functions after page is completely loaded
window.onload = function() {
    // scroll
    // DEBE ejecutarse aquí:
    // después de terminar de cargar todas las imágenes
    var scroll = new Scroll();
    RAF.add(scroll);
    Preloader.loaded();

    var pPreload = new ProjectPreloader();
    pPreload.init();
}