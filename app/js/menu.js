// Menu open/close functionality
	var menu = document.getElementById('main-menu');
	if (menu) {
		var menu_trigger = document.getElementById('menu-trigger');
		var menu_opened = false;

		menu_trigger.addEventListener('click', function(){
			if (!menu_opened) {
				menu.classList.add('opened');
				menu_opened = true;
			} else {
				menu.classList.remove('opened');
				menu_opened = false;
			}
		});
	}

// Opened menu
// Projects cover shifter
	var mousePosition = {
		x: window.innerWidth/2,
		y: window.innerHeight/2
	}

	var FollowObject = function(args){
		if (!args) args = {};

		this.obj = args.obj;
		this.imgCanvas = this.obj.querySelector('.imgs-wrap');
		this.imgTriggers = this.obj.querySelectorAll('.title');
		this.imgs = this.imgCanvas.querySelectorAll('img');
		this.pos = {
			x: window.innerWidth/2,
			y: window.innerHeight/2
		};
		this.cof = 0.04; 
		
		this.updatePosition = function(_x,_y){
			this.pos.x += (_x - this.pos.x) * this.cof;
			this.pos.y += (_y - this.pos.y) * this.cof;
		};

		this.displaceImgs = function(){
			var _displacement = "translate(0px, " + this.pos.y + "px)";
			this.applyTransform(_displacement);
		};

		this.applyTransform = function(style){
			this.imgCanvas.style.webkitTransform = style;
			this.imgCanvas.style.MozTransform = style;
			this.imgCanvas.style.msTransform = style;
			this.imgCanvas.style.OTransform = style;
			this.imgCanvas.style.transform = style;
		};

		this.setupListeners = function(){
			this.mouseoverListener();
			this.mouseoutListener();
		};

		this.mouseoverListener = function(){
			var _this = this;
			
			for(var i = 0; i < this.imgTriggers.length; i++){
				_this.imgTriggers[i].addEventListener('mouseover', function(){
					_this.hideImgs() /* Not necessary, codepen display hack */
					_this.showImg( _this.getImgId(this) )
				});
			}
		};
		this.mouseoutListener = function(){
			var _this = this;
			
			for(var i = 0; i < this.imgTriggers.length; i++){
				_this.imgTriggers[i].addEventListener('mouseout', function(){
					_this.hideImgs()
				});
			}
		};
		
		this.getImgId = function(target){
			return target.getAttribute("data-id");
		}
		
		this.hideImgs = function(){
			var _this = this;
			for(var i = 0; i < this.imgs.length; i++){
				_this.imgs[i].classList.remove('active');
			}
		}
		this.showImg = function(imgIndex){
			this.imgs[imgIndex].classList.add('active');
		}
		
		
		this.init = function(){
			this.setupListeners();
			this.displaceImgs();
		};
	}


	function menuAnimate() {
		requestAnimationFrame(menuAnimate);
		menuRender();
	}

	function menuRender() {
		mb_ImgShifter.updatePosition(mousePosition.x, mousePosition.y);
		mb_ImgShifter.displaceImgs();
	}


	window.addEventListener('mousemove', function(e){
		mousePosition.x = e.clientX;
		mousePosition.y = e.clientY;
	});


	var MenuShifter = {}
	var pShifter = document.getElementById('projects-shifter');
	if (pShifter){
		var mb_ImgShifter = new FollowObject({
			"obj": document.getElementById('projects-shifter')
		});
		mb_ImgShifter.init();
		menuAnimate();

	}
