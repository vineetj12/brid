let board;
let boardheight = window.innerHeight - 100;
let boardwidth = window.innerWidth - 100;
let context;

let birdheight = 50;
let birdwidth = 40;
let birdy = boardheight / 2;
let birdx = boardwidth / 8;
let birdimage;
let op = boardheight / 4;
let birdspeed = 0;
let gravity = 0.18;
let pip = [];
let pipheight = 200;
let pipwidth = 60;
let toppipimage;
let bottompipimage;
let pipspeed = -2;

let bird = {
    x: birdx,
    y: birdy,
    height: birdheight,
    width: birdwidth,
};
let gameover = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d");
    birdimage = new Image();
    birdimage.src = "./bird.png";
    toppipimage = new Image();
    toppipimage.src = "./d.png";
    bottompipimage = new Image();
    bottompipimage.src = "./u.png";

    birdimage.onload = function() {
        context.drawImage(birdimage, bird.x, bird.y, bird.width, bird.height);  
    }
    requestAnimationFrame(update);
    setInterval(pp, 1500);
    document.addEventListener("keydown", movebird);
}

function update() {
    if (gameover) {
        return;
    }
    requestAnimationFrame(update);
    context.clearRect(0, 0, boardwidth, boardheight);
    birdspeed += gravity;
    bird.y = Math.max(bird.y + birdspeed, 0);
    if (bird.y > boardheight) {
        gameover = true;
        alert("game over");
    }
    context.drawImage(birdimage, bird.x, bird.y, bird.width, bird.height);
    for (let i = 0; i < pip.length; i++) {
        pip[i].x += pipspeed;
        context.drawImage(pip[i].image, pip[i].x, pip[i].y, pip[i].width, pip[i].height);
        if (dc(bird, pip[i])) {
            gameover = true;
            alert("game over");
        }
    }
}

function pp() {
    if (gameover) {
        return;
    }
    let pipheightRandom = 190 + Math.floor(Math.random() * (boardheight / 4)) + 50; 
    let pipx = boardwidth;

    let toppip = {
        image: toppipimage,
        x: pipx,
        y: 0,
        width: pipwidth,
        height: pipheightRandom,
        passed: false
    };
    pip.push(toppip);

    let bottompipHeight = window.innerHeight - 100 - pipheightRandom - op;
    let bottompip = {
        image: bottompipimage,
        x: pipx,
        y: pipheightRandom + op,  
        width: pipwidth,
        height: bottompipHeight,
        passed: false
    };
    pip.push(bottompip); 
}

function movebird(e) {
    if (e.code == "Space" || e.code == "ArrowUp") {
        birdspeed = -6;
    }
}

function dc(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y; 
}
