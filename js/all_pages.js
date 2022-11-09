
var maxBalls = 1000;
var balls = [];


document.addEventListener('DOMContentLoaded', () => {
    balls = [];
    document.body.style.backgroundSize = "contain";
    document.body.style.backgroundRepeat = "no-repeat";
    addJumpscareToLinks();
    spawnBalls();
    //addFlashImagesToNavBar();
});


function addFlashImagesToNavBar() {
    const imageHolders = document.getElementsByClassName("navbar_image_holder");
    for(var i = 0, len = imageHolders.length; i < len; i++) {
        const images = imageHolders[i].children;
        for (var j = 0, ilen = images.length; j < ilen; j++) {
            images[j].addEventListener('animationiteration', flashImage);
        }
    }
}

function flashImage() {
    if (this.style.filter == "invert(1)") {
        this.style.filter = "invert(0)";
    } else {
        this.style.filter = "invert(1)";
    }
}


function addJumpscareToLinks() {
    var elements = document.getElementsByTagName('a');
    for(var i = 0, len = elements.length; i < len; i++) {
        elements[i].onclick = showJumpscare
    }
}


async function showJumpscare() {
    const main = document.getElementsByTagName("main")[0];
    const nav = document.getElementsByTagName("nav")[0];
    main.style.display = 'none';
    nav.style.display = 'none';
    document.body.style.backgroundColor = "black";
    
    document.body.style.backgroundImage = "url('images/jump_scare.gif')";

    await new Promise(r => setTimeout(r, 1000));
    main.style.display = 'block';
    nav.style.display = 'flex';
    document.body.style.backgroundColor = "#ff70ed";
    document.body.style.backgroundImage = "";
}

function spawnBall() {
    var img = document.createElement('img');
    img.src = "images/pokeball.png";
    img.style.width = "50px";
    img.style.left = getRandomX().toString() + "px";
    document.body.appendChild(img);
    img.classList.add("falling");
    
    img.addEventListener('animationend', deleteBall);
    balls.push(img);
}

async function spawnBalls() {
    while (balls.length < maxBalls) {
        spawnBall();
        await new Promise(r => setTimeout(r, 100));
    }
}

function deleteBall() {
    balls.pop(this);
    this.remove();
    spawnBall();
}

function getRandomX() {
    var currentWidth = parseInt(document.body.clientWidth, 10);
    return Math.round(Math.random() * currentWidth);
}

