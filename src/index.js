var config = {
    type: Phaser.AUTO,
    width: 1700,
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

function preload ()
{
    this.load.path = "../src/images/"

    this.load.image('logo', 'logo.png');
    this.load.image('red', 'logo.png');
}

function create ()
{

    var particles = this.add.particles('red');
    var particles2 = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 5,
        scale: { start:0.3, end: 0 },
        blendMode: 'ADD'
    });

    var emitter2 = particles2.createEmitter({
        speed: 5,
        scale: { start: 0.3, end: 0 },
        blendMode: 'ADD'
    });

    var logo = this.physics.add.image(0, 0, 'logo');
    var logo2 = this.physics.add.image(1600, 0, 'logo');

    logo.setScale(0.3);
    logo2.setScale(0.3);

    logo.setVelocity(-150, -200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    logo2.setVelocity(150, 200);
    logo2.setBounce(1, 1);
    logo2.setCollideWorldBounds(true);

    emitter.startFollow(logo);
    emitter2.startFollow(logo2);

}