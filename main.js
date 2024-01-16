//Pong

let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

//Global Variables
let mouseY;
let state;
let score;
let bestScore = 0;
let mouseIsPressed = false;
let blueWallWidth = 25;
let blueWallHeight = 600;
let greenWall;
let ball;
reset();

// Draw Function
window.addEventListener("load", draw);

function draw() {
  if (state === "start") {
    drawStart();
  } else if (state === "gameon") {
    runGame();
  } else if (state === "gameover") {
    drawGameOver();
  }

  // Request Animation Frame
  requestAnimationFrame(draw);
}

//EVENT STUFF
document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);
document.addEventListener("mousemove", mousemoveHandler);

function mousemoveHandler(event) {
  let cnvRect = cnv.getBoundingClientRect();
  mouseY = event.y - cnvRect.y;
}

function mousedownHandler() {
  mouseIsPressed = true;

  //Start Game on Mousedown
  if (state === "start") {
    state = "gameon";
  }
}

function mouseupHandler() {
  mouseIsPressed = false;
}

//FUNCTIONS
//Start Screen
function drawStart() {
  drawMainComponents();

  // Start Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "blue";
  ctx.fillText("CLICK TO START", 275, 285);

  ctx.font = "25px Consolas";
  ctx.fillText("USE YOUR MOUSE TO CONTROL THE WALL", 205, 450);
}

function runGame() {
  //LOGIC
  moveCircle();
  // DRAW
  drawGame();
}

function moveCircle() {
  //Ball Movement
  ball.x = ball.x + ball.xSpeed;
  ball.y = ball.y + ball.ySpeed;

  if (ball.y - ball.r > 575) {
    ball.ySpeed = -ball.ySpeed;
  } else if (ball.x < blueWallWidth + ball.r) {
    ball.xSpeed = -ball.xSpeed;
  } else if (ball.y < 25) {
    ball.ySpeed = -ball.ySpeed;
  }

  if (ball.x > 800) {
    gameOver();
  }

  if (
    ball.x + ball.r > 750 &&
    ball.x + ball.r < 775 &&
    ball.y + ball.r > mouseY - 2 &&
    ball.y + ball.r < mouseY + greenWall.h + 2
  ) {
    ball.xSpeed = -ball.xSpeed;
    score++;
    console.log("hit");
  }
  // if (score < 5) {
  //   ball.xSpeed = 4;
  //   ball.ySpeed = 4;
  // }

  // else if (score < 10) {
  //   ball.xSpeed = 8;
  //   ball.ySpeed = 8;
  // } else if (score < 15) {
  //   ball.xSpeed = 10;
  //   ball.ySpeed = 10;
  // } else if (score < 25) {
  //   ball.xSpeed = 9;
  //   ball.ySpeed = 9;
  // } else if (score < 35) {
  //   ball.xSpeed = 11;
  //   ball.ySpeed = 11;
  // } else if (score < 45) {
  //   ball.xSpeed = 13;
  //   ball.ySpeed = 13;
  // } else if (score < 65) {
  //   ball.xSpeed = 15;
  //   ball.ySpeed = 15;
  // }
}

function gameOver() {
  state = "gameover";

  setTimeout(reset, 3000);

  if (score > bestScore) {
    bestScore = score;
  }
}

//Draw Game Elements
function drawGame() {
  drawMainComponents();
}

//Draw Game Over Screen
function drawGameOver() {
  drawMainComponents();

  //GAME OVER TEXT
  ctx.font = "40 Consolas";
  ctx.fillStyle = "blue";
  ctx.fillText("GAME OVER", 350, 285);
}

//Helper Functions
function reset() {
  state = "start";
  score = 0;
  ball = {
    x: 400,
    y: 100,
    r: 15,
    xSpeed: 7,
    ySpeed: 7,
  };

  greenWall = {
    x: 750,
    y: mouseY,
    w: 25,
    h: 125,
  };
}

function drawMainComponents() {
  //Draw Backgrounds
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  //Blue bar
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, blueWallWidth, blueWallHeight);

  //Green bar
  ctx.fillStyle = "green";
  ctx.fillRect(greenWall.x, mouseY, greenWall.w, greenWall.h);

  //Blue Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "blue";
  ctx.fillText("PONG", 375, 35);
  ctx.fillText(`SCORE: ${score}`, 40, cnv.height - 15);
  ctx.fillText(`BEST: ${bestScore}`, cnv.width - 255, cnv.height - 15);

  //Draw Circle
  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
  ctx.fill();
}
