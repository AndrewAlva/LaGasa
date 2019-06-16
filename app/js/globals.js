var PI2 = Math.PI*2;
var HALF_PI = Math.PI/2;


var MaxWidth = window.innerWidth;
var MaxHeight = window.innerHeight;
var HalfWidth = MaxWidth / 2;
var HalfHeight = MaxHeight / 2;

var _resize = debounce(onWindowResize, 200);
window.addEventListener('resize', _resize, false);

function onWindowResize(){
    MaxWidth = window.innerWidth;
    MaxHeight = window.innerHeight;
    HalfWidth = MaxWidth / 2;
    HalfHeight = MaxHeight / 2;
}