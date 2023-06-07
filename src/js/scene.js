var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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

    this.load.image('sky', 'saul.jpeg');
    this.load.image('logo', 'saul.jpeg');
    this.load.image('red', 'saul.jpeg');
}

function create ()
{
    this.add.image(400, 300, 'sky');

    var particles = this.add.particles('red');
    var particles2 = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 1,
        scale: { start:1, end: 0 },
        blendMode: 'ADD'
    });

    var emitter2 = particles2.createEmitter({
        speed: 1,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    var logo = this.physics.add.image(400, 100, 'logo');
    var logo2 = this.physics.add.image(400, 50, 'logo');
    var logo3 = this.physics.add.image(400, 0, 'logo');

    logo.setVelocity(150, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    logo2.setVelocity(-150, -200);
    logo2.setBounce(1, 1);
    logo2.setCollideWorldBounds(true);

    logo3.setVelocity();
    logo3.setBounce(1, 1);
    logo3.setCollideWorldBounds(true);

    emitter.startFollow(logo);
    emitter2.startFollow(logo2);

}