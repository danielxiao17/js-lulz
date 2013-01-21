(function () {
    "use strict";
    /**
     * Created with JetBrains WebStorm.
     * User: Excess
     * Date: 1/11/13
     * Time: 6:51 PM
     * To change this template use File | Settings | File Templates.
     */

    //frametimer stuff?
    var timer = new FrameTimer();
    timer.tick();

    var sprites = new SpriteSheet({
        width:5 * 4,
        height:3 * 4,
        sprites:[
            { name:'stand' },
            { name:'eat'}
        ]
    });
    var birdImage = new Image();


    birdImage.src = 'images/bird_sheet4x.png';


/* set up canvas to not smooth pixels */
    var canvas = document.getElementById('b');
    var ctx = document.getElementById('b').getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;


//load Background image
	var bgReady = false;
	var bgImage = new Image();
	bgImage.onload = function () {
	bgReady = true;
	};
	bgImage.src = "images/background.png";
	bgImage.width = 728;
	bgImage.height = 464;

//load hero image
    var heroReady = false;
    var heroImage = new Image();
    heroImage.onload = function () {
        heroReady = true;
    };
    heroImage.src = "images/hero.png";
    heroImage.width = 40;
    heroImage.height = 68;


//load cloud image
    var cloudReady = false;
    var cloudImage = new Image();
    cloudImage.onload = function () {
        cloudReady = true;
    };
    cloudImage.src = "images/cloud1.png";
    cloudImage.height = 26;
    cloudImage.width = 112;

//load birds
    var birdReady = true;

//function for randomly placing objects
var resetRandom = function (obj) {
        //Throw the monster somewhere on the screen
        obj.x = obj.box.width + (Math.random() * (canvas.width - obj.box.width * 2));
        obj.y = obj.box.height + (Math.random() * (canvas.height - obj.box.height * 2));
    };
    
//load control panel background
    var controlBgReady = false;
    var controlBgImage = new Image();
    controlBgImage.onload = function() {
        controlBgReady = true;
    };
    controlBgImage.src = "images/controlBg.png";
    controlBgImage.height = 464;
    controlBgImage.width = 228;

//load control block1
    var block1Ready = false;
    var block1Image = new Image();
    block1Image.onload = function() {
        block1Ready = true;
    };
    block1Image.src = "images/control-a.png";
    block1Image.height = 32;
    block1Image.width = 36;

//load control block2
    var block2Ready = false;
    var block2Image = new Image();
    block2Image.onload = function() {
        block2Ready = true;
    };
    block2Image.src = "images/control-dash.png";
    block2Image.height = 32;
    block2Image.width = 36;

//load control block3
    var block3Ready = false;
    var block3Image = new Image();
    block3Image.onload = function() {
        block3Ready = true;
    };
    block3Image.src = "images/control-dash.png";
    block3Image.height = 32;
    block3Image.width = 36;

//load control block4
    var block4Ready = false;
    var block4Image = new Image();
    block4Image.onload = function() {
        block4Ready = true;
    };
    block4Image.src = "images/control-s.png";
    block4Image.height = 32;
    block4Image.width = 36;

//load switch on
    var switchOnReady = false;
    var switchOnImage = new Image();
    switchOnImage.onload = function() {
    };
    switchOnImage.src = "images/switch_on.png";
    switchOnImage.height = 72;
    switchOnImage.width = 24;

//load switch off
    var switchOffReady = false;
    var switchOffImage = new Image();
    switchOffImage.onload = function() {
        switchOffReady = true;
    };
    switchOffImage.src = "images/switch_off.png";
    switchOffImage.height = 72;
    switchOffImage.width = 24;

//load lever on
    var leverOnReady = false;
    var leverOnImage = new Image();
    leverOnImage.onload = function() {
    };
    leverOnImage.src = "images/lever_on.png";
    leverOnImage.height = 100;
    leverOnImage.width = 36;

//load lever off
    var leverOffReady = false;
    var leverOffImage = new Image();
    leverOffImage.onload = function() {
        leverOffReady = true;
    };
    leverOffImage.src = "images/lever_off.png";
    leverOffImage.height = 100;
    leverOffImage.width = 36;

//////////load sounds


	var chord1 = new Audio("sounds/chord01.wav"); // buffers automatically when created
	var chord2 = new Audio("sounds/chord02.wav");
	var chord3 = new Audio("sounds/chord03.wav");
	var chord4 = new Audio("sounds/chord04.wav");
	var chord5 = new Audio("sounds/chord05.wav");
	var lastchord1 = new Audio("sounds/lastchord1.wav");
	var lastchord2 = new Audio("sounds/lastchord2.wav");

//	chord1.play();


    function onConnectionError() {
        chord1.src = "sounds/chord01.wav";
        chord2.src = "sounds/chord02.wav";
        chord3.src = "sounds/chord03.wav";
        chord4.src = "sounds/chord04.wav";
        chord5.src = "sounds/chord05.wav";
        lastchord1.src = "sounds/lastchord1.wav";
        lastchord2.src = "sounds/lastchord2.wav";

    }



// GAME OBJECTS

//game over variable
    var gameOver = false;
    
//this is the player
	var hero = {
 		speed: 30, //movement in pixels per second
  		x: 465,
  		y: 10,
  		xSpeed:0,
  		rotation: 0,
  		box:{width: heroImage.width, height: heroImage.height}
	};

///create clouds array
    var clouds = [];
///this spawns the clouds into the array
    var spawnClouds = function () {
        for (var i = 0; i < 20; i++) {
            var cloud = {
                x:0,
                y:0
            };
            //create a lot of monsters
            cloud.box = {width:31, height:25};
            resetRandom(cloud);
            clouds.push(cloud);

        }
    };

///spawn clouds intially
    spawnClouds();


///create birds array
    var birds = [];

///this spawns the birds into the array
    var spawnBirds = function () {
        for (var i = 0; i < 20; i++) {
            var bird = {
                x: 0,
                y: 0,
                walk: new Animation([
                { sprite:'stand', time:1 },
                { sprite:'eat', time:1 }], sprites)
            };
            //create a lot of birds
            bird.box = {width:31, height:25};
            resetRandom(bird);
            birds.push(bird);
        }
    };

///spawn birds intially
    spawnBirds();


///collision detected?
    function intersectsBox(objA, objB) {
        if (objB.x <= (objA.x + objA.box.width)
            && objA.x <= (objB.x + objB.box.width)
            && objB.y <= (objA.y + objA.box.height)
            && objA.y <= (objB.y + objB.box.height))
            return true;
    }


//function for drawing rotated images
var TO_RADIANS = Math.PI/180; 
function drawRotatedImage(image, x, y, angle) { 

		// save the current co-ordinate system 
		// before we screw with it
		ctx.save(); 

		// move to the middle of where we want to draw our image
		ctx.translate(x, y);

		// rotate around that point, converting our 
		// angle from degrees to radians 
		ctx.rotate(angle * TO_RADIANS);

		// draw it up and to the left by half the width
		// and height of the image 
		ctx.drawImage(image, -(image.width/2), -(image.height/2), image.width, image.height);

		// and restore the co-ords to how they were when we began
		ctx.restore(); 
	}

// UI

//control UI blocks
    var block1 = {
        x: 28,
        y: 60
    };
    var block2 = {
        x: 80,
        y: 60
    };
    var block3 = {
        x: 116,
        y: 60
    };
    var block4 = {
        x: 152,
        y: 60
    };

//switches
    var switch1 = {
        x:27,
        y:124,
        on: false
    };
    var switch2 = {
        x:84,
        y:124,
        on: false
    };
    var switch3 = {
        x:141,
        y:124,
        on: false
    };
//levers
    var lever1 = {
        x:20,
        y:200,
        on: false
    };
    var lever2 = {
        x:76,
        y:200,
        on: false
    };
    var lever3 = {
        x:132,
        y:200,
        on: false
    };

//Keyboard controls

    var Key = {
        _pressed: {},

        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        W: 87,
        A: 65,
        S: 83,
        D: 68,
        Q: 81,
        T: 84,

        isDown: function(keyCode) {
            return this._pressed[keyCode];
        },

        onKeydown: function(event) {
            this._pressed[event.keyCode] = true;
        },

        onKeyup: function(event) {
            delete this._pressed[event.keyCode];
        }
    };

    window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
    window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);


//Update game objects
    var update = function (modifier) {
   		hero.y += hero.speed * modifier;
        if (Key.isDown(Key.LEFT)) {
            hero.x -= .05
        }
        if (Key.isDown(Key.RIGHT)) {
            hero.x += .05
        }
        if (Key.isDown(Key.A)) {
            chord1.play()
            chord1.currentTime = 0;
            switch1.on = true;

        }
        if (Key.isDown(Key.S)) {
            chord2.play()
            chord2.currentTime = 0;
            switch2.on = true;

        }
        if (Key.isDown(Key.W)) {
            chord3.play()
            chord3.currentTime = 0;
            switch3.on = true;
        }
        if (Key.isDown(Key.D)) {
            if (lever1.on){
                chord4.play();
                lever3.on = true;
            }
            else
                chord4.play()
                chord4.currentTime = 0;
                lever1.on = true;

        }
        if (Key.isDown(Key.Q)) {
            chord5.play()
            chord5.currentTime = 0;
            lever2.on = true;
        }
        if (Key.isDown(Key.T)) {
            lastchord2.play()
            lastchord2.currentTime = 0;
        }

	};


//Draw everything
    var render = function (delta) {
        if (bgReady) {
            ctx.drawImage(bgImage, 0, 0, 728, 464);
        }
        if (gameOver) {
            heroReady = false;
            ctx.fillText("You starved to death!", 325, 290);
        }
        else if (heroReady) {
			drawRotatedImage(heroImage, hero.x, hero.y, hero.rotation);
        }

        if (cloudReady) {
            for (var i = 0; i < clouds.length; i++) {
                ctx.drawImage(cloudImage, clouds[i].x, clouds[i].y, cloudImage.width, cloudImage.height);
            }
        }

        if (birdReady) {
            for (var i = 0; i < clouds.length; i++) {
                birds[i].walk.animate(delta);
                var frame = birds[i].walk.getSprite();
                ctx.drawImage(birdImage, frame.x, frame.y, 5 * 4, 3 * 4, birds[i].x, birds[i].y, 5 * 4, 3 * 4)
            }
        }
 //draw UI controls
        if (controlBgReady) {
            ctx.drawImage(controlBgImage, 0, 0, controlBgImage.width, controlBgImage.height);
        }
        if (block1Ready) {
            ctx.drawImage(block1Image, block1.x, block1.y, block1Image.width, block1Image.height);
        }
        if (block2Ready) {
            ctx.drawImage(block2Image, block2.x, block2.y, block2Image.width, block2Image.height);
        }
        if (block3Ready) {
            ctx.drawImage(block3Image, block3.x, block3.y, block3Image.width, block3Image.height);
        }
        if (block4Ready) {
            ctx.drawImage(block4Image, block4.x, block4.y, block4Image.width, block4Image.height);
        }
        if (switch1.on) {
            ctx.drawImage(switchOnImage, switch1.x, switch1.y, switchOnImage.width, switchOnImage.height);
        }
            else {
                ctx.drawImage(switchOffImage, switch1.x, switch1.y, switchOnImage.width, switchOnImage.height);
            }
        if (switch2.on) {
            ctx.drawImage(switchOnImage, switch2.x, switch2.y, switchOnImage.width, switchOnImage.height);
        }
            else {
                ctx.drawImage(switchOffImage, switch2.x, switch2.y, switchOnImage.width, switchOnImage.height);
            }
        if (switch3.on) {
            ctx.drawImage(switchOnImage, switch3.x, switch3.y, switchOnImage.width, switchOnImage.height);
        }
            else {
                ctx.drawImage(switchOffImage, switch3.x, switch3.y, switchOnImage.width, switchOnImage.height);
            }
        if (lever1.on) {
            ctx.drawImage(leverOnImage, lever1.x + 2, lever1.y, leverOnImage.width, leverOnImage.height);
        }
        else {
            ctx.drawImage(leverOffImage, lever1.x + 2, lever1.y, leverOnImage.width, leverOnImage.height);
        }
        if (lever2.on) {
            ctx.drawImage(leverOnImage, lever2.x + 2, lever2.y, leverOnImage.width, leverOnImage.height);
        }
        else {
            ctx.drawImage(leverOffImage, lever2.x + 2, lever2.y, leverOnImage.width, leverOnImage.height);
        }
        if (lever3.on) {
            ctx.drawImage(leverOnImage, lever3.x + 2, lever3.y, leverOnImage.width, leverOnImage.height);
        }
        else {
            ctx.drawImage(leverOffImage, lever3.x + 2, lever3.y, leverOnImage.width, leverOnImage.height);
        }
    };

//Main game loop
    var main = function () {
        var now = Date.now();
        var delta = (now - then) / 1000;

        update(delta);
        render(delta);

        then = now;
    };

//Play
    var then = Date.now();
    setInterval(main, 5); //execute as fast as possible
})();
