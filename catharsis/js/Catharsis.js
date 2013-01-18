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
	bgImage.width = 528;
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
    
    
//////////Game objects
var sound = new Audio("catharsis.wav"); // buffers automatically when created
sound.play();

//game over variable
    var gameOver = false;
    
//this is the player
	var hero = {
 		speed: 30, //movement in pixels per second
  		x: bgImage.width/2,
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
	
	

//Keyboard controls
addEventListener('keydown', function(event) {
	if(event.keyCode == 37) {
		if(hero.rotation < 35){
			hero.xSpeed -= .02;
			hero.rotation += 5;
		}
	}
	else if(event.keyCode == 39) {
		if(hero.rotation > -35) { 
			hero.xSpeed += .02;
			hero.rotation -= 5;
		}
	}  
});


//Update game objects
    var update = function (modifier) {
   		hero.y += hero.speed * modifier;
   		hero.x += hero.xSpeed
	};


//Draw everything
    var render = function (delta) {
        if (bgReady) {
            ctx.drawImage(bgImage, 0, 0, 528, 464);
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