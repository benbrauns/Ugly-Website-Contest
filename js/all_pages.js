
var maxBalls = 50;
var balls = [];
var messages = [
    "Hi",
    "I love you",
    "May puff be with you",
    "Oooo look at how the puff jiggles",
    "These hugs are so nice",
    "I dream about your downfall",
    "Puff is not an eldritch deity ",
    "Puff and cthulu are definitely not friends",
]





document.addEventListener('DOMContentLoaded', () => {
    document.body.style.backgroundSize = "contain";
    document.body.style.backgroundRepeat = "no-repeat";
    addJumpscareToLinks();
    showAlert();
    spawnBalls();
});

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

function getRandomY() {
    var currentHeight = parseInt(document.body.clientHeight, 10);
    return Math.round(Math.random() * currentHeight);
}

function getAlertDelay() {
    return Math.round(Math.random() * 30_000) + 10_000;
    //return Math.round(Math.random() * 1_000) + 1_000;
}

async function showAlert() {
    await new Promise(r => setTimeout(r, getAlertDelay()));
    var message = messages[Math.floor(Math.random() * messages.length)];
    createAlert(message);
    //alert(message);
    
    showAlert();
}

function createAlert(message) {
    var newAlert = document.createElement('div');
    newAlert.classList.add("alert");
    newAlert.innerHTML = message
    newAlert.style.top = (getRandomY() - 100) + "px";
    newAlert.style.left = getRandomX() + "px";
    createAlertAudio(newAlert);
    newAlert.addEventListener("click", function() {
        this.remove();
    });
    document.body.appendChild(newAlert);
}

function createAlertAudio(newAlert) {
    var audio = document.createElement('audio');
    audio.autoplay = true;
    audio.type = "audio/mpeg";
    audio.src = "../audio/jiggly_taunt_smash.mp3";
    newAlert.appendChild(audio);
}