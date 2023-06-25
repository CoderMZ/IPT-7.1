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

function preload ()
{
    this.load.path = "../images/";
    this.load.image('clicker', 'logo.png');
}

function create ()
{
    amount = 0;
    counter = this.add.text(30, 30, amount, {fontFamily: 'Gameplay'});
    counter.setScale(3)
    var clicker = this.physics.add.image(500, 0, 'clicker');
    clicker.setScale(0.3);
    clicker.setCollideWorldBounds(true);
    clicker.setBounce(0, 0.7);
    clicker.setInteractive();
    clicker.on('pointerdown', () => clicked());
}

function clicked () {
    amount += 1;
    counter.setText(amount);
}