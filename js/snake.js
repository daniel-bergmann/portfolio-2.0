'use strict';

const cvs = document.getElementById('myCanvas');
const ctx = cvs.getContext('2d');

// The canvas size

cvs.width = 500;
cvs.height = 400;

let frames = 0;

let orangeEaten = false;

const direction = {
  current: 0,
  idle: 0,
  right: 1,
  down: 2,
  left: 3,
  up: 4,
};

// Controls for snake

document.addEventListener('keydown', function (evt) {
  switch (evt.keyCode) {
    case 37:
      //move left
      if (
        direction.current != direction.left &&
        direction.current != direction.right
      )
        direction.current = direction.left;
      break;
    case 38:
      //move up
      if (
        direction.current != direction.up &&
        direction.current != direction.down
      )
        direction.current = direction.up;
      break;
    case 39:
      //move right
      if (
        direction.current != direction.right &&
        direction.current != direction.left
      )
        direction.current = direction.right;
      break;
    case 40:
      //move down
      if (
        direction.current != direction.down &&
        direction.current != direction.up
      )
        direction.current = direction.down;
      break;
  }
});

function getDistance(pointX1, pointY1, pointX2, pointY2) {
  let distanceX = pointX2 - pointX1;
  let distanceY = pointY2 - pointY1;

  return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}

// Orange size and color

const orange = {
  x: cvs.width / 4,
  x: cvs.width / 5,
  y: cvs.height / 4,
  r: 40,

  draw: function () {
    ctx.beginPath();
    ctx.fillStyle = '#202820 ';
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  },
};

// Snake size and color

const snake = {
  radius: 10,
  position: [{ x: cvs.width / 2, y: cvs.height / 2 }],

  draw: function () {
    ctx.fillStyle = 'white';
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    }
  },

  update: function () {
    if (frames % 6 == 0) {
      if (orangeEaten == true) {
        this.position.push({
          x: this.position[this.position.length - 1].x,
          y: this.position[this.position.length - 1].y,
        });
        orangeEaten = false;
      }

      if (this.position[0].x < 0) this.position[0].x = cvs.width - 10;
      if (this.position[0].x > cvs.width) this.position[0].x = 10;
      if (this.position[0].y < 0) this.position[0].y = cvs.height - 10;
      if (this.position[0].y > cvs.height) this.position[0].y = 10;

      for (let i = this.position.length - 1; i > 0; i--) {
        if (
          this.position[0].x == this.position[i].x &&
          this.position[0].y == this.position[i].y &&
          this.position.length > 2
        ) {
          this.position.splice(1);
          break;
        }
        this.position[i].x = this.position[i - 1].x;
        this.position[i].y = this.position[i - 1].y;
      }
      if (direction.current == direction.right) {
        this.position[0].x += 20;
      }
      if (direction.current == direction.left) {
        this.position[0].x -= 20;
      }
      if (direction.current == direction.up) {
        this.position[0].y -= 20;
      }
      if (direction.current == direction.down) {
        this.position[0].y += 20;
      }
      if (
        getDistance(
          orange.x,
          orange.y,
          this.position[0].x,
          this.position[0].y
        ) <=
        2 * orange.r
      ) {
        orange.x = Math.random() * cvs.width;
        orange.y = Math.random() * cvs.height;
        orangeEaten = true;
      }
    }
  },
};

function main() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  snake.update();
  snake.draw();
  orange.draw();
  frames++;
  requestAnimationFrame(main);
}
requestAnimationFrame(main);


// Play button for the snake game

function play() {
  var playGame = document.getElementById("more");
  var btnText = document.getElementById("play");

  if (dots.style.display === "none") {
    playGame.style.display = "none";
  } else {
    btnText.style.display = "none";
    playGame.style.display = "flex";
    playGame.style.justifyContent = "center";
  }
}




