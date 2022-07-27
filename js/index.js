const canvas = document.querySelector('canvas');
const crashSound = new Audio();
crashSound.src = "../sounds/car-crash.wav";
crashSound.volume = 0.1;
let ctx = canvas.getContext("2d");
let startScreen = document.querySelector(".game-intro");
let intervalId = 0;
let isGameOver = false;
let score = 0;
let background = new Image();
background.src = "../images/road.png";
let car = new Image();
car.src = "../images/car.png";
let carX = 250;
let carY = 400;
let carWidth = 80;
let carLength = 130;
//obstacle car
let obCar = new Image();
obCar.src = "../images/car.png";

let obCarX = 300;
let obCarY = -400;
window.onload = () => {
  let randomNum = Math.floor(Math.random() * 2)
  if(randomNum > 0){
     obCarX = 300;
  }else{
     obCarX = 100;
  }
  canvas.style.display = "none";
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight" && carX + carWidth < canvas.width - 50) {
      carX += 4;
    } else if (event.code === "ArrowLeft" && carX > 50) {
      carX -= 4;
    }
  });
  document.addEventListener("keyup", () => {
    game.player.speedX = 0;
  });
  
  function startGame() {
    canvas.style.display = "block";
    startScreen.style.display = "none";
    //drawing the background and the cars
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(car, carX, carY, carWidth, carLength);
    ctx.drawImage(obCar, obCarX, obCarY, carWidth, carLength);
    //obCar movement
    obCarY += 2;
    if (obCarY > canvas.height) {
      obCarY = -400;
      score++;
    }
    //collision with cars
    if (
      carY < obCarY + carLength &&
      carX < obCarX + carWidth - 5 &&
      carX + carWidth > obCarX &&
      carY + carLength > obCarY
    ) {
      isGameOver = true;
    }
    //scoreboard
    ctx.font = "30px Georgia";
    ctx.fillText(`Score:${score}`, 100, 40);
    intervalId = requestAnimationFrame(startGame);
    if (isGameOver) {
      cancelAnimationFrame(intervalId);
      gameOver()
    }
  }

  function gameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.font = "60px Verdana";
    ctx.fillText("Game Over!", canvas.width / 6, 200);

    ctx.font = "30px Verdana";
    ctx.fillStyle = "white";
    ctx.fillText(`Your Final Score: ${score}`, canvas.width / 6, 400);
  }
};














