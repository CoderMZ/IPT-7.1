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

function preload() {
  this.load.image('snake', 'snake.png');
  this.load.image('food', 'food.png');
}

function create() {
  snake = this.physics.add.group();

  for (let i = 0; i < 3; i++) {
    const snakePart = snake.create(160 + i * 20, 160, 'snake');
    snakePart.setOrigin(0);
  }

  food = this.physics.add.image(Phaser.Math.Between(0, 39) * 16, Phaser.Math.Between(0, 29) * 16, 'food');

  this.physics.add.collider(snake, food, eatFood, null, this);

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  const speed = 4;
  const head = snake.getFirst(true);
  const oldTailX = snake.getLast(true).x;
  const oldTailY = snake.getLast(true).y;

  if (cursors.left.isDown) {
    head.x -= speed;
  } else if (cursors.right.isDown) {
    head.x += speed;
  } else if (cursors.up.isDown) {
    head.y -= speed;
  } else if (cursors.down.isDown) {
    head.y += speed;
  }

  this.physics.world.wrap(head, 16);

  if (head.x === food.x && head.y === food.y) {
    const newPart = snake.create(oldTailX, oldTailY, 'snake');
    newPart.setOrigin(0);

    do {
      food.setPosition(Phaser.Math.Between(0, 39) * 16, Phaser.Math.Between(0, 29) * 16);
    } while (checkOverlap(food, snake));

  }

  const snakeBody = snake.getChildren();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1].setPosition(snakeBody[i].x, snakeBody[i].y);
  }
}

function checkOverlap(spriteA, spriteB) {
  const boundsA = spriteA.getBounds();
  const boundsB = spriteB.getBounds();

  return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
}

function create() {
  snake = this.physics.add.group();

  for (let i = 0; i < 3; i++) {
    const snakePart = snake.create(160 + i * 20, 160, 'snake');
    snakePart.setOrigin(0);
  }

  food = this.physics.add.image(Phaser.Math.Between(0, 39) * 16, Phaser.Math.Between(0, 29) * 16, 'food');
  food.setScale(0.5); // Adjust the scale factor as needed

  this.physics.add.collider(snake, food, eatFood, null, this);

  cursors = this.input.keyboard.createCursorKeys();
}

function eatFood() {
  food.destroy();
}


