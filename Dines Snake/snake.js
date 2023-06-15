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
    update: update
  }
};

const game = new Phaser.Game(config);

let snake;
let food;
let cursors;
let score = 0;
let scoreText;

function preload() {}

function create() {
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

function update() {
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

function checkOverlap(spriteA, spriteB) {
  const boundsA = spriteA.getBounds();
  const boundsB = spriteB.getBounds();

  return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
}


function checkOverlap(spriteA, spriteB) {
  const boundsA = spriteA.getBounds();
  const boundsB = spriteB.getBounds();

  return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
}

function spawnFood() {
  const gridSize = 20;
  const gridSizeX = config.width / gridSize;
  const gridSizeY = config.height / gridSize;

  let validCell = false;
  let foodX, foodY;

  while (!validCell) {
    foodX = Phaser.Math.Between(0, gridSizeX - 1) * gridSize;
    foodY = Phaser.Math.Between(0, gridSizeY - 1) * gridSize;

    let overlap = false;
    snake.getChildren().forEach((child) => {
      if (child.x === foodX && child.y === foodY) {
        overlap = true;
      }
    });

    if (!overlap) {
      validCell = true;
    }
  }

  food = this.add.rectangle(foodX, foodY, 20, 20, 0xff0000);
}

function eatFood(snakeHead, food) {
  food.destroy();
  spawnFood();

  const newPart = this.add.rectangle(0, 0, 20, 20, 0x00ff00);
  snake.add(newPart);

  score += 10;
  scoreText.setText('Score: ' + score);
}