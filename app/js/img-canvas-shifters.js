// Animation functions
	function bioAnimate() {
		requestAnimationFrame(bioAnimate);
		bioRender();
	}

	function bioRender() {
		bio_ImgShifter_1.updatePosition(mousePosition.x, mousePosition.y);
		bio_ImgShifter_1.displaceImgs();

		bio_ImgShifter_2.updatePosition(mousePosition.x, mousePosition.y);
		bio_ImgShifter_2.displaceImgs();
	}

// Img shifter instances
	var opShifter = document.getElementById('op-shifter-1');
	if (opShifter){
		bio_ImgShifter_1 = new FollowObject({
			"obj": document.getElementById('op-shifter-1'),
			"activeX": true,
			"scrollCancel": true
		});

		bio_ImgShifter_2 = new FollowObject({
			"obj": document.getElementById('op-shifter-2'),
			"activeX": true,
			"scrollCancel": true
		});

		bio_ImgShifter_1.init();
		bio_ImgShifter_2.init();


		bioAnimate();
	}


var mb_ImgShifter, bio_ImgShifter_1, bio_ImgShifter_2;