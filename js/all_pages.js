
var maxBalls = 1000;
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
    "I see you",
    "",
    "Watch out",
    "look behind you",
    "You have very nice femurs",
]
var hiddenBodyElements = {}
var audioPlayed = true;



document.addEventListener('DOMContentLoaded', () => {
    checkInteraction();
});

function startPage() {
    console.log("starting")
    addJumpscareToLinks();
    showAlert();
    spawnBalls();
}

function checkInteraction() {
    const audio = document.getElementById("main_song");
    
    // Promise.reject(audio.play())
    // .then(startPage, foo)
    audio.play()
    .catch(error => {
        displayEntryDiv();
        return Promise.reject();
    }).then(
        startPage,
    )
}

function hideBodyElements() {
    hiddenBodyElements = {}
    var elements = document.body.children;
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].tagName == "SCRIPT") {
            continue;
        }
        hiddenBodyElements[elements[i].id] = window.getComputedStyle(elements[i]).display;
        elements[i].style.display = "none";
    }
}

function showBodyElements() {
    for (var elementId in hiddenBodyElements) {
        var element = document.getElementById(elementId);
        element.style.display = hiddenBodyElements[elementId];
    }
}

function displayEntryDiv() {
    hideBodyElements();
    var newAlert = document.createElement('div');
    newAlert.classList.add("alert");
    newAlert.innerHTML = "Enter Page"
    newAlert.style.top = "calc(50% - 50px)";
    newAlert.style.left = "calc(50% - 100px)";
    newAlert.addEventListener("click", function() {
        this.remove();
        showBodyElements();
        startPage();
        document.getElementById("main_song").play();
    });
    document.body.appendChild(newAlert);
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
    hideBodyElements();
    document.body.style.backgroundColor = "black";
    
    document.body.style.backgroundImage = "url('images/jump_scare.gif')";

    await new Promise(r => setTimeout(r, 1000));
    showBodyElements();
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
    return Math.round(Math.random() * 5_000) + 5_000;
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