/*jshint esversion: 6*/

//Modal element to be shown when the game is won
const MODAL = document.getElementById('win-modal');

class Enemy {
  /**
   * Creates the enemies the player must avoid
   * @param {Number} x          The x-axis position of the enemy on the canvas
   * @param {Number} y          The y-axis position of the enemy on the canvas
   * @param {Number} speed      The speed of the enemy movement
   */
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image file of the enemy. Uses a helper to easily load images.
    this.sprite = 'images/enemy-bug.png';
  }
  /**
   * Update the enemy's position.
   * You should multiply any movement by the dt parameter.
   * This will ensure the game runs at the same speed for all computers.
   * @param dt A time delta between ticks.
   */
  update(dt) {
    if (this.x < 505) {
      this.x += (this.speed * dt);
    } else {
      //when the enemy goes off the canvas
      //reset enemy to start of canvas and randomize speed
      this.x = -101;
      this.speed = getRandomInt(50, 150);
    }
    this.checkCollisions();
  }
  /**
   * Checks weather the hitbox of this enemy
   * collides with the player hitbox
   */
  checkCollisions() {
    // TODO: define sprite widths and heights in constructor
    // TODO: improve collision detection
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

class Player {
  /**
   * Creates the charecter controlled by the player
   * @param {Number} x the x-axis position of the player on the canvas
   * @param {Number} y the y-axis position of the player on the canvas
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    //the initial x-axis position of the player
    this.initX = x;
    //the initial y-axis position of the player
    this.initY = y;
    // The image file of the player. Uses a helper to easily load images.
    this.sprite = 'images/char-boy.png';
  }

  //Sets the current player postion back to the initial position
  reset() {
    this.x = this.initX;
    this.y = this.initY;
  }
  /**
   * [update description]
   * @param  {Number} [x=0] The +/- number to change the x-axis position by
   * @param  {Number} [y=0] The +/- number to change the y-axis position by
   */
  update(x = 0, y = 0) {
    if ((x < 0 && this.x !== 0) || (x > 0 && this.x !== 404)) {
      this.x += x;
      return;
    } else if ((y < 0 && this.y !== -41.5) || (y > 0 && this.y !== 373.5)) {
      this.y += y;
      if (this.y === -41.5) {
        //Game has been won. Display win modal.
        // TODO: temporarily remove event listener
        MODAL.style.display = 'flex';
      }
    }
  }
  //Draw the player on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  /**
   * Determines what parameters need to be passed to the Player update function
   * @param  {String} keyPress The string representation of the key pressed by the user
   */
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

/**
 * returns a random integer between two numbers
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param  {Number} min inclisive minimum int
 * @param  {Number} max exclusive maximum int
 * @return {Number}     return random integer between min and max
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Clears the allEnemies array and pushes between 1 to 3 enemies on each row.
 * The speed of each enemy will be randomly chosen.
 */
function resetEnemies() {
  allEnemies = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < getRandomInt(1, 4); j++) {
      allEnemies.push(new Enemy(0 - (202 * j), 45 + (83 * i), getRandomInt(50, 150)));
    }
  }
}

// Place all enemy objects in an array called allEnemies
let allEnemiess;
resetEnemies();

// Place the player object in a variable called player
let player = new Player(202, 373.5);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// TODO: disable scroll input
// TODO: move event listener creation to player object
document.addEventListener('keyup', function(e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

/**
 * Listens for the reset button to be pressed.
 * Resets the player and enemies then closes the modal.
 */
document.getElementById('reset-game').addEventListener('click', function() {
  player.reset();
  resetEnemies();
  MODAL.style.display = 'none';
});