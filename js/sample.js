
window.onload = function() {
    
    var particles = [],
        numParticles = 2000,
        pCanvas = document.getElementById("particleCanvas"),
        pContext = pCanvas.getContext("2d"),
        imageData,
        mouseX,
        mouseY,
        canDraw = false;

var seed = {
x: chaos.width / 2 - 2,
y: chaos.height / 2 - 2,
width: 10,
height: 10
};


var pause = {
x: 50,
y: 50,
width: 50,
height: 50
};
var pauseImage = new Image();
pauseImage.src = "newAssets/pause.png";
    
var mouth = {
x: 200,
y: 360,
width: 100,
height: 47
};
var mouthImage = new Image();
mouthImage.src = "newAssets/mouth.png";

var eye1 = {
x: 280,
y: 180,
width: 58,
height: 34
};
var eye1Image = new Image();
eye1Image.src = "newAssets/eyeLeft.png";

var eye2 = {
x: 155,
y: 180,
width: 58,
height: 34
};
var eye2Image = new Image();
eye2Image.src = "newAssets/eye.png";

var nose = {
x: 215,
y: 215,
width: 66,
height: 119
};
var noseImage = new Image();
noseImage.src = "newAssets/nose.png";

var head = {
x: 105,
y: 80,
width: 284,
height: 382
};
var headImage = new Image();
headImage.src = "newAssets/headwithears.png";
    
var headBG = {
x: 100,
y: 80,
width: 284,
height: 382
};
var headBGImage = new Image();
headBGImage.src = "newAssets/headBG.png";    



init();

function init() {

    chaos.init();
    chaos.setSize(500,500);

    pCanvas.width = chaos.width;
    pCanvas.height = chaos.height;

    makeParticles();

    setTimeout(update,13);

    window.addEventListener("mousedown", onMouseDown, false);
    window.addEventListener("mouseup", onMouseUp, false);
    pCanvas.addEventListener("mousemove", onMouseMove, false);
    document.body.addEventListener("keyup",

    function(event) {

        switch(event.keyCode) {
            case 80:
            chaos.popImage();
            break;

            case 32:
            canDraw = false;
            break;

            default:
            break;
        }
    });
}

function onMouseDown(event) {
    canDraw = true;
}

function onMouseUp(event) {
    canDraw = false;
}

function onMouseMove(event) { 
    mouseX = event.pageX - pCanvas.offsetLeft;
    mouseY = event.pageY - pCanvas.offsetTop;
}

function drawSeed() {
    if(canDraw) {
        //chaos.context.fillStyle = "#ff6eb4";  //CHANGE HAIR COLOR
        chaos.context.fillRect(mouseX,mouseY,seed.width -3,seed.height);
    }
}

function makeParticles() {
    for(var i = 0; i < numParticles; i++) {
        var p = {
            x: Math.random() * chaos.width,
            y: Math.random() * chaos.height,
            vx: 0,
            vy: 0
        }
        particles.push(p);
    }
}

function update() {
    
    setTimeout(update,3);  
    imageData = chaos.context.getImageData(0,0,chaos.width,chaos.height).data;
    pContext.clearRect(0,0,chaos.width,chaos.height);
    drawSeed();


//pContext.drawImage(headBGImage,head.x, head.y,head.width,head.height); 

//pContext.drawImage(pauseImage,pause.x, pause.y,pause.width,pause.height);    
pContext.drawImage(mouthImage,mouth.x, mouth.y,mouth.width,mouth.height);
pContext.drawImage(eye1Image,eye1.x, eye1.y,eye1.width,eye1.height);
pContext.drawImage(eye2Image,eye2.x, eye2.y,eye2.width,eye2.height);
pContext.drawImage(noseImage,nose.x, nose.y,nose.width,nose.height);  
pContext.drawImage(headImage,head.x, head.y,head.width,head.height);
   

    for(var i = 0; i < numParticles; i++) {
        var p = particles[i];
        updateParticle(p);
    }
}

function updateParticle(p) {

    chaos.context.save();
    chaos.context.globalAlpha = 0;
    var x = Math.round(p.x),
    y = Math.round(p.y),
    pixel = imageData[(y * chaos.height + x) * 4 + 3],
    hit = pixel > 0;
    chaos.context.restore();
        
        if(hit) {
            chaos.context.fillRect(p.x,p.y,2.5,2.5);
            respawn(p);
        } else {
            p.vx += Math.random() * 10 - 1;
            p.vy += Math.random() * 10 - 1;

            p.x += p.vx;
            p.y += p.vy;

            p.vx *= .99;
            p.vy *= .99;

        if(p.x > chaos.width) {
            
            p.x -= chaos.width;
        } else if (p.x < 0) {
            
            p.x += chaos.width;
        }
        if(p.y > chaos.height) {
            
            p.y -= chaos.height;
        } else if (p.y < 0) {
            p.y += chaos.height;
        }

        pContext.fillRect(p.x,p.y,1,1);
        }
    }

    function respawn(p) {
        if(Math.random() < .5) {
            p.x = Math.random() * chaos.width;
            p.y = Math.random() * chaos.height;
        } else {
            p.x = Math.random() * chaos.width;
            p.y = Math.random() * chaos.height;
        }
    }
}

