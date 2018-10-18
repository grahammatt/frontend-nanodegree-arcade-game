/*jshint esversion: 6*/

// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed = 40) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x < 505 ? this.x + (this.speed * dt) : -101);
    this.checkCollisions();
  }

  checkCollisions() {
    // TODO: define sprite widths and heights in constructor
    if (this.x < player.x + 78 /*player.width*/ &&
      this.x + 78 /*this.width*/ > player.x &&
      this.y < player.y + 30 /*player.width*/ &&
      this.y + 30 /*this.width*/ > player.y) {
      player.reset();
    }
  }
  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.initX = x;
    this.initY = y;
    this.sprite = 'images/char-boy.png';
  }
  reset() {
    this.x = this.initX;
    this.y = this.initY;
  }
  update(x = 0, y = 0) {
    if ((x < 0 && this.x !== 0) || (x > 0 && this.x !== 404)) {
      this.x += x;
      return;
    } else if ((y < 0 && this.y !== -41.5) || (y > 0 && this.y !== 373.5)) {
      this.y += y;
      if (this.y === -41.5) {
        this.reset();
      }
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(keyPress) {
    switch (keyPress) {
      case `up`:
        this.update(0, -83);
        break;
      case `down`:
        this.update(0, 83);
        break;
      case `left`:
        this.update(-101);
        break;
      case `right`:
        this.update(101);
        break;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
allEnemies.push(...[
  new Enemy(-303, 45, 60),
  new Enemy(0, 45, 60),
  new Enemy(0, 128, 80),
  new Enemy(303, 128, 80),
  new Enemy(0, 211, 50),
  new Enemy(-117, 211, 50),
  new Enemy(-234, 211, 50)
]);
// Place the player object in a variable called player
let player = new Player(202, 373.5);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// TODO: disable scroll input
document.addEventListener('keyup', function(e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});