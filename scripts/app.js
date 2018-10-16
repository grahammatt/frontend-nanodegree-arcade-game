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
  }
  checkCollisions() {}
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
    this.sprite = 'images/char-boy.png';
  }

  update(x = 0, y = 0) {
    if (x != 0 || y != 0) {
      this.x += x;
      this.y += y;
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
/// TODO: Fix enemy positioning
allEnemies.push(...[
  new Enemy(-353, 55, 50),
  new Enemy(0, 55, 50),
  new Enemy(0, 135, 20),
  new Enemy(0, 215, 40),
  new Enemy(-117, 215, 40),
  new Enemy(-234, 215, 40)
]);
// Place the player object in a variable called player
let player = new Player(202, 400);
// TODO: fix player positioning

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});