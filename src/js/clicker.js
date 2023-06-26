var config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 650,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);
var amount;
var counter;
var clicker;

function preload() {
    this.load.path = "/src/images/";
    this.load.image('clicker', 'logo.png');
}

function create() {
    amount = 0;
    counter = this.add.text(30, 30, amount, { fontFamily: 'Gameplay' });
    counter.setScale(3);
    clicker = this.physics.add.image(500, 0, 'clicker');
    clicker.setScale(0.3);
    clicker.setCollideWorldBounds(true);
    clicker.setBounce(0.75, 0.75);
    clicker.setInteractive();
    this.input.on('pointerdown', clicked, this);
}

function clicked() {
    amount += 1;
    counter.setText(amount);
    var clickerVelocityX = randomNumber(-1000, 1000);
    var clickerVelocityY = randomNumber(-1000, 1000);
    clicker.setVelocity(clickerVelocityX, clickerVelocityY);
    
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
