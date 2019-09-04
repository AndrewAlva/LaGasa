var Cursor = function(args) {
    if (!args) args = {};

    var _self = this;
    var canvas, context;
    var fps = 60;
    var holdDuration = 0.8; // in seconds
    var mouse = {
        x: args.mouse_x || HalfWidth,
        y: args.mouse_y || MaxHeight - 130
    };

    this.x = mouse.x;
    this.y = mouse.y;
    this.mouseDown = false;
    this.cof = 0.1; //coefficient of friction
    this.coff = 0.2; //coefficient of friction for fonts
    this.coa = 1; //coefficient of acceleration
    this.maxRadius = args.maxRadius || 50;
    this.minRadius = 35;
    this.maxDiameter = 0;

    this.width = 1;
    this.color = "#e5e5e5";
    // this.color = "#1a1a1a";
    this.alpha = 0.2;
    this.arcStart = -HALF_PI;
    this.arcEnd = -HALF_PI;
    this.arcMax = HALF_PI * 3;

    // Regular links to interact
    this.links = args.links || {};

    // Text
    this.string = args.string || "Hold to enter";
    this.stringAlign = "center";
    this.stringBaseline = "middle";
    this.fontStyle = "normal";
    this.fontWeight = "lighter";
    this.fontSize = args.fontSize || 12;
    this.fontFamily = args.fontFamily || "Helvetica";
    this.fontDisplacement = 14;
    this.fontMaxDisplacement = 14;
    this.fontIsActive = false;
    this.holdEnd = false;
    this.holdCompleted = function() {
        this.onComplete();
    }
    this.onComplete = function() {
        var _this = this;
        this.minRadius = 0;
        this.string = "";

        setTimeout(function() {
            // window.location = window.location.origin + "/index.html";
            Preloader.show(function(){
                window.location = window.location.origin + "/index.html"
            });
        }, 300);
    }

    this.setAcceleration = function() {
        this.coa = -Math.abs(PI2 / (holdDuration * fps));
    }
    this.setRadius = function() {
        this.radius = this.maxRadius;
        this.maxDiameter = this.radius * 2;
    }
    this.followMouse = function() {
        this.x += (mouse.x - this.x) * this.cof;
        this.y += (mouse.y - this.y) * this.cof;
    }
    this.drawStroke = function() {
        this.arcEnd += this.coa;
        if (this.arcEnd < this.arcStart) {
            this.arcEnd = this.arcStart
        };
        if (this.arcEnd > this.arcMax) {
            this.arcEnd = this.arcMax;
            // Finish Hold functions
            if (!this.holdEnd) {
                this.holdCompleted();
                this.holdEnd = true;
            }
        }
    }
    this.stretchRadius = function() {
        if (this.mouseDown) {
            this.radius -= (this.radius - this.minRadius) * this.cof;
        } else {
            this.radius += (this.maxRadius - this.radius) * this.cof;
        }
        if (this.radius < this.minRadius) {
            this.radius = this.minRadius
        }
        if (this.radius > this.maxRadius) {
            this.radius = this.maxRadius
        }
    }

    this.drawFont = function() {
        context.font = this.fontStyle + " " + this.fontWeight + " " + this.fontSize + "px " + this.fontFamily;
        context.fillStyle = this.color;
        context.textAlign = this.stringAlign;
        context.textBaseline = this.stringBaseline;

        context.save();
        context.beginPath();
        context.rect(this.x - this.maxRadius, this.y - (this.fontSize / 2) - 2, this.maxDiameter, this.fontSize + 3);
        context.closePath();
        context.clip();
        context.fillText(this.string, this.x, this.y - this.fontDisplacement);
        context.restore();
    }

    this.animateFont = function() {
        if (this.fontIsActive) {
            if (!this.mouseDown) {
                this.fontDisplacement -= this.fontDisplacement * this.cof;
            } else {
                this.fontDisplacement += (this.fontMaxDisplacement - this.fontDisplacement) * this.coff;
            }
        }
    }
    this.activeFont = function() {
        this.fontIsActive = true;
    }
    this.setFontDisplacement = function() {
        this.fontDisplacement = this.fontSize + 2;
        this.fontMaxDisplacement = this.fontDisplacement;
    }

    this.update = function() {
        this.followMouse();
        this.drawStroke();
        this.stretchRadius();

        this.draw();
        this.drawFont();
        this.animateFont();
    }
    this.draw = function() {
        // background circle
        context.beginPath();
        context.globalAlpha = this.alpha;
        context.lineWidth = this.width;
        context.arc(this.x, this.y, this.radius, 0, PI2, false);
        context.strokeStyle = this.color;
        context.stroke();
        context.closePath();

        // animate on click hold circle
        context.beginPath();
        context.globalAlpha = 1;
        context.lineWidth = this.width;
        context.arc(this.x, this.y, this.radius, this.arcStart, this.arcEnd, false);
        context.strokeStyle = this.color;
        context.stroke();
        context.closePath();
    }

    this.init = function() {
        canvas = document.createElement('canvas');
        context = canvas.getContext('2d');
        document.body.appendChild(canvas);

        window.addEventListener("resize", function() {
            _self.onResize();
        }, false);

        window.addEventListener("mousemove", function(event) {
            mouse = {
                x: event.clientX,
                y: event.clientY
            };
        });

        window.addEventListener("mousedown", function() {
            _self.coa = _self.coa * -1;
            _self.mouseDown = true;
        });
        window.addEventListener("mouseup", function() {
            _self.coa = _self.coa * -1;
            _self.mouseDown = false;
        });

        for (var i = 0; i < this.links.length; i++) {
            this.links[i].addEventListener("mouseenter", function(){
                _self.mouseDown = true;
                _self.minRadius = 15;
            })

            this.links[i].addEventListener("mouseleave", function(){
                _self.mouseDown = false;
                debounce(function(){
                    _self.minRadius = 35;
                },200)
                
            })
        }

        setTimeout(function() {
            _self.activeFont();
        }, 500);
        this.onResize();
        this.setAcceleration();
        this.setRadius();
        this.setFontDisplacement();
        //this.radius = 0;
    }

    this.render = function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.update();
    }

    this.onResize = function() {
        canvas.width = MaxWidth;
        canvas.height = MaxHeight;
    }
    this.init();
    return this;
};