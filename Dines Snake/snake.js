const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
    startGame: startGame // New scene for starting the game
  }
};

const game = new Phaser.Game(config);

let snake;
let food;
let cursors;
let score = 0;
let scoreText;
let startText; // Text for the starting screen
let isGameStarted = false; // Flag to track game start

function preload() {}

function create() {
  // Add starting screen text
  startText = this.add.text(220, 200, 'Press SPACE to start', { fontSize: '32px', fill: '#ffffff' });

  // Enable input for starting the game
  this.input.keyboard.on('keydown-SPACE', startGame, this);
}

function update() {
  if (!isGameStarted) {
    // Don't update the game if it hasn't started
    return;
  }

  const speed = 4;
  const head = snake.getFirst(true);
  const oldTailX = snake.getLast(true).x;
  const oldTailY = snake.getLast(true).y;

  if (cursors.left.isDown && head.x > 0) {
    head.x -= speed;
  } else if (cursors.right.isDown && head.x < config.width - 20) {
    head.x += speed;
  } else if (cursors.up.isDown && head.y > 0) {
    head.y -= speed;
  } else if (cursors.down.isDown && head.y < config.height - 20) {
    head.y += speed;
  }

  if (checkOverlap(head, food)) {
    const newPart = this.add.rectangle(oldTailX, oldTailY, 20, 20, 0x00ff00);
    snake.add(newPart);
    score += 10;
    scoreText.setText('Score: ' + score);

    do {
      food.setPosition(
        Phaser.Math.Between(1, 38) * 20,
        Phaser.Math.Between(1, 28) * 20
      );
    } while (checkOverlap(food, snake));
  }

  const snakeBody = snake.getChildren();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    if (snakeBody[i].x === head.x && snakeBody[i].y === head.y) {
      // Handle collision with snake body here
    }
    snakeBody[i + 1].setPosition(snakeBody[i].x, snakeBody[i].y);
  }
}

function startGame() {
  // Remove starting screen text
  startText.destroy();

  // Set the game as started
  isGameStarted = true;

  // Add game elements

  snake = this.physics.add.group();

  for (let i = 0; i < 3; i++) {
    const snakePart = this.add.rectangle(160 + i * 20, 160, 20, 20, 0x00ff00);
    snake.add(snakePart);
  }

  food = this.add.rectangle(
    Phaser.Math.Between(1, 38) * 20,
    Phaser.Math.Between(1, 28) * 20,
    20,
    20,
    0xff0000
  );

  cursors = this.input.keyboard.createCursorKeys();

  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#ffffff' });
}

function checkOverlap(spriteA, spriteB) {
  const boundsA = spriteA.getBounds();
  const boundsB = spriteB.getBounds();

  return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
}

// Other functions...
